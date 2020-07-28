import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Header, Input } from "../../component";
import { Button } from 'react-native-elements';
import ACTIONS from "../../core/actions";
import { useDispatch } from "react-redux";
import { showError } from "../../utils/showMessage";
import { NullPhoto } from "../../assets";
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';

const index = ({navigation}) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [photoForDB, setPhotoForDB] = useState('')
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(NullPhoto);

  const dispatch = useDispatch();

  const CreateData = async () => {
    let payload = {
      firstName: firstName,
      lastName: lastName,
      age: parseInt(age),
      photo: photoForDB
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

  const getImage = () => {
    ImagePicker.launchImageLibrary({quality: 0.5, maxWidth: 200, maxHeight: 200}, (response) => {
      console.log('response: ', response);
      if ( response.didCancel || response.error ){
        showError('oops, sepertinya anda tidak memilih foto nya?');
      } else {
        console.log('response getImage : ', response);
        setPhotoForDB(`data:${response.type};base64, ${response.data}`);
        const source = {uri: response.uri};
        setPhoto(source);
        setHasPhoto(true);
      }
    });
  }
  
  return (
    <>
      {/* header */}
      <Header Title="Create Contact" Back />

      {/* content */}
      <View style={styles.Add}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={getImage}> 
            <Image source={photo} style={styles.avatar}/>
            {
              !hasPhoto ? (
                <View style={styles.addPhoto}>
                  <Icon
                    name='add-circle'
                    size={30}
                    color='#000'
                  />
                </View>
              ) : (
                <View style={styles.addPhoto}>
                  <Icon
                    name='md-remove-circle'
                    size={30}
                    color='#000'
                  />
                </View>
              )
            }
          </TouchableOpacity>
        </View>
        <View style={styles.Add__Form}>
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
            placeholder={age}
            value={age}
            onChangeText={(event) => setAge(event)}
            inputComponent="number"
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

export default index;

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
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 110/2
  },
  avatarWrapper: {
    width: 130,
    height: 130,
    borderWidth: 1,
    // borderColor: colors.border,
    borderRadius: 130/2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addPhoto: {
    position: 'absolute',
    bottom: 8,
    right: 6
  },
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30
  },
})
