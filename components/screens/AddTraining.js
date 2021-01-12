import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Button, AsyncStorage, TextInput, TouchableOpacity } from 'react-native';
import SingleExercise from '../exercise/singleExercise'
import { useFocusEffect } from '@react-navigation/native'




const AddTraining = ({ navigation }) => {
    const [name, setName] = useState('')
    const [chosenExercises, setChosenExercises] = useState([]);
    const [allExercises, setAllExercises] = useState([]);

    //sciaganie cwiczen z asyncstorage
    const fetchData = async () => {
        try {
            const result = await AsyncStorage.getItem('exercises');
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

    useFocusEffect(
        React.useCallback(() => {

            fetchData();
        })
    )

    const addExerciseToChosen = (id) => {
        if (chosenExercises.findIndex(el => el === id) === -1) {
            setChosenExercises(prevState => [...prevState, id]);
        }
    }


    const addTr = async () => {
        const newTraining = {
            id: new Date().getTime(),
            name: name,
            exercises: chosenExercises

        }
        try {
            let trainings = await AsyncStorage.getItem('trainings')
            if (trainings !== null) {
                trainings = JSON.parse(trainings);
                trainings.push(newTraining)
                await AsyncStorage.setItem('trainings', JSON.stringify(trainings))
            } else {
                const allTrainings = [];
                allTrainings.push(newTraining)
                await AsyncStorage.setItem('trainings', JSON.stringify(allTrainings))
            }
        } catch (e) {
            console.log('error from asyncstorage', e)
        }
        navigation.navigate('allTrain')


    }

    const findId = (id) => {
        return allExercises.find(ex => ex.id === id);
    }

    return (
        <View style={ styles.container }>
            <TextInput
                style={ styles.textinput }
                placeholder={ 'Wpisz nazwę treningu' }
                value={ name }
                onChangeText={ val => setName(val) } />
            <Text style={ styles.text }>Dodaj ćwiczenia do treningu</Text>
            <ScrollView>
                { allExercises.map((el) => <SingleExercise key={ el.id } item={ el } trainingOpt add={ addExerciseToChosen } />) }
            </ScrollView>
            <Text style={ styles.text }>Wybrane ćwiczenia</Text>
            <ScrollView>
                { chosenExercises.map((id) => <SingleExercise key={ id } item={ findId(id) } trainingOpt choosen add={ addExerciseToChosen } />) }
            </ScrollView>
            <TouchableOpacity
                style={ styles.button }
                onPress={ addTr }>
                <Text style={ styles.buttonText }>Zapisz</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1A40',
    },
    text: {
        color: "#463973",
        fontSize: 16,
        marginTop: 10,
        marginLeft: 15
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
    textinput: {
        height: 40,
        marginLeft: 15,
        marginRight: 15,
        borderColor: '#1F1A40',
        borderBottomColor: '#9e4ed4',
        borderWidth: 1,
        paddingLeft: 6,
        color: "#fff",
        fontSize: 16
    },
    header: {
        alignSelf: "flex-start",
        fontSize: 30,
        color: '#9e4ed4',
        marginTop: 10,
        marginLeft: 5,
        marginBottom: 30
    },
});


export default AddTraining