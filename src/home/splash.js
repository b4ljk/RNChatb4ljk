import {SafeAreaView, View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../assets/styles';
import {useAuth} from '../settings/authContext';

const SplashScreens = ({navigation}) => {
  const {user} = useAuth();

  useEffect(() => {
    if (user === null) {
      navigation.navigate('Auth');
    } else {
      navigation.navigate('Home');
    }
  }, [user]);
  return (
    <SafeAreaView style={styles.body}>
      <Text>text here</Text>
    </SafeAreaView>
  );
};
export default SplashScreens;
