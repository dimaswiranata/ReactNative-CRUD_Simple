import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import { Contact, ContactNew } from '../../assets';

const index = ({navigation}) => {

  useEffect(() => {

    setTimeout(() => {
      navigation.replace('Home');
    }, 3000);

  }, []);

  return (
    <View style={styles.Splash}>
      <Image source={ContactNew} style={styles.Splash__Logo}/>
      <Text style={styles.Splash__Title}>
        Your Contact
      </Text>
    </View>
  )
}

export default index;

const styles = StyleSheet.create({
  Splash: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#0BCAD4'
  },
  Splash__Logo: {
    width: 200,
    height: 200
  },
  Splash__Title: {
    fontSize: 32,
    fontFamily: 'bold',
    color: '#fff',
    marginTop: 20
  }
});