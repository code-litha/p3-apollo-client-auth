import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import ProductListScreen from "../screens/ProductListScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import ProductCreateScreen from "../screens/ProductCreateScreen";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"Login"} component={LoginScreen} />
      <Stack.Screen name={"Home"} component={ProductListScreen} />
      <Stack.Screen name={"ProductDetail"} component={ProductDetailScreen} />
      <Stack.Screen name={"ProductCreate"} component={ProductCreateScreen} />
    </Stack.Navigator>
  );
}
