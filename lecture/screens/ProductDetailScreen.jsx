import { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import dataProducts from "../data/products.json";
import { AntDesign } from "@expo/vector-icons";
import { globalStyle, utilities } from "../constant/utilities";
import { renderPrice } from "../utils/renderPrice";
import { gql, useQuery } from "@apollo/client";

const GET_PRODUCT = gql`
  query Product($productId: ID!) {
    product(id: $productId) {
      _id
      name
      stock
      price
      imgUrl
      authorId
      likes {
        userId
        username
      }
    }
  }
`;
export default function ProductDetailScreen({ navigation, route }) {
  const { id } = route.params;
  console.log(id, "<<< id");
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: {
      productId: id,
    },
  });
  const [product, setProduct] = useState({});
  const [isLike, setIsLike] = useState(false);

  // useEffect(() => {
  //   const findProduct = dataProducts.find((val) => val.id == id);
  //   setProduct(findProduct || {});
  // }, [id]);

  useEffect(() => {
    setProduct(data?.product || {});
  }, [data]);

  const onLike = () => {
    setIsLike(!isLike);
  };

  const goHome = () => navigation.navigate("Home");

  console.log({
    data,
    loading,
    error,
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ImageBackground
        source={{
          uri: product?.imgUrl,
        }}
        style={{
          height: 400,
          resizeMode: "contain",
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
            padding: 8,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign
              name="arrowleft"
              size={24}
              style={[styles.icon, { backgroundColor: "white" }]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onLike}>
            <AntDesign
              name={isLike ? "heart" : "hearto"}
              size={24}
              color={utilities.color.primary}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>{product?.name}</Text>
        <View style={styles.subHeading}>
          <Text style={styles.sectionPrice}>
            Rp. {renderPrice(product?.price)},00
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AntDesign
              name="star"
              size={18}
              color="orange"
              style={{
                marginRight: 4,
              }}
            />
            <Text style={styles.sectionPrice}>4.5</Text>
            <Text
              style={{
                marginLeft: 4,
              }}
            >
              From 1k+ review
            </Text>
          </View>
        </View>
        <Text
          style={{
            marginBottom: 8,
            color: utilities.fontColor.gray800,
          }}
        >
          By Instructor
        </Text>
        <Text style={styles.description}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam
          voluptatem odio accusamus ratione aspernatur et impedit libero sequi
          omnis, eaque ea, eum dolores expedita eius magni ex excepturi. Nemo,
          voluptates!
        </Text>
        <TouchableOpacity
          style={[globalStyle.primaryButton, { width: "100%", marginTop: 20 }]}
          onPress={goHome}
        >
          <Text variant="titleLarge" style={globalStyle.textButton}>
            Back to Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    padding: 16,
    zIndex: 2,
    elevation: 2,
    marginTop: -32,
    marginBottom: 10,
    borderRadius: 16,
    backgroundColor: "white",
    shadowColor: "white",
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    marginBottom: 8,
    // color: color.main,
  },
  sectionPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: utilities.fontColor.gray900,
  },
  subHeading: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: utilities.fontColor.gray700,
    lineHeight: 18,
    textAlign: "justify",
    marginBottom: 16,
  },
  icon: {
    width: 40,
    height: 40,
    textAlign: "center",
    paddingTop: 8,
    borderRadius: 20,
  },
});
