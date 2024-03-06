import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { app } from "../../firebaseConfig";
import LatestItemList from "../Components/HomeScreen/LatestItemList";

const MyProducts = () => {
  const db = getFirestore(app);
  const { user } = useUser();
  const [productList, setProductList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    user && getUserPost();
  }, [user]);

  useEffect(() => {
    navigation.addListener("focus", (e) => {
      getUserPost();
    });
  }, [navigation]);

  // Used to get User Post Only
  const getUserPost = async () => {
    setProductList([]);
    const q = query(
      collection(db, "UserPost"),
      where("userEmail", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      setProductList((productList) => [...productList, doc.data()]);
    });
  };
  return (
    <View>
      <LatestItemList latestItemList={productList}></LatestItemList>
    </View>
  );
};

export default MyProducts;
