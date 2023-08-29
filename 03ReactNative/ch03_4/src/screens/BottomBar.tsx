import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { MD3LightTheme } from "react-native-paper"
import Icon from 'react-native-vector-icons/MaterialIcons'

const iconSize = 30, iconColor = 'white'
const icons = ['home', 'content-paste-search', 'face-2', 'manage-accounts']

const title = 'BottomBar'
export default function BottomBar() {
    const children = icons.map((name) => (
        <Icon key={name} name={name} size={iconSize} color={iconColor} />
    ))
    return (
        <View style={[styles.view]}>{children}</View>
    )
}
const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 10,
        backgroundColor: MD3LightTheme.colors.primary
    },
    text: { fontSize: 20, color: 'white' }
})