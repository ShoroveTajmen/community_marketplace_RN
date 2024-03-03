import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const PostItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="flex-1 m-2 p-2 rounded-lg border-[1px] border-slate-200"
      onPress={() =>
        navigation.push("product-detail", {
          product: item,
        })
      }
    >
      <Image
        source={{ uri: item.image }}
        className="w-full h-[140px] rounded-lg"
      />
      <View>
        <Text className="text-blue-500 bg-blue-200 p-1 rounded-full px-2 text-[12px] w-[80px] text-center mt-1">
          {item.category}
        </Text>
        <Text className="text-[15px] font-bold mt-2">{item.title}</Text>
        <Text className="text-[20px] font-bold text-blue-500">
          {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PostItem;
