import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  question: {
    fontSize: 26,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 30,
  },

  robot: {
    width: 300,
    height: 300,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 35,
    marginBottom: 50,
  },

  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 45,
  },

});