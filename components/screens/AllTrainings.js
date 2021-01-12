import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, AsyncStorage, ScrollView, TouchableOpacity} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import SingleTraining from '../training/singleTraining';

const AllTrainings = ({ navigation }) => {

    const [allTrainings, setAllTrainings] = useState([]);
    const fetchData = async () => {
        try {
            const result = await AsyncStorage.getItem('trainings');
            const trainings = JSON.parse(result);
            if (trainings)
                setAllTrainings(trainings)

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

    const navigate = (item) => {
        navigation.navigate('singleTrainingView', { items: item })
    }

    const removeTraining = async (id) => {
        let trainings = await AsyncStorage.getItem('trainings');
        trainings = JSON.parse(trainings);
        const newTrainings = trainings.filter(el => el.id !== id)
        setAllTrainings(newTrainings);
        await AsyncStorage.setItem('trainings', JSON.stringify(newTrainings));

    }

    return (
        <View style={ styles.container }>
            <ScrollView>
                { allTrainings.map((el) => <SingleTraining key={ el.id } item={ el } navigate={ navigate } remove={ removeTraining } />) }
            </ScrollView>
            <TouchableOpacity
                style={ styles.button }
                onPress={() => navigation.navigate('addTrain') }>
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
});


export default AllTrainings
