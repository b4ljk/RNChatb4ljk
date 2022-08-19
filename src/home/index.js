import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from '../assets/styles';
import {useAuth} from '../settings/authContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../assets/colors';
import {color} from 'react-native-reanimated';

const HomeScreen = ({navigation}) => {
  const {signOutUser} = useAuth();

  const RenderEachChat = second => {
    return (
      <View
        style={{
          height: 90,
          borderRadius: 20,
          backgroundColor: colors.gray100,
          alignItems: 'center',
          flexDirection: 'row',
          marginVertical: 2,
        }}>
        <Image
          style={{height: 70, width: 70, borderRadius: 70, marginLeft: 10}}
          resizeMode="contain"
          source={{
            uri: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
          }}
        />
        <View>
          <View
            style={{
              justifyContent: 'space-evenly',

              flex: 1,
              marginVertical: 20,
              marginLeft: 10,
            }}>
            <Text style={{fontFamily: 'Roboto-Bold', fontSize: 18}}>
              Baldan
            </Text>
            <Text style={{fontFamily: 'Roboto-Bold', fontSize: 15}}>
              You: Balduran come home
            </Text>
          </View>
        </View>
        <View style={{flex: 1, marginRight: 10}}>
          <Text style={{alignSelf: 'flex-end'}}>04:25</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.body}>
      <SafeAreaView style={[styles.body]}>
        <View style={[styles.body, {padding: 10, paddingHorizontal: 15}]}>
          <View style={[styles.row, {justifyContent: 'space-between'}]}>
            <Text style={{fontFamily: 'Roboto-Bold', fontSize: 20}}>Chat</Text>
            <View>
              <Icon name="pencil-square-o" size={25} />
            </View>
          </View>
          <View style={styles.body}></View>
          <RenderEachChat />
          <RenderEachChat />
          <RenderEachChat />
          <RenderEachChat />
        </View>
      </SafeAreaView>
      <View
        style={{
          backgroundColor: colors.pink400,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{flex: 1, height: 50}}
          onPress={() => {
            navigation.navigate('SettingsScreen');
          }}>
          <Text>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flex: 1, height: 50, backgroundColor: colors.pink600}}
          onPress={() => {
            navigation.navigate('SettingsScreen');
          }}>
          <Text>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default HomeScreen;
