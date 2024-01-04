import { Text } from "react-native";
import { globalStyle } from "../constant/utilities.js";

export default function Logo({ size }) {
  return (
    <Text
      variant="displaySmall"
      style={size === "sm" ? globalStyle.logoSm : globalStyle.logo}
    >
      GAKUNIQ
    </Text>
  );
}
