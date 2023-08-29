import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { MD3LightTheme } from 'react-native-paper'
import Color from 'color'

console.log(MD3LightTheme.colors.primary)
console.log(Color(MD3LightTheme.colors.primary).alpha(0.5).lighten(0.5).string())

export default function App() {
  return (
    <SafeAreaView style={[styles.safeAreaView]}>
      <Text style={[styles.text]}>
        Hello StyleSheet world!
      </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor: MD3LightTheme.colors.primary},
  text: {fontSize: 20, color: Color(MD3LightTheme.colors.primary).alpha(0.7).lighten(0.9).string()}
})