import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../assets/colors';
import {styles} from '../assets/styles';

const ChatScreen = ({navigation, route}) => {
    const {responderName} = route.params;
    return (
        <SafeAreaView style={styles.body}>
            <View style={[styles.row, styles.center, {justifyContent: 'flex-start', padding: 10}]}>
                <TouchableOpacity
                    style={{backgroundColor: colors.red, padding: 10}}
                    onPress={() => {
                        navigation.pop();
                    }}>
                    <Icon name="chevron-left" size={15} />
                </TouchableOpacity>
                <Text>{responderName}</Text>
            </View>
            <View style={styles.body}></View>
            <View style={[styles.row, {alignItems: 'flex-end', marginBottom: 6}]}>
                <TouchableOpacity style={{paddingHorizontal: 6}}>
                    <Ionicons name="ios-camera" size={25} />
                </TouchableOpacity>
                <TouchableOpacity style={{paddingHorizontal: 6}}>
                    <Ionicons name="ios-image" size={25} />
                </TouchableOpacity>
                <TextInput
                    placeholder="Aa"
                    returnKeyType="send"
                    multiline
                    style={{
                        backgroundColor: colors.gray200,
                        borderRadius: 12,
                        padding: 0,
                        maxHeight: 80,
                        paddingHorizontal: 5,
                        minWidth: '30%',
                        maxWidth: '70%',
                    }}
                />
                <TouchableOpacity style={{paddingHorizontal: 6}}>
                    <Ionicons name="ios-paper-plane" size={25} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
export default ChatScreen;
