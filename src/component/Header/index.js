import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const index = ({Back, Title, Add, onPress}) => {
  
  const navigation = useNavigation();

  const NavBack = () => navigation.goBack();

  return (
    <View style={styles.Header}>
      <View style={styles.Header__Left}>
        { Back && 
          <View style={styles.Header__ArrowBack}>
            <TouchableOpacity onPress={NavBack}>
              <Icon
                name='arrow-back'
                size={30}
                color='#fff'
              />
            </TouchableOpacity>
          </View>
        }
        <View style={styles.Header__Title__Container}>
          <Text  style={styles.Header__Title}>
            {Title}
          </Text>
        </View>
      </View>
      <View View style={styles.Header__Right}>
        { Add &&
          <TouchableOpacity onPress={onPress}>
            <Icon
              name='add-sharp'
              size={30}
              color='#fff'
            />
          </TouchableOpacity>
        }
      </View>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  Header: {
    height: 60,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  Header__Left : {
    flexDirection: 'row',
    marginLeft: 15
  },
  Header__ArrowBack: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 100,
    padding: 5
  },
  Header__Title__Container : {
    paddingLeft: 16,
    justifyContent: 'center'
  },
  Header__Title: {
    fontSize: 20,
    fontWeight: "800",
    color: '#000'
  },
  Header__Right: {
    marginRight: 15
  }
})
