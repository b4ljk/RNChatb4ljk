import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {styles} from '../assets/styles';
import {colors} from '../assets/colors';
import {ColorSpace} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import {useAuth} from './authContext';

const DividerWithText = ({moreStyle, children}) => {
  return (
    <View style={[styles.row, styles.center, moreStyle]}>
      <View
        style={{borderWidth: 1 / 4, borderColor: colors.gray400, flex: 1}}
      />
      <Text
        style={{
          marginHorizontal: 15,
          color: colors.gray600,
          fontFamily: 'Roboto-Bold',
          textTransform: 'uppercase',
        }}>
        {children}
      </Text>
      <View
        style={{borderWidth: 1 / 4, borderColor: colors.gray400, flex: 1}}
      />
    </View>
  );
};

const Auth = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {signInWithEmailAndPassword, signOutUser, signInWithGoogle, user} =
    useAuth();

  console.log(user, 'contextCheck');
  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.body}>
        <View style={[styles.row, {}]}>
          <Image
            style={{
              flex: 1,
              resizeMode: 'contain',
              alignSelf: 'center',

              position: 'relative',
              height: 250,
            }}
            source={require('../assets/img/person.png')}
          />
        </View>
        <View style={[styles.container, {paddingHorizontal: 30}]}>
          <Text
            style={{fontFamily: 'Roboto-Bold', fontSize: 30, marginBottom: 10}}>
            Login
          </Text>
          <View style={[styles.row, styles.center]}>
            <Icon name="at" size={22} color={colors.gray500} />
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              textContentType={'emailAddress'}
              keyboardType="email-address"
              onChange={e => setEmail(e.nativeEvent.text)}
            />
          </View>
          <View style={[styles.row, styles.center, {marginTop: 20}]}>
            <Octicons name="shield-lock" size={23} color={colors.gray500} />
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              textContentType={'password'}
              secureTextEntry={true}
              onChange={e => {
                setPassword(e.nativeEvent.text);
                console.log(password, 'password');
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              signInWithEmailAndPassword(email, password)
                .then(res => {
                  console.log(res);
                  console.log('signed in');
                  // navigation.navigate('Home');
                })
                .catch(err => {
                  console.log(err);
                });
            }}
            activeOpacity={0.6}
            style={{
              backgroundColor: colors.primary,
              marginTop: 20,
              borderRadius: 12,
              paddingVertical: 10,
            }}>
            <View style={styles.center}>
              <Text style={[styles.whiteTextB]}>Login</Text>
            </View>
          </TouchableOpacity>
          <DividerWithText moreStyle={{marginVertical: 20}}>OR</DividerWithText>
          <TouchableOpacity
            onPress={() => {
              signInWithGoogle()
                .then(res => {
                  console.log(res);
                  console.log('signed in');
                  // navigation.navigate('Home');
                })
                .catch(err => {
                  console.log(err, 'err');
                });
            }}
            style={{
              backgroundColor: colors.gray100,
              borderRadius: 12,
              paddingVertical: 10,
              flexDirection: 'row',
              paddingHorizontal: 10,
              justifyContent: 'space-between',
            }}>
            <Image
              source={require('../assets/img/google.png')}
              style={{width: 25, height: 25}}
            />
            <Text
              style={{
                alignSelf: 'center',
                fontFamily: 'Roboto-Bold',
                color: colors.gray500,
              }}>
              Sign in with Google
            </Text>
            <View style={{width: 25}} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              signOutUser();
            }}
            style={{
              backgroundColor: colors.gray100,
              borderRadius: 12,
              paddingVertical: 10,
              flexDirection: 'row',
              paddingHorizontal: 10,
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Image
              source={require('../assets/img/fb.png')}
              style={{width: 25, height: 25}}
            />
            <Text
              style={{
                alignSelf: 'center',
                fontFamily: 'Roboto-Bold',
                color: colors.gray500,
              }}>
              Sign in with Facebook
            </Text>
            <View style={{width: 25}} />
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'flex-end', marginTop: 10}}>
            <Text style={{color: colors.gray600, fontSize: 12}}>
              New here ?{' '}
              <Text style={{color: colors.blue800, fontFamily: 'Roboto-Bold'}}>
                Register
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Auth;
