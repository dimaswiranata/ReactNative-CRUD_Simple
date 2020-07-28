import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Header, Input } from "../../component";
import { Button } from 'react-native-elements';
import ACTIONS from "../../core/actions";
import { useDispatch } from "react-redux";
import { showError } from "../../utils/showMessage";

const index = ({navigation}) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(0);
  const [photo, setPhoto] = useState('http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550');

  const dispatch = useDispatch();

  const CreateData = async () => {
    let payload = {
      firstName: firstName,
      lastName: lastName,
      age: age,
      photo: photo
    }
    dispatch({type: 'SET_LOADING', value: true});
    ACTIONS.contact.saveContactData(payload)
      .then(res => {
        console.log('Create Contact Berhasil');
        dispatch({type: 'SET_LOADING', value: false});
        navigation.navigate('Home')
      })
      .catch(err => {
        dispatch({type: 'SET_LOADING', value: false});
        showError(err.message);
        console.log('error: ', err.message);
      })
  }

  return (
    <>
      {/* header */}
      <Header Title="Create Contact" Back />

      {/* content */}
      <View style={styles.Add}>
        <View  style={styles.Add__Form}>
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
          <Input 
            Title='Photo' 
            placeholder={photo}
            value={photo}
            onChangeText={(event) => setPhoto(event)}
          />
        </View>
      </View>
      <View style={styles.Add__Button__Container}>
        <Button 
          title='Create Contact'
          buttonStyle={styles.Add__Button}
          onPress={CreateData}
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
