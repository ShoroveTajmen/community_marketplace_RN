import { collection, getDocs, getFirestore, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { app } from "../../firebaseConfig";
import Categories from "../Components/HomeScreen/Categories";
import Header from "../Components/HomeScreen/Header";
import LatestItemList from "../Components/HomeScreen/LatestItemList";
import Slider from "../Components/HomeScreen/Slider";

const HomeScreen = () => {
  const db = getFirestore(app);
  const [sliderList, setSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [latestItemList, setLatestItemList] = useState([]);
  useEffect(() => {
    getSliders();
    getCategoryList();
    getLatestItemList();
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

  // Used to get category list
  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Category"));
    querySnapshot.forEach((doc) => {
      // console.log("Docs:", doc.data());
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  //get latest item list
  const getLatestItemList = async () => {
    setLatestItemList([]);
    const querySnapshot = await getDocs(
      collection(db, "UserPost"),
      orderBy("createdAt", "desc")
    );
    querySnapshot.forEach((doc) => {
      console.log("Docs", doc.data());
      setLatestItemList((latestItemList) => [...latestItemList, doc.data()]);
    });
  };

  return (
    <ScrollView className="py-8 px-6 bg-white flex-1">
      <Header></Header>
      {/* Slider */}
      <Slider sliderList={sliderList}></Slider>
      {/* Category List */}
      <Categories categoryList={categoryList}></Categories>
      {/* Latest Item List */}
      <LatestItemList latestItemList={latestItemList}></LatestItemList>
    </ScrollView>
  );
};

export default HomeScreen;
