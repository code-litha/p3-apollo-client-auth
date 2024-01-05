import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import ProductListScreen from "../screens/ProductListScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import ProductCreateScreen from "../screens/ProductCreateScreen";
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name={"Home"} component={ProductListScreen} />
          <Stack.Screen
            name={"ProductDetail"}
            component={ProductDetailScreen}
          />
          <Stack.Screen
            name={"ProductCreate"}
            component={ProductCreateScreen}
          />
        </>
      ) : (
        <Stack.Screen name={"Login"} component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}
