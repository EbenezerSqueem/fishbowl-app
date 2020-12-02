import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { FormContainer } from "../components";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={require("../../assets/images/icon.png")}
        />
        <View style={styles.title}>
          <Text style={styles.fish}>FISH</Text>
          <Text style={styles.bowl}>BOWL</Text>
        </View>
      </View>
      <FormContainer>
        <FormContainer.PrimaryButton
          onPress={() => navigation.navigate("Create")}
        >
          Create Game
        </FormContainer.PrimaryButton>
        <FormContainer.PaddingDivider />
        <FormContainer.PrimaryButton
          onPress={() => navigation.navigate("Join")}
        >
          Join Game
        </FormContainer.PrimaryButton>
      </FormContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#82c0cc",
  },
  logo: {
    marginBottom: 10,
  },
  title: {
    flexDirection: "row",
  },
  fish: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#16697a",
  },
  bowl: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#ffa62b",
  },
});

export default HomeScreen;
