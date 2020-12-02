import { StyleSheet } from "react-native";

export const FormStyles = StyleSheet.create({
  formContainer: {
    width: "75%",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonContainer: {
    width: "100%",
    elevation: 8,
    backgroundColor: "#16697a",
    borderRadius: 10,
    padding: 5,
  },
  primaryButtonText: {
    fontSize: 18,
    color: "#ede7e3",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  secondaryButtonContainer: {
    width: "100%",
    elevation: 8,
    backgroundColor: "#16697a",
    borderRadius: 10,
    padding: 5,
  },
  secondaryButtonText: {
    fontSize: 14,
    color: "#ede7e3",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  roundButton: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    elevation: 8,
    backgroundColor: "#16697a",
    borderRadius: 100,
    padding: 10,
  },
  roundButtonText: {
    fontSize: 18,
    color: "#ede7e3",
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
    textTransform: "uppercase",
  },
  input: {
    margin: 5,
    width: "75%",
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#16697a",
    backgroundColor: "#489fb5",
    color: "#ede7e3",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  text: {
    fontSize: 14,
  },
  title: {
    color: "#16697a",
    fontSize: 24,
    fontWeight: "bold",
  },
  gameInputContainer: {
    flexDirection: "row",
    margin: 5,
  },
  gameInputLabel: {
    color: "#16697a",
    fontSize: 18,
    marginHorizontal: 5,
  },
  gameInputValue: {
    color: "#16697a",
    fontSize: 18,
    marginHorizontal: 5,
  },
  gameInputIcon: {
    marginHorizontal: 5,
  },
  paddingDivider: {
    marginVertical: 5,
  },
});
