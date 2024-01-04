import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Logo from "../components/Logo";
import { globalStyle, utilities } from "../constant/utilities";
import { useState } from "react";
import ErrorText from "../components/ErrorText";

export default function LoginScreen({ navigation }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onChangeForm = (value, key) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const onLogin = () => {
    const payload = form;
    console.log(payload);
    navigation.replace("Home");
  };

  return (
    <View style={styles.container}>
      <Logo />
      <TextInput
        placeholder="Email"
        value={form.email}
        keyboardType="email-address"
        onChangeText={(text) => onChangeForm(text, "email")}
        style={[globalStyle.textInput, { marginBottom: 25, marginTop: 20 }]}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={form.password}
        onChangeText={(text) => onChangeForm(text, "password")}
        style={[globalStyle.textInput, { marginBottom: 35 }]}
      />
      <ErrorText error={null} />
      <TouchableOpacity style={globalStyle.primaryButton} onPress={onLogin}>
        <Text variant="titleLarge" style={globalStyle.textButton}>
          LOGIN
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: utilities.padding.xl,
  },
});
