import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Header, ContactList } from "../../component";

const index = ({navigation}) => {
  return (
    <>
      {/* header */}
      <Header Title="Home" Add onPress={() => navigation.navigate('Add')}/>

      {/* context */}
      <View>
        <Text style={styles.Home__Title}>All Contacts</Text>
        <ContactList 
          onPress={() => navigation.navigate('Edit')} 
          firstName="Dimas" 
          lastName="Wiranata" 
          age="22" 
          photo="https://www.pngitem.com/pimgs/m/79-791921_male-profile-round-circle-users-profile-round-icon.png" 
        />
        <ContactList 
          onPress={() => navigation.navigate('Edit')} 
          firstName="Dimas" 
          lastName="Wiranata" 
          age="22" 
          photo="https://www.pngitem.com/pimgs/m/79-791921_male-profile-round-circle-users-profile-round-icon.png" 
        />
      </View>

    </>
  )
}

export default index

const styles = StyleSheet.create({
  Home__Title: {
    margin: 15
  }
})
