import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const index = ({onPress, photo, firstName, lastName, age}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.List}>
        <Image 
          style={styles.List__Image} 
          source={{uri: photo}}/>
        <Text style={styles.List__Name}>
          {firstName} {lastName}
        </Text>
        <Text style={styles.List__Age}>
          {age} Years Old
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default index

const styles = StyleSheet.create({
  List: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  List__Image: {
    marginBottom: 10,
    height: 130,
    width: 130,
    borderRadius: 130/2,
    resizeMode: 'cover'
  },
  List__Age: {
    fontSize: 14,
    fontWeight: '800'
  },
  List__Name: {
    fontSize: 18,
    fontWeight:'600'
  }
})
