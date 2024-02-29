import { Picker } from "@react-native-picker/picker";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { app } from "../../firebaseConfig";

const AddPostScreen = () => {
  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  // Used to get category list
  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Category"));
    querySnapshot.forEach((doc) => {
      console.log("Docs:", doc.data());
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  return (
    <View className="p-10">
      <Text className="text-[27px] font-bold">Add New Post</Text>
      <Text className="text-[16px] text-gray-500 mb-7">
        Create New Post and Start Selling
      </Text>
      <Formik
        initialValues={{
          title: "",
          desc: "",
          category: "",
          address: "",
          price: "",
          image: "",
        }}
        onSubmit={(value) => console.log(value)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
        }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={values?.title}
              onChangeText={handleChange("title")}
            ></TextInput>
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={values?.desc}
              numberOfLines={5}
              onChangeText={handleChange("desc")}
            ></TextInput>
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={values?.price}
              keyboardType="number-pad"
              onChangeText={handleChange("price")}
            ></TextInput>
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={values?.address}
              onChangeText={handleChange("address")}
            ></TextInput>

            {/* Category List Dropdown */}
            <View style={{ borderWidth: 1, borderRadius: 10, marginTop: 15 }}>
              <Picker
                selectedValue={values?.category}
                className="border-2"
                onValueChange={(itemValue) =>
                  setFieldValue("category", itemValue)
                }
              >
                {categoryList &&
                  categoryList.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item?.name}
                      value={item?.name}
                    ></Picker.Item>
                  ))}
              </Picker>
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              className="p-4 bg-blue-500 rounded-full mt-10"
            >
              <Text className="text-white text-center text-[16px]">Submit</Text>
            </TouchableOpacity>
            {/* 
            <Button
              onPress={handleSubmit}
              title="submit"
              className="mt-7"
            ></Button> */}
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingTop: 15,
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 17,
    textAlignVertical: "top",
    fontSize: 17,
  },
});

export default AddPostScreen;
