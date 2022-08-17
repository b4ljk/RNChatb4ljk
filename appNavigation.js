import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';

import HomeScreen from './src/home';
import ChatScreen from './src/chat';
import SplashScreen from './src/home/splash';
import Auth from './src/settings/Auth';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from './src/settings/authContext';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const navigation = useNavigation();
  const {user} = useAuth();

  useEffect(() => {
    if (user === null) {
      navigation.navigate('Auth');
    } else {
      navigation.navigate('Home');
    }
  }, [user]);
  return (
    <Stack.Navigator initialRouteName={user === null ? 'Auth' : 'Home'}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
