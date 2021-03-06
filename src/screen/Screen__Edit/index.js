import React, { useState } from 'react'
import { 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  Image,
  Keyboard ,
  ScrollView
} from 'react-native'
import { Header, Input } from "../../component";
import { Button } from 'react-native-elements';
import ACTIONS from "../../core/actions";
import { useDispatch } from "react-redux";
import { showError } from "../../utils/showMessage";
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import { NullPhoto } from '../../assets';
import AwesomeAlert from 'react-native-awesome-alerts';

const index = ({navigation, route}) => {
  const dataContact = route.params;

  const [firstName, setFirstName] = useState(dataContact.firstName);
  const [lastName, setLastName] = useState(dataContact.lastName);
  const [age, setAge] = useState(String(dataContact.age));
  const [photoForDB, setPhotoForDB] = useState(dataContact.photo);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(dataContact.photo === 'N/A'? NullPhoto : {uri : dataContact.photo});
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [updateAlert, setUpdateAlert] = useState(false);

  const dispatch = useDispatch();

  const UpdateData = async () => {

    hideUpdateAlert();

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

    hideDeleteAlert();

    let data = {
      id: dataContact.id
    };

    dispatch({type: 'SET_LOADING', value: true});
    ACTIONS.contact.deleteContactData(data)
      .then(res => {
        console.log('Delete Berhasil');
        dispatch({type: 'SET_LOADING', value: false});
        navigation.navigate('Home')
      })
      .catch(err => {
        dispatch({type: 'SET_LOADING', value: false});
        showError('Delete failed by System');
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

  const showDeleteAlert = () => {
    setDeleteAlert(true);
  }

  const hideDeleteAlert = () => {
    setDeleteAlert(false);
  }

  const showUpdateAlert = () => {
    setUpdateAlert(true);
  }

  const hideUpdateAlert = () => {
    setUpdateAlert(false);
  }

  return (
    <>
      {/* header */}
      <Header Title={`${dataContact.firstName} ${dataContact.lastName}`} Back />

      {/* content */}
      <View style={styles.Edit}>
        <ScrollView showsVerticalScrollIndicator={false} >
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
                errorMessage={age.length > 2 ? 'Age length just 2 integer' : null}
              />
            </TouchableOpacity>    
          </View>
        </ScrollView>
      </View>
      <View style={styles.Edit__Button__Container}>
        <Button 
          title='Update Contact'
          buttonStyle={styles.Edit__Button}
          onPress={showUpdateAlert}
        />
        <Button 
          title='Delete Contact'
          buttonStyle={styles.Delete__Button}
          onPress={showDeleteAlert}
        />
      </View>
      <AwesomeAlert
        show={deleteAlert}
        showProgress={false}
        title="Alert!"
        message="Are you sure to delete it?"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Yes, delete it"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          hideDeleteAlert();
        }}
        onConfirmPressed={() => {
          DeleteData();
        }}
      />
      <AwesomeAlert
        show={updateAlert}
        showProgress={false}
        title="Alert!"
        message="Are you sure to change it?"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Yes, change it"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          hideUpdateAlert();
        }}
        onConfirmPressed={() => {
          UpdateData();
        }}
      />
    </>
  )
}

export default index

const styles = StyleSheet.create({
  Edit: {
    flex: 1,
    backgroundColor: 'white'
  },
  Edit__Form: {
    padding: 20
  },
  Edit__Button__Container: {
    padding: 20,
    backgroundColor: 'white'
  },
  Edit__Button: {
    height: 50,
    borderRadius: 20,
    backgroundColor: '#0BCAD4'
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
