import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Logo from "../components/Logo";
import { globalStyle, utilities } from "../constant/utilities";
import { useContext, useState } from "react";
import ErrorText from "../components/ErrorText";
import { LoginContext } from "../context/LoginContext";
import { gql, useMutation } from "@apollo/client";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export default function LoginScreen({ navigation }) {
  const { setTokenLogin } = useContext(LoginContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [funcLogin, { data, loading, error }] = useMutation(LOGIN, {
    onCompleted: async (res) => {
      // console.log(res, "<<< res ");
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
      const payload = form;
      console.log(payload);
      const res = await funcLogin({
        // variables: {
        //   email: form.email,
        //   password: form.password,
        // },
        variables: payload,
      });
      // console.log(res, "<<<< res disini");
      // await setTokenLogin("token_nih");
      // navigation.replace("Home");
    } catch (error) {
      console.log(error);
    }
  };

  // console.log({
  //   data,
  //   loading,
  //   error,
  // });

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
