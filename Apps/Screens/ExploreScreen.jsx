import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { app } from "../../firebaseConfig";
import LatestItemList from "../Components/HomeScreen/LatestItemList";

const ExploreScreen = () => {
  const db = getFirestore(app);
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    getAllProducts();
  }, []);

  // Used to get all products
  const getAllProducts = async () => {
    setProductList([]);
    const q = query(collection(db, "UserPost"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    snapshot.forEach((doc) => {
      // console.log(doc.data());
      setProductList((productList) => [...productList, doc.data()]);
    });
  };
  return (
    <ScrollView className="p-5 py-8">
      <Text className="text-[30px] font-bold">Explore Screen</Text>
      <LatestItemList latestItemList={productList} />
    </ScrollView>
  );
};

export default ExploreScreen;
