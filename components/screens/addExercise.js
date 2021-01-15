import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";

const AddExercise = ({ navigation }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const giveMeId = (url) => {
    const VID_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return url.match(VID_REGEX)[1];
  };
  const addEx = async () => {
    const newExercise = {
      id: new Date().getTime(),
      name: name,
      description: description,
      link: giveMeId(link),
    };
    try {
      let exercises = await AsyncStorage.getItem("exercises");
      if (exercises !== null) {
        exercises = JSON.parse(exercises);
        exercises.push(newExercise);
        await AsyncStorage.setItem("exercises", JSON.stringify(exercises));
      } else {
        const allExer = [];
        allExer.push(newExercise);
        await AsyncStorage.setItem("exercises", JSON.stringify(allExer));
      }
    } catch (e) {
      console.log("error from asyncstorage", e);
    }
    navigation.navigate("allExer");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dodawanie ćwiczenia: </Text>
      <TextInput
        style={styles.textinput}
        placeholder={"Wpisz nazwę ćwiczenia"}
        value={name}
        onChangeText={(val) => setName(val)}
      />
      <TextInput
        style={styles.textinput}
        placeholder={"Dodaj krótki opis"}
        value={description}
        onChangeText={(val) => setDescription(val)}
      />
      <TextInput
        style={styles.textinput}
        placeholder={"Link do youtube"}
        value={link}
        onChangeText={(val) => setLink(val)}
      />
      <TouchableOpacity style={styles.button} onPress={addEx}>
        <Text style={styles.buttonText}>Zapisz</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1A40",
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: "#9e4ed4",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    marginBottom: 15,
    marginRight: 15,
    bottom: 0,
    right: 0,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
  textinput: {
    height: 40,
    marginLeft: 15,
    marginRight: 15,
    borderColor: "#1F1A40",
    borderBottomColor: "#9e4ed4",
    borderWidth: 1,
    paddingLeft: 6,
    color: "#fff",
    fontSize: 16,
  },
  header: {
    alignSelf: "flex-start",
    fontSize: 30,
    color: "#9e4ed4",
    marginTop: 10,
    marginLeft: 5,
    marginBottom: 30,
  },
  text: {
    fontSize: 20,
    color: "#8E7CA6",
    marginBottom: 10,
  },
});

export default AddExercise;
