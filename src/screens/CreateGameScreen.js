import React, { useState, useContext, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { Header, FormContainer } from "../components";
import { GameContext } from "../context/GameProvider";
import socket from "../apis/socketConnection";

export const CreateGameScreen = ({ navigation }) => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(4);
  const [numberOfLocalPlayersForm, setNumberOfLocalPlayersForm] = useState(1);
  const [wordsPerPlayer, setWordsPerPlayer] = useState(3);
  const [numberOfRounds, setNumberOfRounds] = useState(3);
  const [timePerTurn, setTimePerTurn] = useState(60);
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

    socket.on("room-created", (gameRoomDetails, numLocal) => {
      // update inital game settings
      if (mounted) {
        setIsGameOwner(true);
        setNumberOfLocalPlayers(numberOfLocalPlayersForm);
        setGameRoom(gameRoomDetails);
        // ensure start up settings if this isn't the first game loaded in the app
        setLocalUsers([]);
        setIsGameRestart(false);

        setLoading(false);
        // navigate to game page and pass game info
        navigation.navigate("GameStack");
      }
    });
    return () => (mounted = false);
  }, []);

  const submitForm = (navigation) => {
    // submit form
    socket.emit("create-room", {
      numberOfPlayers,
      numberOfLocalPlayersForm,
      wordsPerPlayer,
      timePerTurn,
      numberOfRounds,
    });
    // set loading to true
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
            <FormContainer.GameInput
              inputLabel="# of players"
              inputValue={numberOfPlayers}
              lowerLimit={4}
              upperLimit={10}
              changeAmount={1}
              changeFunction={setNumberOfPlayers}
            />
            <FormContainer.GameInput
              inputLabel="# of local players"
              inputValue={numberOfLocalPlayersForm}
              lowerLimit={1}
              upperLimit={numberOfPlayers}
              changeAmount={1}
              changeFunction={setNumberOfLocalPlayersForm}
            />
            <FormContainer.GameInput
              inputLabel="words per player"
              inputValue={wordsPerPlayer}
              lowerLimit={1}
              upperLimit={10}
              changeAmount={1}
              changeFunction={setWordsPerPlayer}
            />
            <FormContainer.GameInput
              inputLabel="# of rounds"
              inputValue={numberOfRounds}
              lowerLimit={1}
              upperLimit={10}
              changeAmount={1}
              changeFunction={setNumberOfRounds}
            />
            <FormContainer.GameInput
              inputLabel="seconds per turn"
              inputValue={timePerTurn}
              lowerLimit={10}
              upperLimit={120}
              changeAmount={5}
              changeFunction={setTimePerTurn}
            />
            <FormContainer.PaddingDivider />
            <FormContainer.PrimaryButton onPress={() => submitForm(navigation)}>
              Create Game
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
});
