import React, { useState, useContext, useEffect } from "react";
import {
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Header, FormContainer } from "../../components";
import { GameContext } from "../../context/GameProvider";
import socket from "../../apis/socketConnection";
import { WordForm } from "../../containers/WordForm";

export const WaitingRoomScreen = ({ navigation }) => {
  const [wordsSubmitted, setWordsSubmitted] = useState(false);
  const {
    gameRoom,
    setGameRoom,
    isGameOwner,
    numberOfLocalPlayers,
    localUsers,
    isGameRestart,
  } = useContext(GameContext);

  useEffect(() => {
    let mounted = true;
    socket.on("word-form-submitted", ({ gameRoom, newUser }) => {
      if (mounted) {
        if (!wordsSubmitted) {
          // determine if all local users entered submitted their words
          if (localUsers.length === numberOfLocalPlayers) {
            setWordsSubmitted(true);
          }
        }
        setGameRoom(gameRoom);
      }
    });
    socket.on("update-game-state", (gameRoom) => {
      if (mounted) {
        setGameRoom(gameRoom);
        // check if game has started
        if (gameRoom.isGameStarted === true) {
          navigation.navigate("Game");
        }
      }
    });
    return () => (mounted = false);
  }, []);

  // const roomCode = gameRoom.roomCode;
  const renderSectionHeader = ({ section }) => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerLabel}>{section.title}</Text>
      </View>
    );
  };
  const renderUser = ({ item }) => {
    return (
      <View style={styles.userItemContainer}>
        <Text style={styles.userItem}>{item}</Text>
      </View>
    );
  };

  const groupPlayers = (data) => {
    const sections = {
      unassigned: {
        title: "UNASSIGNED",
        data: [],
      },
      teamOne: {
        title: "TEAM ONE",
        data: [],
      },
      teamTwo: {
        title: "TEAM TWO",
        data: [],
      },
    };

    for (const [key, value] of Object.entries(data)) {
      if (value.team.length === 0) {
        sections["unassigned"].data.push(value.name);
      } else {
        sections[value.team].data.push(value.name);
      }
    }

    return Object.keys(sections).map((key) => {
      return sections[key];
    });
  };
  return (
    <>
      <Header navigation={navigation} showBack={false} />
      <SafeAreaView style={{ flex: 1 }}>
        {!wordsSubmitted ? (
          <View style={styles.wordFormContainer}>
            <WordForm
              numberOfWords={gameRoom.gameSettings.wordsPerPlayer}
              roomCode={gameRoom.roomCode}
              isGameRestart={isGameRestart}
            />
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>Welcome to the waiting room!</Text>
              <Text style={styles.greeting}>
                Room code: {gameRoom.roomCode}
              </Text>
            </View>
            <View style={styles.userContainer}>
              <Text style={styles.subHeader}>Joined Players</Text>
              <SectionList
                sections={groupPlayers(gameRoom.players)}
                keyExtractor={(index) => index + ""}
                renderSectionHeader={renderSectionHeader}
                renderItem={renderUser}
              />
            </View>
            {isGameOwner && (
              <FormContainer>
                <FormContainer.PrimaryButton
                  onPress={() => socket.emit("start-game", gameRoom.roomCode)}
                >
                  Start Game
                </FormContainer.PrimaryButton>
              </FormContainer>
            )}
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#82c0cc",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  wordFormContainer: {
    flex: 1,
    backgroundColor: "#82c0cc",
    alignItems: "center",
    justifyContent: "center",
  },
  greetingContainer: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#16697a",
  },
  greeting: {
    textAlign: "center",
    marginHorizontal: 10,
    color: "#ede7e3",
    fontSize: 24,
  },
  subHeader: {
    color: "#16697a",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
  userContainer: {
    paddingVertical: 10,
    width: "75%",
    justifyContent: "center",
  },
  userItemContainer: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 3,
    backgroundColor: "#ffa62b",
    borderRadius: 10,
  },
  userItem: {
    flex: 1,
    padding: 5,
    paddingLeft: 15,
    color: "#16697a",
    fontWeight: "bold",
    fontSize: 18,
  },
  headerContainer: {
    paddingVertical: 5,
    marginVertical: 4,
    backgroundColor: "#16697a",
    borderRadius: 10,
  },
  headerLabel: {
    textAlign: "left",
    fontSize: 20,
    paddingLeft: 15,
    fontWeight: "bold",
    color: "#ede7e3",
  },
});
