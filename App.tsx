import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import ExpoImage from "./src/screens/ExpoImage";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ExpoImage />
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
