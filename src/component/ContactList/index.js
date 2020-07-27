import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

const index = ({onPress, firstName, lastName, age, photo}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.Contact}>
        <Image style={styles.Contact__Image} source={{uri: photo}}/>
        <View style={styles.Contact__TextContainer}>
          <Text>{firstName} {lastName}</Text>
          <Text>{age} Years Old</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default index

const styles = StyleSheet.create({
  Contact: {
    margin: 10,
    flexDirection: 'row'
  },
  Contact__Image: {
    height: 50,
    width: 50
  },
  Contact__TextContainer: {
    justifyContent: 'center',
    paddingLeft: 16
  }
})
