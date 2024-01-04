import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./navigation/MainStack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
