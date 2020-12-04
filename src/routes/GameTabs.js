import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

import socket from "../apis/socketConnection";
import { GameContext } from "../context/GameProvider";
import { GameScreen } from "../screens/gameScreens/GameScreen";
import { ScoreboardScreen } from "../screens/gameScreens/ScoreboardScreen";
import { JitsiMeetScreen } from "../screens/gameScreens/JitsiMeetScreen";

const Tab = createBottomTabNavigator();

export const GameTabs = ({ navigation }) => {
  const { setGameRoom } = useContext(GameContext);

  useEffect(() => {
    let mounted = true;
    socket.on("update-game-state", (gameRoom) => {
      if (mounted) {
        setGameRoom(gameRoom);
      }
    });

    socket.on("end-of-game", (gameRoom) => {
      if (mounted) {
        setGameRoom(gameRoom);
        navigation.navigate("Summary");
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="GameScreen"
      tabBarOptions={{
        activeBackgroundColor: "#489fb5",
        activeTintColor: "#ede7e3",
        inactiveBackgroundColor: "#ede7e3",
        inactiveTintColor: "#16697a",
        keyboardHidesTabBar: true,
        labelStyle: { fontWeight: "bold" },
      }}
    >
      <Tab.Screen
        name="Video"
        component={JitsiMeetScreen}
        options={{
          tabBarLabel: "Video",
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="video-camera" color={color} size={24} />;
          },
        }}
      />
      <Tab.Screen
        name="GameScreen"
        component={GameScreen}
        options={{
          tabBarLabel: "Game",
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="gamepad" color={color} size={24} />;
          },
        }}
      />
      <Tab.Screen
        name="Score"
        component={ScoreboardScreen}
        options={{
          tabBarLabel: "Scoreboard",
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="trophy" color={color} size={24} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};
