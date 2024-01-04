import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Logo from "../components/Logo";
import { globalStyle, utilities } from "../constant/utilities";
import { useContext, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../config/queries";
import ErrorText from "../components/ErrorText";

export default function LoginScreen({ navigation }) {
  const { setTokenLogin } = useContext(LoginContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [doLogin, { data, loading, error }] = useMutation(LOGIN, {
    onCompleted: async (res) => {
      // console.log(res);
      if (res?.login?.token) {
        await setTokenLogin(res.login.token);
      }
    },
  });

  const onChangeForm = (value, key) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const onLogin = async () => {
    try {
      const payload = { ...form };
      await doLogin({
        variables: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // console.log({ data, loading, error });
  // console.log(error?.graphQLErrors?.[0]?.name, "<<<< error");

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
      <ErrorText error={error} />
      <TouchableOpacity style={globalStyle.primaryButton} onPress={onLogin}>
        {loading ? (
          <ActivityIndicator size={"small"} color={"#fff"} />
        ) : (
          <Text variant="titleLarge" style={globalStyle.textButton}>
            LOGIN
          </Text>
        )}
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
