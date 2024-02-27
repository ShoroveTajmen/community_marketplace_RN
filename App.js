import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import LoginScreen from "./Apps/Screens/LoginScreen";
import TabNavigation from "./Apps/Screens/Navigations/TabNavigation";

export default function App() {
  return (
    <ClerkProvider publishableKey="pk_test_YW11c2luZy1ob3JzZS03OC5jbGVyay5hY2NvdW50cy5kZXYk">
      <View className="flex-1 bg-white">
        <Text className="font-bold text-3xl"></Text>
        <StatusBar style="auto" />
        <SignedIn>
          <NavigationContainer>
            <TabNavigation></TabNavigation>
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <LoginScreen></LoginScreen>
        </SignedOut>
      </View>
    </ClerkProvider>
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
