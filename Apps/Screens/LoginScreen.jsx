import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const LoginScreen = () => {
  return (
    <View>
      <Image
        source={require("./../../assets/images/login_pic.png")}
        className="w-full h-[400px] object-cover"
      ></Image>
      <View className="p-8 bg-[#F1EAFF] h-full mt-[-20px] rounded-t-3xl shadow-md ">
        <Text className="text-[30px] font-bold">Community Marketplace</Text>
        <Text className="text-[18px] text-slate-500 mt-6">
          Buy Sell Marketplace where you can sell old item and make real money
        </Text>
        <TouchableOpacity
          onPress={() => console.log("SignIn")}
          className="p-4 bg-blue-500 rounded-full mt-20"
        >
          <Text className="text-white text-center text-[18px]">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
