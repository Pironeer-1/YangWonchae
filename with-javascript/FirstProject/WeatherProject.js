import React, { Component } from "react";

import { StyleSheet, Text, View, TextInput, ImageBackground } from "react-native";
import OpenWeatherMap from "./open_weather_map";
import Forecast from "./Forecast";

class WeatherProject extends Component {
    constructor(props) {
        super(props);
        this.state = { zip: "", forecast: null };
    }

    _handleTextChange = event => {
        let zip = event.nativeEvent.text;
        OpenWeatherMap.fetchForecast(zip).then(forecast => {
            console.log(forecast);
            this.setState({ zip: zip, forecast: forecast });
        });
    };

    render() {
        let content = null;
        if(this.state.forecast !== null) {
            content = (
                <Forecast
                    main={this.state.forecast.main}
                    description={this.state.forecast.description}
                    temp={this.state.forecast.temp}
                />
            );
        }
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require("./flowers.jpg")}
                    resizeMode="cover"
                    style={styles.backdrop}>
                    <View style={styles.overlay}>
                        <View style={styles.row}>
                            <Text style={styles.mainText}>
                                Current weather for
                            </Text>
                            <View style={styles.zipContainer}>
                                <TextInput
                                    style={[styles.zipCode, styles.mainText]}
                                    onSubmitEditing={event => this._handleTextChange(event)}
                                />
                            </View>
                        </View>
                        {content}
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const baseFontSize = 16;

const styles =  StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 30
    },
    backdrop: { flex: 1, flexDirection: "column", width: 500 },
    overlay: {
        paddingTop: 5,
        backgroundColor: "#000000",
        opacity: 0.5,
        flexDirection: "column",
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
        flexWrap: "nowrap",
        alignItems: "center",
        justifyContent: "center",
        padding: 30
    },
    zipContainer: {
        height: 40,
        marginLeft: 5
    },
    zipCode: {
        flex: 1,
        flexBasis: 1,
        width: 100,
        fontSize: baseFontSize,
        borderBottomColor: "#DDDDDD",
        borderBottomWidth: 1,
    },
    mainText: { fontSize: baseFontSize, color: "#FFFFFF" },
    welcome: { fontSize: 20, textAlign: "center", margin: 10 },
    input: {
        fontSize: 20,
        borderWidth: 2,
        padding: 2,
        height: 40,
        width: 100,
        textAlign: "center"
    }
});

export default WeatherProject;