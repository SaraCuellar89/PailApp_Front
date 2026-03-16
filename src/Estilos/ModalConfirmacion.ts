import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    backgroundColor: "#F5D95C",
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#000",
    width: "80%",
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 15,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btn: {
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 10,
  },
  btnText: {
    color: "white",
  },
});