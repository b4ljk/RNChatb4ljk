import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../assets/colors';
import {styles} from '../assets/styles';
import * as Animatable from 'react-native-animatable';

const ChatScreen = ({navigation, route}) => {
    const {responderName} = route.params;
    const [chatData, setChatData] = useState([
        {
            id: 1,
            message: 'Hello',
            isUser: true,
        },
        {
            id: 2,
            message: 'Hello',
            isUser: false,
        },
        {
            id: 3,
            message: 'zailaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            isUser: true,
        },
        {
            id: 4,
            message: 'ok',
            isUser: false,
        },
    ]);

    const chatRenderItem = ({item}) => {
        return item.isUser ? (
            <View
                style={{
                    backgroundColor: colors.blue300,
                    margin: 2.5,
                    borderRadius: 12,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    maxWidth: '75%',
                    alignSelf: 'flex-end',
                }}>
                <Text>{item.message}</Text>
            </View>
        ) : (
            <View
                style={{
                    backgroundColor: colors.blue100,
                    margin: 2.5,
                    borderRadius: 12,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    maxWidth: '75%',
                    alignSelf: 'flex-start',
                }}>
                <Text>{item.message}</Text>
            </View>
        );
    };

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
            <View style={styles.body}>
                <FlatList
                    data={chatData}
                    keyExtractor={item => item.id.toString()}
                    renderItem={chatRenderItem}
                />
            </View>
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
