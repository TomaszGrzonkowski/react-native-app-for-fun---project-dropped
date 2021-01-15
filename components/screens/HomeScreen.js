import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  AsyncStorage,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "../Training/node_modules/@react-navigation/native";
import Chart from "../ChartView/Chart";

const Home = () => {
  const [allProfiles, setAllProfiles] = useState(null);
  const [labels, setAllLabels] = useState(["22/03/2020"]);
  const [weights, setAllWeights] = useState([0]);
  const [bicepses, setAllBicepses] = useState([0]);
  const [chests, setAllChests] = useState([0]);
  const fetchProfileData = async () => {
    try {
      let profiles = await AsyncStorage.getItem("profiles");
      profiles = JSON.parse(profiles);
      if (profiles) {
        setAllProfiles(profiles);
        const labels = profiles.map((el) => el.data);
        setAllLabels(labels);
        const weights = profiles.map((el) => el.weight);
        setAllWeights(weights);
        const bicepses = profiles.map((el) => el.biceps);
        setAllBicepses(bicepses);
        const chests = profiles.map((el) => el.chest);
        setAllChests(chests);
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

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Twój progres</Text>
      </View>
      <ScrollView style={styles.container}>
        <Chart bodyPart={weights} part={"Waga"} unit={"kg"}></Chart>
        <Chart bodyPart={chests} part={"Klatka piersiowa"} unit={"cm"}></Chart>
        <Chart bodyPart={bicepses} part={"Biceps"} unit={"cm"}></Chart>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    height: 90,
    backgroundColor: "#1F1A40",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#1F1A40",
  },
  header: {
    alignSelf: "flex-start",
    fontSize: 30,
    color: "#9e4ed4",
    marginLeft: 5,
  },
  normalText: {
    alignSelf: "flex-start",
    color: "#8E7CA6",
    marginLeft: 5,
  },
  contentContainer: {
    backgroundColor: "#463973",
  },
});

export default Home;
