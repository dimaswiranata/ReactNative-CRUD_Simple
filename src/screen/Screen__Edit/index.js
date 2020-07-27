import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Header, Input } from "../../component";
import { Button } from 'react-native-elements';

const index = () => {
  return (
    <>
      <Header Title="Update Contact" Back />
      <View style={styles.Edit}>
        <View  style={styles.Edit__Form}>
          <Input Title='First Name'/>
          <Input Title='Last Name'/>
          <Input Title='Age'/>
        </View>
      </View>
      <View style={styles.Edit__Button__Container}>
        <Button 
          title='Update Contact'
          buttonStyle={styles.Edit__Button}
        />
      </View>
    </>
  )
}

export default index

const styles = StyleSheet.create({
  Edit: {
    flex: 1
  },
  Edit__Form: {
    padding: 20
  },
  Edit__Button__Container: {
    padding: 20
  },
  Edit__Button: {
    height: 50,
    borderRadius: 20
  }
})
