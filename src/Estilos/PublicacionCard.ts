import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    padding: 18,
    marginVertical: 10,
    marginHorizontal: 16,
    backgroundColor: "#EDE4C7",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#000",
  },

  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },

  descripcion: {
    fontSize: 14,
    textAlign: "center",
    color: "#333",
    marginBottom: 10,
  },

  img: {
    width: "100%",
    height: 170,
    borderRadius: 12,
    marginVertical: 10,
  },

  infoExtra: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 8,
  },

  extraText: {
    fontSize: 12,
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#000",
  },

  fecha: {
    fontSize: 11,
    color: "#333",
    marginTop: 8,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  leftActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  iconText: {
    fontSize: 14,
  },
});