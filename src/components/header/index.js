import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { Styles } from "./styles/header";

export default function Header({ navigation, showBack }) {
  return (
    <View style={Styles.headerContainer}>
      {showBack && (
        <TouchableOpacity
          style={Styles.backIcon}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="arrow-left" size={24} color="#ffa62b" />
        </TouchableOpacity>
      )}
      <View style={Styles.contentContainer}>
        <Image
          style={Styles.logo}
          source={require("../../../assets/images/icon.png")}
        />
        <View style={Styles.title}>
          <Text style={Styles.fish}>FISH</Text>
          <Text style={Styles.bowl}>BOWL</Text>
        </View>
      </View>
    </View>
  );
}
