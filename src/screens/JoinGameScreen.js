import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { Header, FormContainer } from "../components";
import socket from "../apis/socketConnection";
import { GameContext } from "../context/GameProvider";

export const JoinGameScreen = ({ navigation }) => {
  const [roomCode, setRoomCode] = useState("");
  const [numberOfLocalPlayersForm, setNumberOfLocalPlayersForm] = useState(1);
  const [invalidError, setInvalidError] = useState(false);
  const [noCodeError, setNoCodeError] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    setGameRoom,
    setIsGameOwner,
    setNumberOfLocalPlayers,
    setLocalUsers,
    setIsGameRestart,
  } = useContext(GameContext);

  useEffect(() => {
    let mounted = true;
    socket.on("invalid-room-code", () => {
      if (mounted) setInvalidError(true);
    });
    socket.on("user-joined-room", (data) => {
      if (mounted) {
        setGameRoom(data.roomDetails);
        setNumberOfLocalPlayers(numberOfLocalPlayersForm);
        // ensure start up settings if this isn't the first game loaded in the app
        setIsGameOwner(false);
        setLocalUsers([]);
        setIsGameRestart(false);

        //reset form
        setLoading(false);
        setRoomCode("");

        // navigate to game page
        navigation.navigate("GameStack");
      }
    });
    return () => (mounted = false);
  }, []);

  const submitForm = (navigation) => {
    // validate form
    if (roomCode.length === 0) return setNoCodeError(true);
    // submit form
    socket.emit("join-room", roomCode, numberOfLocalPlayersForm);
    // set loading
    setLoading(true);
  };

  return (
    <>
      <Header navigation={navigation} showBack={true} />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator color="#16697a" size={48} />
        ) : (
          <FormContainer>
            {noCodeError && (
              <View>
                <Text style={styles.errorText}>please enter a room code</Text>
              </View>
            )}
            {invalidError && (
              <View>
                <Text style={styles.errorText}>invalid room code</Text>
              </View>
            )}
            <FormContainer.Input
              value={roomCode}
              placeholder="room code"
              autoComplete="off"
              onChangeText={(input) => {
                setNoCodeError(false);
                setRoomCode(input);
              }}
            />
            <FormContainer.GameInput
              inputLabel="# of local players"
              inputValue={numberOfLocalPlayersForm}
              lowerLimit={1}
              upperLimit={4}
              changeAmount={1}
              changeFunction={setNumberOfLocalPlayersForm}
            />
            <FormContainer.PaddingDivider />
            <FormContainer.PrimaryButton onPress={() => submitForm()}>
              Join Game
            </FormContainer.PrimaryButton>
          </FormContainer>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#82c0cc",
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "#ffa62b",
    fontWeight: "bold",
    fontSize: 18,
  },
});
