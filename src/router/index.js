import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Add, Home, Edit, Splash } from "../screen";

const Stack = createStackNavigator();

const StackRouter = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="Splash"
        component={Splash}
      />
      <Stack.Screen
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="Add"
        component={Add}
      />
      <Stack.Screen
        name="Edit"
        component={Edit}
      />
    </Stack.Navigator>
  );
}

class Router extends Component {
  render(){
    return (
      <NavigationContainer>
        <StackRouter/>
      </NavigationContainer>
    );
  }
};

export default Router;