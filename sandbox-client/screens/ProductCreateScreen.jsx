import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyle, utilities } from "../constant/utilities";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT, GET_PRODUCTS } from "../config/queries";
import ErrorText from "../components/ErrorText";

export default function ProductCreateScreen({ navigation }) {
  const [addProduct, { data, loading, error }] = useMutation(ADD_PRODUCT, {
    onCompleted: () => {
      navigation.navigate("Home");
    },
    refetchQueries: [GET_PRODUCTS],
  });
  const [form, setForm] = useState({
    name: "",
    stock: "",
    price: "",
    imgUrl: "",
  });

  const onChangeForm = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const onCreate = async () => {
    try {
      const payload = {
        ...form,
        stock: Number(form.stock),
        price: Number(form.price),
      };
      // console.log(payload, "<<< payload create");
      // navigation.navigate("Home");
      await addProduct({
        variables: {
          input: payload,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Form</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Name"
        style={globalStyle.textInputSm}
        value={form.name}
        onChangeText={(text) => onChangeForm("name", text)}
      />

      <Text style={styles.label}>Stock</Text>
      <TextInput
        placeholder="Stock"
        style={globalStyle.textInputSm}
        value={form.stock}
        keyboardType={"number-pad"}
        onChangeText={(text) => onChangeForm("stock", text)}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        placeholder="Price"
        style={globalStyle.textInputSm}
        value={form.price}
        keyboardType={"number-pad"}
        onChangeText={(text) => onChangeForm("price", text)}
      />

      <Text style={styles.label}>Image URL</Text>
      <TextInput
        placeholder="Image URL"
        style={globalStyle.textInputSm}
        value={form.imgUrl}
        onChangeText={(text) => onChangeForm("imgUrl", text)}
      />

      <ErrorText error={error} />
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <TouchableOpacity
          style={[globalStyle.primaryButton, { width: "80%" }]}
          onPress={onCreate}
        >
          {loading ? (
            <ActivityIndicator size={"small"} color={"#fff"} />
          ) : (
            <Text style={globalStyle.textButton}>Create</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: utilities.padding.xl,
  },
  title: {
    fontWeight: "700",
    textAlign: "center",
    color: utilities.color.primary,
    fontSize: utilities.fontSize.lg,
    marginVertical: 20,
  },
  label: {
    fontSize: 12,
    padding: utilities.padding.xs,
    color: utilities.fontColor.gray600,
  },
});
