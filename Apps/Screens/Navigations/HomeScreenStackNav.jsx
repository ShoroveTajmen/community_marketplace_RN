import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "../HomeScreen";
import ItemList from "../ItemList";

const Stack = createStackNavigator();

const HomeScreenStackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="item-list"
        component={ItemList}
        options={({ route }) => ({
          title: route.params.category,
          headerStyle: {
            backgroundColor: "#3b82f6",
          },
          headerTintColor: "#fff",
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeScreenStackNav;
