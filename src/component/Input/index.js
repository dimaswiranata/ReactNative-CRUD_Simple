import React from 'react'
import { Input } from 'react-native-elements';
import { StyleSheet, Text, View } from 'react-native'

const index = ({Title, onChangeText, value, placeholder, errorMessage}) => {
  return (
    <View>
      <Input
        label={Title}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        errorStyle={{ color: 'red' }}
        errorMessage={errorMessage}
      />
    </View>
  )
}

export default index

const styles = StyleSheet.create({})
