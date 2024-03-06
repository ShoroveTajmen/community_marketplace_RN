import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { app } from "../../firebaseConfig";

const ProductDetail = ({ navigation }) => {
  const { user } = useUser();
  const db = getFirestore(app);
  const nav = useNavigation();
  const { params } = useRoute();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    params && setProduct(params.product);
    shareButton();
  }, [params, navigation]);

  const shareButton = () => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          onPress={() => shareProduct()}
          name="share-social-sharp"
          size={24}
          color="white"
          style={{ marginRight: 10 }}
        />
      ),
    });
  };

  //Used to share product
  const shareProduct = () => {
    const content = {
      message: product?.title + "\n" + product?.desc,
    };
    Share.share(content).then(
      (resp) => {
        console.log(resp);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const sendEmailMessage = () => {
    const subject = "Regarding" + product.title;
    const body =
      "Hi" + product.userName + "\n" + "I am interested in this product";
    Linking.openURL(
      "mailto:" + product.userEmail + "?subject=" + subject + "&body=" + body
    );
  };

  const deleteUserPost = () => {
    Alert.alert("Do You want to Delete?", "Are you want to delete this post?", [
      {
        text: "Yes",
        onPress: () => deleteFromFirestore(),
      },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
    ]);
  };
  const deleteFromFirestore = async () => {
    console.log("Deleted");
    const q = query(
      collection(db, "UserPost"),
      where("title", "==", product.title)
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      deleteDoc(doc.ref).then((resp) => {
        console.log("Deleted the Doc...");
        nav.goBack();
      });
    });
  };

  return (
    <ScrollView className="bg-white">
      <Image source={{ uri: product.image }} className="h-[320px] w-full" />
      <View className="p-3">
        <Text className="text-[24px] font-bold">{product?.title}</Text>
        <View className="items-baseline">
          <Text className="p-1 bg-blue-200 text-blue-500 mt-2 px-2 rounded-full">
            {product?.category}
          </Text>
        </View>
        <Text className="text-[20px] mt-3 font-bold">Description</Text>
        <Text className="text-[17px] text-gray-500 mb-4">{product?.desc}</Text>
      </View>

      {/* User Info */}
      <View className="p-3 flex flex-row items-center gap-3 bg-blue-100 border-gray-400">
        <Image
          source={{ uri: product.userImage }}
          className="w-12 h-12 rounded-full"
        />
        <View>
          <Text className="font-bold text-[18px]">{product.userName}</Text>
          <Text className="text-gray-500">{product.userEmail}</Text>
        </View>
      </View>

      {/* send message portion */}
      {user?.primaryEmailAddress.emailAddress == product.userEmail ? (
        <TouchableOpacity
          onPress={() => deleteUserPost()}
          className="z-40 bg-red-500 m-2 p-4 rounded-full"
        >
          <Text className="text-center text-white">Delete Post</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => sendEmailMessage()}
          className="z-40 bg-blue-500 m-2 p-4 rounded-full"
        >
          <Text className="text-center text-white">Send Message</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default ProductDetail;
