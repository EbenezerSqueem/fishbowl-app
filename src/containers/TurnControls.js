import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";

import { GameContext } from "../context/GameProvider";
import socket from "../apis/socketConnection";
import { FormContainer } from "../components";

export const TurnControls = ({ turnStarted, timerKey, setTimerKey }) => {
  const { gameRoom } = useContext(GameContext);

  return (
    <View>
      <FormContainer>
        {!turnStarted ? (
          <FormContainer.RoundButton
            onPress={() => {
              setTimerKey(() => timerKey + 1);
              socket.emit("start-turn", gameRoom.roomCode);
            }}
            buttonStyles={{
              backgroundColor: "#82c0cc",
              width: 125,
              height: 125,
            }}
            textStyles={{ color: "#16697a" }}
          >
            START TURN
          </FormContainer.RoundButton>
        ) : (
          <View style={styles.buttonContainer}>
            <FormContainer.RoundButton
              onPress={() =>
                socket.emit(
                  "correct-answer",
                  gameRoom.roomCode,
                  gameRoom.currentTurnPlayer,
                  gameRoom.currentTurnTeam
                )
              }
              buttonStyles={{
                backgroundColor: "#82c0cc",
                width: 125,
                height: 125,
                marginHorizontal: 15,
              }}
              textStyles={{ color: "#16697a" }}
            >
              GOT IT!
            </FormContainer.RoundButton>
            <FormContainer.RoundButton
              onPress={() => socket.emit("toggle-pause", gameRoom.roomCode)}
              buttonStyles={{
                backgroundColor: "#489fb5",
                width: 80,
                height: 80,
              }}
            >
              PAUSE
            </FormContainer.RoundButton>
          </View>
        )}
      </FormContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
