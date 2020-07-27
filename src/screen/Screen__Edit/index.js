import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Header, Input } from "../../component";
import { Button } from 'react-native-elements';
import ACTIONS from "../../core/actions";

const index = ({navigation, route}) => {
  const dataContact = route.params;

  const [firstName, setFirstName] = useState(dataContact.firstName);
  const [lastName, setLastName] = useState(dataContact.lastName);
  const [age, setAge] = useState(dataContact.age);
  const [photo, setPhoto] = useState(dataContact.photo);

  const UpdateData = async () => {
    let payload = {
      firstName: firstName,
      lastName: lastName,
      age: age,
      photo: photo
    }

    let id = dataContact.id;

    let data = {
      id: id,
      payload: payload
    }

    ACTIONS.contact.updateContactData(data)
      .then(res => {
        console.log('Update Berhasil');
        navigation.navigate('Home')
      })
      .catch(err => {
        console.log('error: ', err.message);
      })
  }

  return (
    <>
      {/* header */}
      <Header Title="Update Contact" Back />

      {/* content */}
      <View style={styles.Edit}>
        <View  style={styles.Edit__Form}>
          <Input 
            Title='First Name' 
            value={firstName} 
            placeholder={firstName}
            onChangeText={(event) => setFirstName(event)}
          />
          <Input 
            Title='Last Name' 
            value={lastName} 
            placeholder={lastName}
            onChangeText={(event) => setLastName(event)}
          />
          <Input 
            Title='Age' 
            placeholder={age.toString()}
            value={age}
            onChangeText={(event) => setAge(event)}
            inputComponent="number"
          />
        </View>
      </View>
      <View style={styles.Edit__Button__Container}>
        <Button 
          title='Update Contact'
          buttonStyle={styles.Edit__Button}
          onPress={UpdateData}
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
