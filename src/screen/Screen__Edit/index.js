import React, { useState } from 'react'
import { 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard  
} from 'react-native'
import { Header, Input } from "../../component";
import { Button } from 'react-native-elements';
import ACTIONS from "../../core/actions";
import { useDispatch } from "react-redux";
import { showError } from "../../utils/showMessage";
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';

const index = ({navigation, route}) => {
  const dataContact = route.params;

  const [firstName, setFirstName] = useState(dataContact.firstName);
  const [lastName, setLastName] = useState(dataContact.lastName);
  const [age, setAge] = useState(String(dataContact.age));
  const [photoForDB, setPhotoForDB] = useState(dataContact.photo);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState({uri : dataContact.photo});

  const dispatch = useDispatch();

  const UpdateData = async () => {
    let payload = {
      firstName: firstName,
      lastName: lastName,
      age: parseInt(age),
      photo: photoForDB
    }

    let id = dataContact.id;

    let data = {
      id: id,
      payload: payload
    }
    dispatch({type: 'SET_LOADING', value: true});
    ACTIONS.contact.updateContactData(data)
      .then(res => {
        console.log('Update Berhasil');
        dispatch({type: 'SET_LOADING', value: false});
        navigation.navigate('Home')
      })
      .catch(err => {
        dispatch({type: 'SET_LOADING', value: false});
        showError(err.message);
        console.log('error: ', err.message);
      })
  }

  const DeleteData = async () => {

    let id = dataContact.id;

    dispatch({type: 'SET_LOADING', value: true});
    ACTIONS.contact.deleteContactData(id)
      .then(res => {
        console.log('Delete Berhasil');
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
      <Header Title="Update Contact" Back />

      {/* content */}
      <KeyboardAvoidingView style={styles.Edit}>
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
        <View style={styles.Edit__Form}>
          <TouchableOpacity onPress={Keyboard.dismiss}>
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
            />
          </TouchableOpacity>
        </View>
        <View style={styles.Edit__Button__Container}>
          <Button 
            title='Update Contact'
            buttonStyle={styles.Edit__Button}
            onPress={UpdateData}
          />
          <Button 
            title='Delete Contact'
            buttonStyle={styles.Delete__Button}
            onPress={DeleteData}
          />
        </View>
      </KeyboardAvoidingView>
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
  Delete__Button: {
    height: 50,
    borderRadius: 20,
    backgroundColor: 'red',
    marginTop: 5
  }
})
