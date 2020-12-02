import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import { GameContext } from "../context/GameProvider";
import { FormContainer } from "../components";
import socket from "../apis/socketConnection";

export const WordForm = ({ numberOfWords, roomCode, isGameRestart }) => {
  const [wordArr, setWordArr] = useState([]);
  const [username, setUsername] = useState("");
  const [wordFormError, setWordFormError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const { localUsers, setLocalUsers } = useContext(GameContext);

  useEffect(() => {
    let mounted = true;
    socket.on("user-already-exists", () => {
      if (mounted) {
        setUsernameError(true);
      }
    });
    socket.on("valid-username", (newUsername) => {
      if (mounted) {
        let usersArr = localUsers;
        usersArr.push(newUsername);
        setLocalUsers(usersArr);
      }
    });
    return () => (mounted = false);
  }, []);

  const updateWordArr = (input, key) => {
    setWordFormError(false);
    // console.log(input + " " + key);
    let updatedWordArr = [...wordArr];

    updatedWordArr[key] = input;

    setWordArr(updatedWordArr);
  };

  const submitWordForm = () => {
    // validate form
    let enteredAllWords = true;
    wordArr.forEach((value) => {
      if (value.length === 0) {
        enteredAllWords = false;
      }
    });

    if (!enteredAllWords || wordArr.length < numberOfWords) {
      return setWordFormError(true);
    }
    if (username.length === 0) {
      return setUsernameError(true);
    }

    //submit form
    socket.emit("submit-words", username, roomCode, wordArr, isGameRestart);
  };

  const wordInputs = [];
  for (let i = 0; i < numberOfWords; i++) {
    let placeholderText = "enter word " + (i + 1);
    wordInputs.push(
      <FormContainer.Input
        value={wordArr[i]}
        placeholder={placeholderText}
        autoComplete="off"
        onChangeText={(input) => updateWordArr(input, i)}
        key={i}
      />
    );
  }
  return (
    <View style={styles.container}>
      <FormContainer>
        {usernameError && (
          <View>
            <Text style={styles.errorText}>invalid username</Text>
          </View>
        )}
        <FormContainer.Input
          value={username}
          placeholder="username"
          autoComplete="off"
          onChangeText={(input) => {
            setUsernameError(false);
            setUsername(input);
          }}
        />
        {wordFormError && (
          <View>
            <Text style={styles.errorText}>please enter all words</Text>
          </View>
        )}
        {wordInputs}
        <FormContainer.PaddingDivider />
        <FormContainer.PrimaryButton onPress={() => submitWordForm()}>
          Submit Words
        </FormContainer.PrimaryButton>
      </FormContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  errorText: {
    color: "#ffa62b",
    fontWeight: "bold",
    fontSize: 18,
  },
});
