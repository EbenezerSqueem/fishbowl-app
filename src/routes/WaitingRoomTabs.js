import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

import { WaitingRoomScreen } from "../screens/gameScreens/WaitingRoomScreen";
import { TeamSettings } from "../screens/gameScreens/TeamSettingsScreen";

const Tab = createBottomTabNavigator();

export const WaitingRoomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="WaitingRoom"
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
        name="WaitingRoom"
        component={WaitingRoomScreen}
        options={{
          tabBarLabel: "Waiting Room",
          tabBarIcon: ({ color }) => {
            return (
              <FontAwesome name="hourglass-half" color={color} size={24} />
            );
          },
        }}
      />
      <Tab.Screen
        name="TeamSettings"
        component={TeamSettings}
        options={{
          tabBarLabel: "Team Settings",
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="users" color={color} size={24} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};
