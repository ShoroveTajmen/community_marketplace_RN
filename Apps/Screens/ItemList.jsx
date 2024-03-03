import { useRoute } from "@react-navigation/native";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { app } from "../../firebaseConfig";
import LatestItemList from "../Components/HomeScreen/LatestItemList";

const ItemList = () => {
  const { params } = useRoute();
  const db = getFirestore(app);
  const [itemList, setItemList] = useState([]);
  useEffect(() => {
    params && getItemListByCategory();
  }, [params]);

  const getItemListByCategory = async () => {
    setItemList([]);
    const q = query(
      collection(db, "UserPost"),
      where("category", "==", params.category)
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      console.log(doc.data());
      setItemList((itemList) => [...itemList, doc.data()]);
    });
  };
  return (
    <View className="p-2">
      {itemList?.length > 0 ? (
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
