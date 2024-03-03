import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const ProductDetail = () => {
  const { params } = useRoute();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    params && setProduct(params.product);
  }, []);

  const sendEmailMessage = () => {
    const subject = "Regarding" + product.title;
    const body =
      "Hi" + product.userName + "\n" + "I am interested in this product";
    Linking.openURL(
      "mailto:" + product.userEmail + "?subject=" + subject + "&body=" + body
    );
  };

  return (
    <ScrollView className="bg-white">
      <Image source={{ uri: product.image }} className="h-[320px] w-full" />
      <View className="p-3">
        <Text className="text-[24px] font-bold">{product?.title}</Text>
        <View className="items-baseline">
          <Text className="p-1 bg-blue-200 text-blue-500 mt-2 px-2 rounded-full">
            {product?.category}
          </Text>
        </View>
        <Text className="text-[20px] mt-3 font-bold">Description</Text>
        <Text className="text-[17px] text-gray-500 mb-4">{product?.desc}</Text>
      </View>

      {/* User Info */}
      <View className="p-3 flex flex-row items-center gap-3 bg-blue-100 border-gray-400">
        <Image
          source={{ uri: product.userImage }}
          className="w-12 h-12 rounded-full"
        />
        <View>
          <Text className="font-bold text-[18px]">{product.userName}</Text>
          <Text className="text-gray-500">{product.userEmail}</Text>
        </View>
      </View>

      {/* send message portion */}
      <TouchableOpacity
        onPress={() => sendEmailMessage()}
        className="z-40 bg-blue-500 m-2 p-4 rounded-full"
      >
        <Text className="text-center text-white">Send Message</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProductDetail;
