import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { format } from "date-fns";

const UpgradeProfile = ({ navigation }) => {
  const [weight, setWeight] = useState(null);
  const [chest, setChest] = useState(null);
  const [biceps, setBiceps] = useState(null);
  const [stomach, setStomach] = useState(null);
  const [legSize, setLegSize] = useState(null);

  const upgradeProfile = async () => {
    const profile = {
      id: new Date().getTime(),
      weight: weight,
      chest: chest,
      biceps: biceps,
      stomach: stomach,
      legSize: legSize,
      data: format(new Date(), "MM/dd/yyyy"),
    };

    try {
      let profiles = await AsyncStorage.getItem("profiles");
      if (profiles !== null) {
        profiles = JSON.parse(profiles);
        profiles.push(profile);
        await AsyncStorage.setItem("profiles", JSON.stringify(profiles));
      } else {
        const allProfiles = [];
        allProfiles.push(profile);
        await AsyncStorage.setItem("profiles", JSON.stringify(allProfiles));
      }
    } catch (e) {
      console.log("error from local storage", e);
    }
    navigation.navigate("Profile");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Podaj nowe wymiary</Text>
      <TextInput
        style={styles.textinput}
        keyboardType="numeric"
        placeholder={"Wpisz swoją aktualną wagę"}
        value={weight}
        onChangeText={(val) => setWeight(parseFloat(val))}
      />
      <TextInput
        style={styles.textinput}
        keyboardType="numeric"
        placeholder={"Wpisz swoj obwod klatki"}
        value={chest}
        onChangeText={(val) => setChest(parseFloat(val))}
      />
      <TextInput
        style={styles.textinput}
        keyboardType="numeric"
        placeholder={"Wpisz swoj obwod bicepsa"}
        value={biceps}
        onChangeText={(val) => setBiceps(parseFloat(val))}
      />
      <TextInput
        style={styles.textinput}
        keyboardType="numeric"
        placeholder={"Wpisz swoj obwod pasa"}
        value={stomach}
        onChangeText={(val) => setStomach(parseFloat(val))}
      />
      <TextInput
        style={styles.textinput}
        keyboardType="numeric"
        placeholder={"Wpisz swoj obwod uda"}
        value={legSize}
        onChangeText={(val) => setLegSize(parseFloat(val))}
      />
      <TouchableOpacity style={styles.button} onPress={upgradeProfile}>
        <Text style={styles.buttonText}>Zapisz</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1A40",
    // alignItems: 'center',
    // justifyContent: 'center',
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
});

export default UpgradeProfile;
