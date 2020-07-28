import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import { Contact } from '../../assets';

const index = ({navigation}) => {

  useEffect(() => {

    setTimeout(() => {
      navigation.replace('Home');
    }, 3000);

  }, []);

  return (
    <View style={styles.page}>
      <Image source={Contact}/>
      <Text style={styles.title}>
        Your Contact
      </Text>
    </View>
  )
}

export default index;

const styles = StyleSheet.create({
  page: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    fontFamily: 'bold',
    color: '#0BCAD4',
    marginTop: 20
  }
});