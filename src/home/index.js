import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import {useAuth} from '../settings/authContext';

const HomeScreen = ({navigation}) => {
  const {signOutUser} = useAuth();
  return (
    <SafeAreaView>
      <Text>Asdasdasd</Text>
      <TouchableOpacity
        onPress={() => {
          signOutUser();
        }}>
        <Text>Here to screen two</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default HomeScreen;
