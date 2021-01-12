import React from 'react';
import { Text, View, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import AllTrainings from './screens/AllTrainings';
import AddTraining from './screens/AddTraining';
import SingleTrainingView from './training/singleTrainingView'

const Trainings = () => {

    const Stack = createStackNavigator()
    return (
        <Stack.Navigator initialRouteName={ 'allTrain' }>
            <Stack.Screen
                name={ 'allTrain' }
                component={ AllTrainings }
                options={ {
                    title: 'Treningi',
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: '#463973'
                    },
                    headerTintColor: '#fff'
                } } />
            <Stack.Screen
                name={ 'addTrain' }
                component={ AddTraining }
                options={ {
                    title: 'Dodaj Trening',
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: '#463973'
                    },
                    headerTintColor: '#fff'
                } } />
            <Stack.Screen
                name={ 'singleTrainingView' }
                component={ SingleTrainingView }
                options={ {
                    title: 'Training View',
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: '#463973'
                    },
                    headerTintColor: '#fff'
                } } />
        </Stack.Navigator>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Trainings