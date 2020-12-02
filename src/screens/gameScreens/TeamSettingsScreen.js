import React, { useContext, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Header, FormContainer } from "../../components";
import { GameContext } from "../../context/GameProvider";
import socket from "../../apis/socketConnection";

export const TeamSettings = ({ navigation }) => {
  const { gameRoom, setGameRoom, isGameOwner } = useContext(GameContext);

  useEffect(() => {
    let mounted = true;
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

  const renderItem = ({ item }) => {
    const user = item[0];
    // let teamValue = item[1].team;
    return (
      <View style={styles.userItem}>
        <Text style={styles.username}>{user}:</Text>
        <Picker
          selectedValue={item[1].team}
          style={styles.teamPicker}
          mode={"dropdown"}
          dropdownIconColor="#16697a"
          onValueChange={(itemValue) => {
            updateTeam(user, itemValue);
          }}
        >
          <Picker.Item label="Unassigned" value="" />
          <Picker.Item label="Team One" value="teamOne" />
          <Picker.Item label="Team Two" value="teamTwo" />
        </Picker>
      </View>
    );
  };

  const updateTeam = (user, teamValue) => {
    // send team update
    if (user.length > 0 && teamValue.length > 0) {
      socket.emit("update-team", user, gameRoom.roomCode, teamValue);
    }
  };

  return (
    <>
      <Header navigation={navigation} showBack={false} />
      <View style={styles.container}>
        <Text style={styles.title}>Set Teams</Text>
        <FlatList
          data={Object.entries(gameRoom.players)}
          renderItem={renderItem}
          keyExtractor={(index) => index + ""}
        />
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#82c0cc",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 15,
  },
  title: {
    textAlign: "center",
    marginHorizontal: 10,
    color: "#16697a",
    fontWeight: "bold",
    fontSize: 24,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  username: {
    color: "#16697a",
    fontSize: 18,
    fontWeight: "bold",
  },
  teamPicker: {
    color: "#16697a",
    fontSize: 18,
    height: 50,
    width: 150,
  },
});
