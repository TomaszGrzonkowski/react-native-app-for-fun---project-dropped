import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "../Training/node_modules/@react-navigation/native";

const Profile = ({ navigation }) => {
  const [allProfiles, setAllProfiles] = useState([]);
  const fetchProfileData = async () => {
    try {
      let profiles = await AsyncStorage.getItem("profiles");
      profiles = JSON.parse(profiles);
      if (profiles) {
        setAllProfiles(profiles);
      }
    } catch (e) {
      console.log("error from asyncstorage", e);
    }
  };
  useEffect(() => {
    fetchProfileData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchProfileData();
    }, [])
  );

  const actualProfile = allProfiles[allProfiles.length - 1];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Twój profil</Text>
      <Text style={styles.text}>Twoje ostatnie wymiary:</Text>
      <Text style={styles.text}>
        Waga: {actualProfile && actualProfile.weight}
      </Text>
      <Text style={styles.text}>
        Klatka piersiowa: {actualProfile && actualProfile.chest}cm
      </Text>
      <Text style={styles.text}>
        Biceps: {actualProfile && actualProfile.biceps}cm
      </Text>
      <Text style={styles.text}>
        Obwód pasa: {actualProfile && actualProfile.stomach}cm
      </Text>
      <Text style={styles.text}>
        Obwód uda: {actualProfile && actualProfile.legSize}cm
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("upgradeProfile")}
      >
        <Text style={styles.buttonText}>Zmień</Text>
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
    marginLeft: 15,
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
});

export default Profile;
