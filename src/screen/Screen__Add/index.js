import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Header, Input } from "../../component";
import { Button } from 'react-native-elements';

const index = () => {
  return (
    <>
      <Header Title="Create Contact" Back />
      <View style={styles.Add}>
        <View  style={styles.Add__Form}>
          <Input Title='First Name'/>
          <Input Title='Last Name'/>
          <Input Title='Age'/>
        </View>
      </View>
      <View style={styles.Add__Button__Container}>
        <Button 
          title='Add Contact'
          buttonStyle={styles.Add__Button}
        />
      </View>
    </>
  )
}

export default index

const styles = StyleSheet.create({
  Add: {
    flex: 1
  },
  Add__Form: {
    padding: 20
  },
  Add__Button__Container: {
    padding: 20
  },
  Add__Button: {
    height: 50,
    borderRadius: 20
  }
})
