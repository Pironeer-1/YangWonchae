import React from "react"
import { StyleSheet, View, Text, Image } from "react-native"
import { MD3LightTheme } from "react-native-paper"
import Icon from 'react-native-vector-icons/MaterialIcons'
import * as D from '../data'

const name = D.randomName()
const avatarUrl = D.randomAvatarUrl(name)

const title = 'TopBar'
export default function TopBar() {
    return (
        <View style={[styles.view]}>
            <Image style={styles.avatar} source={{uri: avatarUrl}} />
            <View style={styles.centerView}>
                <Text style={[styles.text]}>{name}</Text>
            </View>
            <Icon name='menu' size={24} color='white' />
        </View>
    )
}
const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        backgroundColor: MD3LightTheme.colors.primary
    },
    text: { fontSize: 20, textAlign: 'center', color: 'white' },
    avatar: { width: 40, height: 40, borderRadius: 20 },
    centerView: { flex: 1 }
})