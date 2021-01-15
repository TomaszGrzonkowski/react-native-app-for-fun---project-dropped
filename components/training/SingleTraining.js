import React from 'react';
import { View, StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from '../Exercise/node_modules/react-native-gesture-handler';

const SingleTraining = ({ item, navigate, trainingOpt, add, remove }) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.header}>Trening:</Text>
                <Text style={ styles.text }>{ item.name }</Text>
            </View>
            <View>
                <TouchableOpacity
                    style={[styles.button, styles.removebutton]}
                    onPress={() => navigate(item)}>
                    <Text style={styles.buttonText}>Zobacz</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => remove(item.id)}>
                    <Text style={styles.buttonText}>Usuń</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
    // dodaje wyzej add(item.id) do tablicy z wybranymi cwiczeniami


}

const styles = StyleSheet.create({
    container: {
        // width: '100%',
        height: 100,
        backgroundColor: "#8E7CA6",
        color: "#fff",
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
        padding: 10,
        borderRadius: 10,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        color: "#463973",
        fontSize: 20,
        width: 200
    },
    header: {
        color: '#1F1A40',
        fontSize: 15,
        fontWeight: "bold"
    },
    button: {
        width: 80,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#9e4ed4',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
    },
    buttonText: {
        fontSize: 15,
        color: "#fff"
    },
    removebutton: {
        backgroundColor: '#7A6FBF',
    }
})

export default SingleTraining;
