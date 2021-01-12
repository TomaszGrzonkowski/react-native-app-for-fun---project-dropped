import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, AsyncStorage, ScrollView, TouchableOpacity } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import SingleExercise from '../exercise/singleExercise';

const Exercises = ({ navigation }) => {

    const [allExercises, setAllExercises] = useState([]);
    const fetchData = async () => {
        try {
            const result = await AsyncStorage.getItem('exercises');
            const exercises = JSON.parse(result);
            if (exercises)
                setAllExercises(exercises);
                console.log(exercises);

        } catch (e) {
            console.log('error from asyncstorage', e);
        }
    }

    useEffect(() => {

        fetchData();
    }, [])

    useFocusEffect(
        React.useCallback(() => {

            fetchData();
        }, [])
    )

    const removeExercise = async (id) => {
        //usuwanie z cwiczen
        let exercises = await AsyncStorage.getItem('exercises');
        exercises = JSON.parse(exercises);
        exercises = exercises.filter((el) => el.id !== id);
        setAllExercises(exercises);
        await AsyncStorage.setItem('exercises', JSON.stringify(exercises));
        //usuwanie z treningow
        let trainings = await AsyncStorage.getItem('trainings');
        trainings = JSON.parse(trainings);
        const newTrainings = trainings.map((el) => ({
            ...el,
            exercises: el.exercises.filter((exerciseId) => exerciseId !== id)
        }));
        await AsyncStorage.setItem('trainings', newTrainings)

    }

    const navigate = (item) => {
        navigation.navigate('singleExerciseView', { items: item })
    }

    return (
        <View style={ styles.container }>
            <ScrollView>
                { allExercises.map((el) => <SingleExercise key={ el.id } item={ el } navigate={ navigate } remove={ removeExercise } />) }
            </ScrollView>
            <TouchableOpacity
                style={ styles.button }
                onPress={ () => navigation.navigate('addExer') }>
                <Text style={ styles.buttonText }>Dodaj</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1A40',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 70,
        height: 70,
        borderRadius: 100,
        backgroundColor: '#9e4ed4',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        marginBottom: 15,
        marginRight: 15,
        bottom: 0,
        right: 0
    },
    buttonText: {
        fontSize: 16,
        color: "#fff"
    },
    scrollv: {
        alignItems: 'center'
    }
});


export default Exercises