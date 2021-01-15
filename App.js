import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./components/screens/HomeScreen";
import Trainings from "./components/trainingsNav";
import MyProfileNav from "./components/MyProfileNav";
import ExercisesNav from "./components/exercisesNav";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "#9343d4",
          activeBackgroundColor: "#1F1A40",
          inactiveTintColor: "#8E7CA6",
          inactiveBackgroundColor: "#463973",
          tabStyle: {
            alignItems: "center",
            justifyContent: "center",
          },
          labelStyle: {
            fontWeight: "bold",
            fontSize: 16,
          },
        }}
      >
        <Tab.Screen name="Główna" component={Home} />
        <Tab.Screen name="Treningi" component={Trainings} />
        <Tab.Screen name="Ćwiczenia" component={ExercisesNav} />
        <Tab.Screen name="Profil" component={MyProfileNav} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
