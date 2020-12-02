import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { Header } from "../../components";
import socket from "../../apis/socketConnection";
import { GameContext } from "../../context/GameProvider";
import { TurnControls } from "../../containers/TurnControls";
import { Timer } from "../../containers/Timer";

export const GameScreen = ({ navigation }) => {
  const { gameRoom, setGameRoom, localUsers } = useContext(GameContext);
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [turnStarted, setTurnStarted] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(
    gameRoom.gameSettings.timePerTurn
  );
  const [didRoundEnd, setDidRoundEnd] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  useEffect(() => {
    let mounted = true;

    if (mounted && localUsers.includes(gameRoom.currentTurnPlayer)) {
      // it is a local users turn
      setIsMyTurn(true);
    }
    socket.on("turn-started", (gameRoom) => {
      if (mounted) {
        // console.log("turn-started");
        setTurnStarted(true);
        // reset timer
        setSecondsRemaining(gameRoom.gameSettings.timePerTurn);
        setTimerKey((timerKey) => timerKey + 1);
        setTimerRunning(true);
        // update game state
        setGameRoom(gameRoom);
      }
    });

    socket.on("toggle-pause", (gameRoom) => {
      if (mounted) {
        setGameRoom(gameRoom);
        if (gameRoom.isGamePaused) {
          //pauseTimer();
          setTimerRunning(false);
        } else {
          //startTimer(false);
          setTimerRunning(true);
        }
      }
    });

    socket.on("correct", ({ gameRoom, didRoundEnd }) => {
      if (mounted) {
        // update game state in props
        setGameRoom(gameRoom);
        // do something to signify correct answer
        if (didRoundEnd) {
          // pause timer until user is ready to start new round
          setDidRoundEnd(true);
          setTimerRunning(false);
          //pauseTimer();
        }
      }
    });

    socket.on("next-turn", (gameRoom) => {
      if (mounted) {
        setTimerRunning(false);
        setTurnStarted(false);
        //pauseTimer();
        // update state
        // console.log(gameRoom);
        if (localUsers.includes(gameRoom.currentTurnPlayer)) {
          // it is a local users turn
          setIsMyTurn(true);
        }
        // update game state in props
        setGameRoom(gameRoom);
      }
    });
    return () => (mounted = false);
  }, []);

  const timerComplete = () => {
    // console.log("TIME'S UP");
    setTimerRunning(false);
    setTurnStarted(false);
    // console.log(gameRoom);
    if (isMyTurn) {
      setIsMyTurn(false);
      socket.emit("end-turn", gameRoom.roomCode);
    }
  };

  return (
    <>
      <Header navigation={navigation} showBack={false} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.scoreContainer}>
            <View style={styles.teamScore}>
              <Text style={styles.teamTitle}>TEAM ONE</Text>
              <Text style={styles.teamScore}>{gameRoom.score.teamOne}</Text>
            </View>
            <View style={styles.teamScore}>
              <Text style={styles.teamTitle}>TEAM TWO</Text>
              <Text style={styles.teamScore}>{gameRoom.score.teamTwo}</Text>
            </View>
          </View>
          <View style={styles.gameDetailsContainer}>
            <View style={styles.gameDetails}>
              <View style={styles.gameDetailsRow}>
                <Text style={styles.detailsText}>ROUND</Text>
                <Text style={styles.detailsValue}>{gameRoom.currentRound}</Text>
              </View>
              <Text style={styles.detailsValue}>
                {gameRoom.currentTurnPlayer.toUpperCase()}
              </Text>
              <Text style={styles.detailsText}> ON TEAM</Text>
              <Text style={styles.detailsValue}>
                {gameRoom.currentTurnTeam.toUpperCase()}
              </Text>
              <Text style={styles.detailsText}>IS UP!</Text>
            </View>
            <Timer
              timerKey={timerKey}
              timerRunning={timerRunning}
              secondsRemaining={secondsRemaining}
              complete={timerComplete}
            />
          </View>
          {isMyTurn && (
            <View style={styles.turnContainer}>
              {!turnStarted ? (
                <Text style={styles.subHeader}>YOUR TURN!</Text>
              ) : (
                <>
                  <Text style={styles.detailsText}>Current Word</Text>
                  <Text style={styles.currentWord}>{gameRoom.currentWord}</Text>
                </>
              )}
              <TurnControls
                turnStarted={turnStarted}
                timerKey={timerKey}
                setTimerKey={setTimerKey}
                didRoundEnd={didRoundEnd}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#82c0cc",
    alignItems: "center",
    justifyContent: "space-around",
  },
  gameTitle: {
    fontWeight: "bold",
    fontSize: 32,
    color: "#16697a",
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#489fb5",
    borderRadius: 10,
    width: "95%",
    margin: 10,
  },
  teamScore: {
    justifyContent: "center",
    alignItems: "center",
  },
  teamTitle: {
    marginHorizontal: 10,
    color: "#16697a",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  teamScore: {
    color: "#16697a",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
  },
  gameDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#489fb5",
    borderRadius: 10,
    width: "95%",
    margin: 10,
  },
  gameDetails: {
    marginHorizontal: 5,
    marginVertical: 10,
    width: "40%",
    backgroundColor: "#16697a",
    borderWidth: 4,
    borderStyle: "solid",
    borderRadius: 10,
    borderColor: "#16697a",
    justifyContent: "center",
    alignItems: "center",
  },
  gameDetailsRow: {
    flexDirection: "row",
  },
  detailsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ede7e3",
    padding: 5,
  },
  detailsValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffa62b",
    padding: 5,
  },
  turnContainer: {
    height: "45%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#16697a",
    borderRadius: 10,
    width: "95%",
    margin: 10,
  },
  subHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ede7e3",
    padding: 5,
  },
  currentWord: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#ffa62b",
    paddingTop: 5,
    paddingBottom: 10,
  },
});
