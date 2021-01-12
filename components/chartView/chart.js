import React from 'react';
import { LineChart } from "react-native-chart-kit";
import {StyleSheet, Dimensions, Text,View} from 'react-native';

const Chart = ({part,bodyPart,unit}) => {
    return(
        <View style={styles.contentContainer}>
                <Text style={styles.header}>{part}</Text>
                <Text style={styles.normalText}>{part} z ostatnich pomiarów:</Text>
                <LineChart
                    data={{
                        labels: [],
                        datasets: [
                            {
                                data: bodyPart
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width} // from react-native
                    height={220}
                    yAxisLabel=""
                    yAxisSuffix={unit}
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#8E7CA6",
                        backgroundGradientTo: "#463973",
                        decimalPlaces: 1, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#68328C"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 0
                    }}
                />
            </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1A40',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5
    },
    header: {
        alignSelf: "flex-start",
        fontSize: 30,
        color: '#9e4ed4',
        marginLeft: 5
    },
    normalText: {
        alignSelf: "flex-start",
        color: '#8E7CA6',
        marginLeft: 5
    },
    contentContainer: {
        backgroundColor: '#463973',
    }
});
export default Chart;