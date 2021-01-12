import React from 'react';
import { Text, View, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Profile from './screens/profile';
import UpgradeProfile from './screens/upgradeProfile';

const MyProfileNav = () => {

    const StackNav = createStackNavigator()
    return (
        <StackNav.Navigator initialRouteName={ "Profile" } >
            <StackNav.Screen
                name="Profile"
                component={ Profile }
                options={ {
                    title: "Profil",
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: '#463973'
                    },
                    headerTintColor: '#fff'
                } } />
            <StackNav.Screen
                name="upgradeProfile"
                component={ UpgradeProfile }
                options={ {
                    title: "Zaktualizuj profil",
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: '#463973'
                    },
                    headerTintColor: '#fff'
                } } />
        </StackNav.Navigator>
    )
}


export default MyProfileNav;