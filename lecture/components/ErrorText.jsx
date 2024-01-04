import { Text } from "react-native";
import { globalStyle } from "../constant/utilities";

export default function ErrorText({ error }) {
  if (!error) return <></>;

  return (
    <Text style={globalStyle.textError}>
      {error?.message || "Internal Server Error"}
    </Text>
  );
}
