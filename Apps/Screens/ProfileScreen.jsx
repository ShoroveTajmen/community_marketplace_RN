import { useUser } from "@clerk/clerk-expo";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import avatar from "./../../assets/avatar.jpg";
import diary from "./../../assets/diary-removebg-preview.png";
import logout from "./../../assets/logout.png";
import search from "./../../assets/search.jpg";

const ProfileScreen = () => {
  const { user } = useUser();

  const menuList = [
    {
      id: 1,
      name: "My Products",
      icon: diary,
    },
    {
      id: 2,
      name: "Explore",
      icon: search,
    },
    {
      id: 3,
      name: "Shorove Tajmen",
      icon: avatar,
    },
    {
      id: 4,
      name: "LogOut",
      icon: logout,
    },
  ];

  return (
    <View className="p-5 bg-white flex-1">
      <View className="items-center mt-14">
        <Image
          source={{ uri: user?.imageUrl }}
          className="w-[100px] h-[100px] rounded-full"
        />
        <Text className="font-bold text-[25px] mt-2">{user?.fullName}</Text>
        <Text className="text-[18px] mt-2 text-gray-500">
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>

      <FlatList
        data={menuList}
        numColumns={3}
        style={{ marginTop: 20 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity className="flex-1 p-3 border-[1px] items-center m-4 border-blue-400 bg-blue-50 rounded-lg mx-2 mt-3">
            {item.icon && (
              <Image source={item?.icon} className="w-[50px] h-[50px]" />
            )}
            <Text className="text-[12px] mt-2 text-blue-700">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ProfileScreen;
