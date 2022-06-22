import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#3498db",
  },
  imageView: { height: "20%", width: "100%" },
  imageView1: {
    height: "50%", 
    width: "100%",
    alignItems: "center",
    resizeMode: "contain",
  },
  imageLogo: {
    flex: 1,
    width: null,
    height: null,
    marginBottom: 15,
    resizeMode: "contain",
  },
  imageMember: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  buttonText: {
    fontFamily: "Avenir",
    fontWeight: "600",
    fontSize: 18,
    color: "white",
  },
  timerText: {
    fontFamily: "Avenir",
    fontWeight: "700",
    fontSize: 24,
    color: "#e74c3c",
    textAlign: "center",
    marginBottom: 0,
  },
  scoreText: {
    fontFamily: "Avenir",
    fontWeight: "700",
    fontSize: 24,
    color: "#3498db",
    textAlign: "center",
    marginBottom: 0,
  },
});

export { styles };
