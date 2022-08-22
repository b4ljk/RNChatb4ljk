import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Image, Text, TouchableOpacity} from 'react-native';
import {styles} from '../assets/styles';
import {useAuth} from '../settings/authContext';

const SettingsScreen = ({navigation}) => {
    const {user} = useAuth();
    console.log(user);
    // console.log(user.providerData, 'provider data is here');
    const {signOutUser} = useAuth();
    return user ? (
        <SafeAreaView style={styles.body}>
            <View style={{alignItems: 'center'}}>
                <Text
                    style={{
                        fontSize: 17,
                        fontFamily: 'Roboto-Bold',

                        marginTop: 10,
                    }}>
                    Settings
                </Text>
            </View>
            <View style={{alignItems: 'center', marginTop: 10}}>
                <Image
                    style={{height: 70, width: 70, borderRadius: 70}}
                    resizeMode="contain"
                    source={{
                        uri: user.photoURL,
                    }}
                />
                <Text style={{fontFamily: 'Roboto-Bold', fontSize: 16}}>{user.displayName}</Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    signOutUser();
                }}>
                <Text>Log out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    ) : null;
};
export default SettingsScreen;
