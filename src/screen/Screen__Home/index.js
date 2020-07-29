import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { Header, ContactList, List } from "../../component";
import ACTIONS from "../../core/actions";
import { useDispatch } from "react-redux";
import { showError } from "../../utils/showMessage";
import ActionButton from 'react-native-action-button';

const index = ({navigation}) => {
  const [contactData, setContactData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Prevent default behavior
      // e.preventDefault();
  
      // Do something manually
      // ...
      fetchContactData();
    });
  
    return unsubscribe;
  }, [navigation]);

  const fetchContactData = async () => {
    dispatch({type: 'SET_LOADING', value: true});
    ACTIONS.contact.getContactData()
      .then(res => {
        let data = res.data.data;
        dispatch({type: 'SET_LOADING', value: false});
        setContactData(data);
      })
      .catch(err => {
        dispatch({type: 'SET_LOADING', value: false});
        showError(err.message);
        console.log('err: ', err.message);
      })
  }

  console.log(contactData);

  const deleteContactHandler = async (id) => {
    dispatch({type: 'SET_LOADING', value: true});
    ACTIONS.contact.deleteContactData(id)
      .then((res) => {
        dispatch({type: 'SET_LOADING', value: false});
        console.log('Data contact berhasil dihapus');
      })
      .catch((err) => {
        dispatch({type: 'SET_LOADING', value: false});
        showError(err.message);
        console.log('err: ', err.message);
      })
  } 

  const renderContactList = ({item}) => {
    return (
      <ContactList 
        onPress={() => navigation.navigate('Edit', item)} 
        firstName={item.firstName} 
        lastName={item.lastName} 
        age={item.age}
        photo={item.photo === 'N/A' ? 'https://www.pngitem.com/pimgs/m/79-791921_male-profile-round-circle-users-profile-round-icon.png' : item.photo} 
      />
    )
  }

  const renderContactColumnList = ({item}) => {
    return (
      <List 
        onPress={() => navigation.navigate('Edit', item)} 
        firstName={item.firstName} 
        lastName={item.lastName} 
        age={item.age}
        photo={item.photo === 'N/A' ? 'https://www.pngitem.com/pimgs/m/79-791921_male-profile-round-circle-users-profile-round-icon.png' : item.photo} 
      />
    )
  }

  return (
    <>
      {/* header */}
      <Header Title="All Contact"/>

      {/* content */}
      <View style={styles.Home}>
        <FlatList
          data={contactData}
          numColumns={2}
          columnWrapperStyle={styles.Home__Row}
          renderItem={(item) => renderContactColumnList(item)}
          keyExtractor={(item) => item.id}
        />
      </View>
      <ActionButton
        buttonColor="#0BCAD4"
        onPress={() => {navigation.navigate('Add')}}
      />
    </>
  )
}

export default index

const styles = StyleSheet.create({
  Home:{
    backgroundColor: 'white',
    flex: 1
  },
  Home__Title: {
    margin: 15
  },
  Home__Row: {
    flex: 1,
    justifyContent: "space-around"
  }
})
