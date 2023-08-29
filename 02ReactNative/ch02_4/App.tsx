import React from 'react'
import { SafeAreaView, Button, Alert, Touchable, Text, TextInput } from 'react-native'
import { TouchableHighlight, TouchableOpacity } from 'react-native'

const onPress = () => Alert.alert('pressed!!!!', 'message')
const onPress1 = () => Alert.alert('pressed?', 'message')

export default function App() {
  return (
    <SafeAreaView>
      <Button title="home" onPress={onPress} />
      <TouchableOpacity onPress={onPress}>
        <Text>TouchableOpacity</Text>
      </TouchableOpacity>
      <TouchableHighlight onPress={onPress}>
        <Text>TouchableHighlight</Text>
      </TouchableHighlight>
      <Text onPress={onPress1}>Press Me!!!</Text>
      <TextInput
        placeholder='enter your name'
        onChangeText={(text: string) => console.log(text)}
        onFocus={() => console.log('onFocus')}
        onBlur={() => console.log('onBlur')}
        onEndEditing={() => console.log('onEndEditing')}
      />
    </SafeAreaView>
  )
}