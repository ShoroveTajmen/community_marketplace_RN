import React from "react";
import { FlatList, Image, View } from "react-native";

const Slider = ({ sliderList }) => {
  return (
    <View className="mt-5">
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View>
            <Image
              source={{ uri: item?.image }}
              className="h-[200px] w-[330px] mr-3 rounded-lg object-contain"
            />
          </View>
        )}
      ></FlatList>
    </View>
  );
};

export default Slider;
