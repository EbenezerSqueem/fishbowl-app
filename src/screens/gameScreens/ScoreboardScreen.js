import React, { useContext } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";

import { Header } from "../../components";
import { GameContext } from "../../context/GameProvider";

export const ScoreboardScreen = ({ navigation }) => {
  const { gameRoom } = useContext(GameContext);
  const players = gameRoom.players;

  const renderUserItem = ({ item }) => {
    return (
      <View style={styles.userContainer}>
        <Text style={styles.username}>{players[item].name}</Text>
        <Text style={styles.userScore}>{players[item].score}</Text>
      </View>
    );
  };
  const listHeader = (label, teamScore) => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.teamLabel}>{label}</Text>
        <Text style={styles.teamScore}>{teamScore}</Text>
      </View>
    );
  };

  return (
    <>
      <Header navigation={navigation} showBack={false} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>SCOREBOARD</Text>
          <View style={styles.teamsContainer}>
            <FlatList
              data={gameRoom.teamOne}
              renderItem={renderUserItem}
              keyExtractor={(item) => item}
              ListHeaderComponent={() =>
                listHeader("TEAM ONE", gameRoom.score.teamOne)
              }
            />
            <FlatList
              data={gameRoom.teamTwo}
              renderItem={renderUserItem}
              keyExtractor={(item) => item}
              ListHeaderComponent={() =>
                listHeader("TEAM TWO", gameRoom.score.teamTwo)
              }
            />
          </View>
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
  },
  title: {
    margin: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: "#16697a",
  },
  teamsContainer: {
    backgroundColor: "#489fb5",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    paddingBottom: 25,
    width: "95%",
  },
  headerContainer: {
    paddingVertical: 5,
  },
  teamLabel: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#16697a",
  },
  teamScore: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffa62b",
  },
  userContainer: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 3,
    backgroundColor: "#16697a",
    borderRadius: 10,
  },
  username: {
    flex: 1,
    padding: 5,
    paddingLeft: 15,
    color: "#ede7e3",
    fontSize: 18,
  },
  userScore: {
    padding: 5,
    color: "#ede7e3",
    fontSize: 18,
    fontWeight: "bold",
  },
});
