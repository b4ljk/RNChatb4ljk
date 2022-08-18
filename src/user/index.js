import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import {useAuth} from '../settings/authContext';

const SettingsScreen = ({navigation}) => {
  const {signOutUser} = useAuth();
  return (
    <SafeAreaView>
      <Text>Settings screen</Text>
      <TouchableOpacity
        onPress={() => {
          signOutUser();
        }}>
        <Text>Log out</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Text>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default SettingsScreen;
