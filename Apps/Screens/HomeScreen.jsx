import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { app } from "../../firebaseConfig";
import Header from "../Components/HomeScreen/Header";
import Slider from "../Components/HomeScreen/Slider";

const HomeScreen = () => {
  const db = getFirestore(app);
  const [sliderList, setSliderList] = useState([]);
  useEffect(() => {
    getSliders();
  }, []);

  // used to get sliders for home screen
  const getSliders = async () => {
    setSliderList([]);
    const querySnapshot = await getDocs(collection(db, "Sliders"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setSliderList((sliderList) => [...sliderList, doc.data()]);
    });
  };

  return (
    <View className="py-8 px-6 bg-white flex-1">
      <Header></Header>
      {/* Slider */}
      <Slider sliderList={sliderList}></Slider>
    </View>
  );
};

export default HomeScreen;
