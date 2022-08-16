import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';

const ChatScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <Text>Chatscreen is here</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.pop();
        }}>
        <Text>Go back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default ChatScreen;
