import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import LoginScreen from "./Apps/Screens/LoginScreen";

export default function App() {
  return (
    <View className="flex-1 bg-white">
      <Text className="font-bold text-3xl"></Text>
      <StatusBar style="auto" />
      <LoginScreen></LoginScreen>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
