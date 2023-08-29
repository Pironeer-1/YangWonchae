import React from 'react'
import { StyleSheet, SafeAreaView, View, Platform } from 'react-native'
import { MD3LightTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import TopBar from './src/screens/TopBar'
import Content from './src/screens/Content'
import BottomBar from './src/screens/BottomBar'

export default function App() {
  return (
    <>
      <SafeAreaView style={styles.flex}>
        <TopBar />
        <Content />
        <BottomBar />
      </SafeAreaView>
      <View style={[styles.absoluteView]}>
        <Icon name="feather" size={50} color="white" />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: MD3LightTheme.colors.backdrop },
  absoluteView: {
    backgroundColor: MD3LightTheme.colors.inverseSurface,
    position: 'absolute',
    right: 30,
    bottom: Platform.select({ios: 100, android: 80}),
    padding: 10,
    borderRadius: 35
  }
})