import React from "react";
import { Platform, Dimensions, StyleSheet, SafeAreaView, Text, View } from "react-native";
import { MD3LightTheme } from 'react-native-paper'
import color from 'color'

const {width, height} = Dimensions.get('window')

export default function App() {
  return (
    <SafeAreaView style={[styles.safeAreaView]}>
      <Text style={[styles.text]}>os: {Platform.OS}</Text>
      <Text style={[styles.text]}>width: {width} px</Text>
      <Text style={[styles.text]}>height: {height} px</Text>

      <View style={[styles.box, styles.border]} />
      <View style={[styles.box, styles.border, {borderRadius: 20}]} />
      <View style={[styles.box, styles.border,
        {borderTopLeftRadius: 40, borderBottomLeftRadius: 40}]} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  // safeAreaView: {backgroundColor: MD3LightTheme.colors.primary, height: height},
  // safeAreaView: {backgroundColor: MD3LightTheme.colors.primary, height: '50%'},
  // safeAreaView: {backgroundColor: MD3LightTheme.colors.primary, flex: 1},
  // safeAreaView: {backgroundColor: MD3LightTheme.colors.primary, flex: 1, margin:'10%'},
  // safeAreaView: {backgroundColor: MD3LightTheme.colors.primary, flex: 1, padding: 10},
  safeAreaView: {backgroundColor: MD3LightTheme.colors.primary, flex: 1, paddingLeft: Platform.select({ios: 0, android: 20})},
  text: {marginBottom: 10, fontSize: 20, marginLeft: 50, marginTop: 20, color: color(MD3LightTheme.colors.primary).lighten(0.9).string()},
  // box: {height: 100, backgroundColor: MD3LightTheme.colors.secondary, marginBottom: 10},
  box: {width: '70%', height: 100, backgroundColor: MD3LightTheme.colors.secondary, marginBottom: 10, marginLeft: Platform.select({ios: 20, android: 0})},
  border: {borderWidth: 10, borderColor: color('black').alpha(0.3).string()}
})