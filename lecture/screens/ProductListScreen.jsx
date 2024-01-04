import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyle, utilities } from "../constant/utilities";
import dataProducts from "../data/products.json";
import { renderPrice } from "../utils/renderPrice";
import { MaterialIcons } from "@expo/vector-icons";

const { height } = Dimensions.get("screen");

export default function ProductListScreen({ navigation }) {
  const onPressItem = (item) => {
    console.log(item);
    navigation.navigate("ProductDetail", { id: item.id });
  };

  const logout = () => {
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <View style={{ flexDirection: "row", marginBottom: 5 }}>
              <Text>Hello, </Text>
              <Text style={{ fontWeight: "bold" }}>BSD</Text>
            </View>
            <Text>Cari apa hari ini ?</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              justifyContent: "center",
            }}
          >
            <TouchableHighlight
              onPress={() => navigation.navigate("ProductCreate")}
              style={[globalStyle.primarySmButton, { marginBottom: 0 }]}
            >
              <Text style={globalStyle.textButton}>Add Product</Text>
            </TouchableHighlight>
            <TouchableOpacity onPress={logout}>
              <MaterialIcons
                name={"logout"}
                size={26}
                color={utilities.fontColor.gray700}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Image
          source={{
            uri: "https://img.freepik.com/free-vector/hand-painted-social-media-sale-post-template_23-2149039786.jpg",
          }}
          style={{ width: "100%", height: "70%" }}
        />
      </View>
      <View style={{ flex: 3, marginTop: 10 }}>
        <FlatList
          data={dataProducts}
          renderItem={({ item, index }) => {
            const lastIndex =
              dataProducts.length % 2 && index === dataProducts.length - 1;

            return (
              <View
                style={[styles.card, { maxWidth: lastIndex ? "48%" : "100%" }]}
              >
                <TouchableOpacity
                  style={[{ flex: 1, height: "100%" }]}
                  onPress={() => onPressItem(item)}
                >
                  <View style={[styles.imageContainer]}>
                    <Image source={{ uri: item.imgUrl }} style={styles.image} />
                  </View>
                  <View style={styles.contentContainer}>
                    <View style={{ paddingHorizontal: 2, paddingVertical: 5 }}>
                      <Text style={styles.contentHeader} numberOfLines={2}>
                        {item.name}
                      </Text>
                      <Text style={styles.price}>
                        Rp {renderPrice(item?.price)} ,-
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  imageContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
  },
  contentHeader: {
    fontSize: utilities.fontSize.sm,
    fontWeight: "500",
    // textAlign: "center",
    marginBottom: 5,
  },
  price: {
    fontSize: utilities.fontSize.xs,
  },
  card: {
    // backgroundColor: "tomato",
    borderWidth: 0.5,
    marginHorizontal: 5,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    borderColor: utilities.color.extraLightGray,
    flex: 1,
    height: height / 3.5,
  },
});
