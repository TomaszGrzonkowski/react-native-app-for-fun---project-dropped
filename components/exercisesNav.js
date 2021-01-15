import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Exercises from "./screens/Exercises";
import AddExercise from "./screens/AddExercise";
import SingleExerciseView from "./Exercise/SingleExerciseView";

const ExercisesNav = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName={"allExer"}>
      <Stack.Screen
        name={"allExer"}
        component={Exercises}
        options={{
          title: "Ćwiczenia",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#463973",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name={"addExer"}
        component={AddExercise}
        options={{
          title: "Dodaj ćwiczenie",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#463973",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name={"singleExerciseView"}
        component={SingleExerciseView}
        options={{
          title: "Exercise View",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#463973",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ExercisesNav;
