import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {styles} from '../assets/styles';
import {useAuth} from '../settings/authContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../assets/colors';
import {color} from 'react-native-reanimated';

const HomeScreen = ({navigation}) => {
  const {signOutUser} = useAuth();
  const [data, setData] = useState([
    {
      id: 1,
      userName: 'Dorjo',
      avatar: require('../assets/img/town.png'),
      lastChat: 'Balduran come back',
      time: '7:55',
    },
    {
      id: 2,
      userName: 'Ugandan prime minister bataa',
      avatar: require('../assets/img/town.png'),
      lastChat: 'Balduran come back',
      time: '17:55',
    },
    {
      id: 3,
      userName: 'Jesus',
      lastChat: 'Balduran come back',
      avatar: require('../assets/img/town.png'),
      time: '1:55',
    },
    {
      id: 4,
      userName: 'Mathew',
      lastChat: 'Balduran come back',
      avatar: require('../assets/img/town.png'),
      time: '17:595',
    },
  ]);
  const RenderEachChat = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Chat');
        }}
        style={{
          marginVertical: 2,
          borderRadius: 20,
          backgroundColor: colors.gray100,
        }}>
        <View
          style={{
            height: 90,
            borderRadius: 20,

            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Image
            style={{height: 70, width: 70, borderRadius: 70, marginLeft: 10}}
            resizeMode="contain"
            source={{
              uri: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
            }}
          />
          <View style={{flex: 4}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-evenly',
                marginVertical: 17,
                marginLeft: 10,
              }}>
              <Text
                numberOfLines={1}
                style={{fontFamily: 'Roboto-Bold', fontSize: 18}}>
                {item.userName}
              </Text>
              <Text
                numberOfLines={1}
                style={{fontFamily: 'Roboto-Bold', fontSize: 15}}>
                You: Balduran come home
              </Text>
            </View>
          </View>
          <View style={{flex: 1, marginRight: 10}}>
            <Text style={{alignSelf: 'flex-end'}}>{item.time}</Text>
          </View>
        </View>
      </TouchableOpacity>
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
          <View style={styles.body}>
            <FlatList
              style={[styles.body, {paddingVertical: 10}]}
              data={data}
              renderItem={RenderEachChat}
            />
          </View>
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
