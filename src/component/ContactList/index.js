import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

const index = ({onPress, firstName, lastName, age, photo, deleteHandler}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.Contact}>
        <View style={styles.Contact__Left}>
          <Image style={styles.Contact__Image} source={{uri: photo}}/>
          <View style={styles.Contact__TextContainer}>
            <Text>{firstName} {lastName}</Text>
            <Text>{age} Years Old</Text>
          </View>
        </View>
        <View style={styles.Contact__Right}>
          <TouchableOpacity onPress={deleteHandler}>
            <Icon
              name='trash'
              size={30}
              color='#000'
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default index

const styles = StyleSheet.create({
  Contact: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  Contact__Left: {
    flexDirection: 'row',
  },
  Contact__Image: {
    height: 50,
    width: 50
  },
  Contact__TextContainer: {
    justifyContent: 'center',
    paddingLeft: 16
  },
  Contact__Right: {
    justifyContent: 'center',
    paddingRight: 16
  }
})
