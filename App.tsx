import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
// import ExpoImage from "./src/screens/ExpoImage";
import Indicator from "./src/screens/Indicator";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Indicator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
