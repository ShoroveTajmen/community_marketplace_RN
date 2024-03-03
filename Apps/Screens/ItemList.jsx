import { useRoute } from "@react-navigation/native";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { app } from "../../firebaseConfig";
import LatestItemList from "../Components/HomeScreen/LatestItemList";

const ItemList = () => {
  const { params } = useRoute();
  const db = getFirestore(app);
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    params && getItemListByCategory();
  }, [params]);

  const getItemListByCategory = async () => {
    setItemList([]);
    setLoading(true);
    const q = query(
      collection(db, "UserPost"),
      where("category", "==", params.category)
    );
    const snapshot = await getDocs(q);
    setLoading(false);
    snapshot.forEach((doc) => {
      console.log(doc.data());
      setItemList((itemList) => [...itemList, doc.data()]);
      setLoading(false);
    });
  };
  return (
    <View className="p-2">
      {loading ? (
        <ActivityIndicator className="mt-24" size={"large"} color={"#3b82f6"} />
      ) : itemList?.length > 0 ? (
        <LatestItemList latestItemList={itemList} heading={"Latest Post"} />
      ) : (
        <Text className="p-5 text-[20px] text-gray-400 justify-center text-center mt-24">
          No Post Found
        </Text>
      )}
    </View>
  );
};

export default ItemList;
