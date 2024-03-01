import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TextInput, View } from "react-native";

const Header = () => {
  const { user } = useUser();
  return (
    <View>
      {/*User Info Section */}
      <View className="flex flex-row items-center gap-2">
        <Image
          source={{ uri: user?.imageUrl }}
          className="rounded-full w-12 h-12"
        ></Image>
        <View>
          <Text className="text-[16px]">Welcome</Text>
          <Text className="text-[20px] font-bold">{user?.fullName}</Text>
        </View>
      </View>

      {/* Search bar */}
      <View className="p-3 px-5 bg-white mt-5 rounded-full flex flex-row items-center border-[1px] border-blue-500">
        <Ionicons name="search" size={24} color="black" />
        <TextInput
          placeholder="Search"
          className="ml-2 text-[18px]"
          onChangeText={(value) => console.log(value)}
        ></TextInput>
      </View>
    </View>
  );
};

export default Header;
