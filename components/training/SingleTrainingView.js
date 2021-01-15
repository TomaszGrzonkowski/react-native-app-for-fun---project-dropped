
import { View, Text, StyleSheet, AsyncStorage, ScrollView} from 'react-native'
import React, { useRef, useState, useEffect } from 'react';
import useFocusEffect from '@react-navigation/native'
import YoutubePlayer from '../Exercise/node_modules/react-native-youtube-iframe'

const SingleTrainingView = ({ route }) => {
    const playerRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const { items } = route.params
    const [allExercises, setAllExercises] = useState([]);
    
    const fetchData = async () => {
        try {
            const result = await AsyncStorage.getItem('exercises');
            console.log(result);
            const exercises = JSON.parse(result);
            if (exercises)
                setAllExercises(exercises)

        } catch (e) {
            console.log('error from asyncstorage', e);
        }
    }

    useEffect(() => {

        fetchData();
    }, [])

    // useFocusEffect(
    //     React.useCallback(() => {

    //         fetchData();
    //     })
    // )

    return (
        <View style={ styles.container }>
            <Text style ={styles.header}>{ items.name }</Text>
            <Text style={styles.text}>Ćwiczenia</Text>
            < ScrollView style={styles.scrollView}>
                { allExercises.filter(ex => items.exercises.includes(ex.id)).map((el) => {
                    return (
                        <View style={styles.contentContainer} key={ el.id }>
                            <YoutubePlayer
                                ref={ playerRef }
                                height={ 200 }
                                width={ 300 }
                                videoId={ el.link }
                                play={ playing }
                                onChangeState={ event => console.log(event) }
                                onReady={ () => console.log("ready") }
                                onError={ e => console.log(e) }
                                onPlaybackQualityChange={ q => console.log(q) }
                                volume={ 50 }
                                playbackRate={ 1 }
                                playerParams={ {
                                    cc_lang_pref: "us",
                                    showClosedCaptions: true
                                } }
                            />
                            <Text style={styles.descText}>{ el.name }</Text>
                            <Text style={styles.descText}>{ el.description }</Text>
                        </View>
                    )
                }) }
            </ScrollView>

        </View>
    )
}

export default SingleTrainingView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1A40',
    },
    contentContainer: {
        backgroundColor: "#8E7CA6",
        padding: 20,
        borderRadius: 10,
        margin: 15,
        // alignItems: 'center'
    },
    description: {
        alignSelf: "flex-start"
    },
    header: {
        alignSelf: "flex-start",
        fontSize: 30,
        color: '#9e4ed4',
        marginTop: 10,
        marginLeft: 5,
        marginBottom: 5
    },
    text: {
        fontSize: 15,
        color: "#fff",
        marginLeft: 5
    },
    descText: {
        color:'#1F1A40',
        fontSize: 16,
        marginLeft: 5
    },
    scrollView: {
        marginTop: 15
    }
})
