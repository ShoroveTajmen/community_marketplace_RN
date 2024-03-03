import React from "react";
import { FlatList, Text, View } from "react-native";
import PostItem from "./PostItem";

const LatestItemList = ({ latestItemList }) => {
  return (
    <View className="mt-3">
      <Text className="font-bold text-[20px]">Latest Items</Text>
      <FlatList
        data={latestItemList}
        numColumns={2}
        renderItem={({ item, index }) => <PostItem item={item} />}
      />
    </View>
  );
};

export default LatestItemList;
