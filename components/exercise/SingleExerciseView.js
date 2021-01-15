import { View, Text, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import YoutubePlayer from "react-native-youtube-iframe";

const SingleExerciseView = ({ route }) => {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const { items } = route.params;
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>{items.name}</Text>
      </View>
      <View style={styles.contentContainer}>
        <YoutubePlayer
          ref={playerRef}
          height={200}
          width={300}
          videoId={items.link}
          play={playing}
          onChangeState={(event) => console.log(event)}
          onReady={() => console.log("ready")}
          onError={(e) => console.log(e)}
          onPlaybackQualityChange={(q) => console.log(q)}
          volume={50}
          playbackRate={1}
          playerParams={{
            cc_lang_pref: "us",
            showClosedCaptions: true,
          }}
        />
        <Text style={styles.description}>Opis: {items.description}</Text>
      </View>
    </View>
  );
};

export default SingleExerciseView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1A40",
  },
  contentContainer: {
    backgroundColor: "#8E7CA6",
    padding: 20,
    borderRadius: 10,
    margin: 15,
    alignItems: "center",
  },
  description: {
    alignSelf: "flex-start",
  },
  header: {
    alignSelf: "flex-start",
    fontSize: 30,
    color: "#9e4ed4",
    marginTop: 10,
    marginLeft: 5,
    marginBottom: 30,
  },
});
