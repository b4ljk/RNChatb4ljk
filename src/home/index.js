import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <Text>Asdasdasd</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Chat');
        }}>
        <Text>Here to screen two</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default HomeScreen;
