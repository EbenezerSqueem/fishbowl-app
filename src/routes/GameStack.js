import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { GameContext } from "../context/GameProvider";

import { WaitingRoomTabs } from "./WaitingRoomTabs";
import { WaitingRoomScreen } from "../screens/gameScreens/WaitingRoomScreen";
import { GameTabs } from "./GameTabs";
import { SummaryScreen } from "../screens/gameScreens/SummaryScreen";

const Stack = createStackNavigator();

export const GameStack = () => {
  const { isGameOwner } = useContext(GameContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isGameOwner ? (
        <Stack.Screen name="Waiting" component={WaitingRoomTabs} />
      ) : (
        <Stack.Screen name="Waiting" component={WaitingRoomScreen} />
      )}
      <Stack.Screen name="Game" component={GameTabs} />
      <Stack.Screen name="Summary" component={SummaryScreen} />
    </Stack.Navigator>
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
