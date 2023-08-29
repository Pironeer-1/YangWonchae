import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { MD3LightTheme } from "react-native-paper"
import * as D from '../data'

const title = 'CopyMe'
export default function CopyMe() {
    return (
        <View style={[styles.view]}>
            <Text style={[styles.text]}>{title}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    view: { padding: 5, backgroundColor: MD3LightTheme.colors.primary },
    text: { fontSize: 20, color: 'white' }
})