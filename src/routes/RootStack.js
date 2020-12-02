import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { GameProvider } from "../context/GameProvider";
import HomeScreen from "../screens/HomeScreen";
import { CreateGameScreen } from "../screens/CreateGameScreen";
import { JoinGameScreen } from "../screens/JoinGameScreen";
import { GameStack } from "./GameStack";

const Stack = createStackNavigator();

export const RootStack = () => {
  return (
    <GameProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Create" component={CreateGameScreen} />
        <Stack.Screen name="Join" component={JoinGameScreen} />
        <Stack.Screen name="GameStack" component={GameStack} />
      </Stack.Navigator>
    </GameProvider>
  );
};
