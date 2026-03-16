import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignContent: "space-between",
    backgroundColor: "#FFD600",
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 50,
  },
  back: {
    fontSize: 32,
    fontWeight: "bold",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  icon: {
    width: 50,
    height: 50,
    marginLeft: 40
  },
});