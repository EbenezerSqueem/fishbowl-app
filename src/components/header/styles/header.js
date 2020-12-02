import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#489fb5",
    height: 60,
  },
  backIcon: {
    marginHorizontal: 10,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    flexDirection: "row",
  },
  logo: {
    height: 48,
    width: 48,
    marginRight: 10,
  },
  fish: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#16697a",
  },
  bowl: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffa62b",
  },
});
