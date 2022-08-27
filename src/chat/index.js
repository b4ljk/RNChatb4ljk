import React, {useEffect, useRef, useState} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../assets/colors';
import {styles} from '../assets/styles';
import * as Animatable from 'react-native-animatable';
import firestore from '@react-native-firebase/firestore';
import {useAuth} from '../settings/authContext';
import {Surface} from 'react-native-paper';

const ChatScreen = ({navigation, route}) => {
    const {user} = useAuth();
    const [lastDocument, setLastDocument] = useState();
    const [loading, setLoading] = useState(true);
    const {responderName} = route.params;
    const messageRef = useRef();
    const [keyBoardSwipeY, setKeyBoardSwipeY] = useState(0);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [chatData, setChatData] = useState([]);
    const [nextPagination, setNextPagination] = useState(0);
    //doc data paramaar orj ireh
    let dbQuery = firestore().collection('chats').doc('123').collection('chats');

    useEffect(() => {
        dbQuery = dbQuery.orderBy('time', 'desc');
        const subscriber = dbQuery.limit(25).onSnapshot(querySnapshot => {
            if (!lastDocument) {
                setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
            }
            const data = [...chatData];
            querySnapshot?.forEach(documentSnapshot => {
                data.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });
            setChatData(data);
        });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);

    const sendMessage = () => {
        const newMessage = {
            message: message,
            time: firestore.FieldValue.serverTimestamp(),
            userId: user.uid || '',
        };
        dbQuery.add(newMessage);
        setMessage('');
        // setChatData([...chatData, newMessage]);
        // setMessage('');
    };

    const loadMore = () => {
        console.log(chatData.length, 'chat data length');
        console.log(lastDocument, 'last document');
        if (lastDocument && chatData.length >= 25) {
            dbQuery = dbQuery.orderBy('time', 'desc');
            console.log('getting next items');
            dbQuery
                .startAfter(lastDocument)
                .limit(25)
                .get()
                .then(querySnapshot => {
                    const data = [...chatData];
                    setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
                    querySnapshot?.forEach(documentSnapshot => {
                        if (
                            data.find(item => {
                                return item.key === documentSnapshot.id;
                            })
                        ) {
                            return;
                        }
                        data.push({
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id,
                        });

                        console.log(documentSnapshot.id);
                    });
                    setChatData(data);
                });
        }
    };
    const chatRenderItem = ({item}) => {
        return item.userId === user?.uid ? (
            <View
                style={{
                    backgroundColor: colors.blue300,
                    margin: 3,
                    marginHorizontal: 5,
                    borderRadius: 12,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    maxWidth: '75%',
                    alignSelf: 'flex-end',
                }}>
                <Text style={{fontSize: 16}}>{item.message}</Text>
            </View>
        ) : (
            <View
                style={{
                    backgroundColor: colors.blue100,
                    margin: 3,
                    borderRadius: 12,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    maxWidth: '75%',
                    alignSelf: 'flex-start',
                }}>
                <Text style={{fontSize: 16}}>{item.message}</Text>
            </View>
        );
    };

    const pullToRefresh = () => {
        console.log('here');
        loadMore();
    };

    return (
        <SafeAreaView style={styles.body}>
            <View style={[styles.row, styles.center, {justifyContent: 'flex-start', padding: 10}]}>
                <TouchableOpacity
                    style={{padding: 10}}
                    onPress={() => {
                        navigation.pop();
                    }}>
                    <Icon name="chevron-left" size={20} />
                </TouchableOpacity>
                <Text style={{fontSize: 18}}>{responderName}</Text>
            </View>
            <View style={[styles.body, {flex: 10}]}>
                <FlatList
                    onEndReached={pullToRefresh}
                    // onRefresh={pullToRefresh}
                    // refreshing={false}
                    // // refreshControl={
                    // //     <RefreshControl refreshing={loading} onRefresh={pullToRefresh} />
                    // // }
                    inverted
                    // style={{flexGrow: 0}}
                    data={chatData}
                    renderItem={chatRenderItem}
                />
            </View>
            <KeyboardAvoidingView
                onTouchStart={e => setKeyBoardSwipeY(e.nativeEvent.pageY)}
                onTouchEnd={e => {
                    if (keyBoardSwipeY - e.nativeEvent.pageY < -20) messageRef.current.blur();
                }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        messageRef.current.focus();
                    }}
                    style={[
                        styles.row,
                        {
                            marginTop: 6,
                            paddingHorizontal: 10,
                            alignItems: 'flex-end',
                            marginBottom: 6,
                            backgroundColor: colors.gray200,
                            borderRadius: 12,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingVertical: 5,
                            marginHorizontal: 5,
                            minHeight: 40,
                        },
                    ]}>
                    <TextInput
                        returnKeyLabel="return"
                        ref={messageRef}
                        placeholder="Aa"
                        multiline
                        value={message}
                        onChange={e => {
                            setMessage(e.nativeEvent.text);
                            console.log(e.nativeEvent.text);
                        }}
                        style={{
                            backgroundColor: colors.gray200,
                            borderRadius: 12,
                            paddingVertical: 0,
                            maxHeight: 120,
                            paddingHorizontal: 5,
                            minWidth: '30%',
                            maxWidth: '70%',
                        }}
                    />
                    {message === '' ? (
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={{paddingHorizontal: 6}}>
                                <Ionicons name="ios-camera" size={25} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{paddingHorizontal: 6}}>
                                <Ionicons name="ios-image" size={25} />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity
                            onPress={sendMessage}
                            style={{
                                paddingHorizontal: 10,
                                // backgroundColor: colors.red,
                                alignSelf: 'flex-end',
                                paddingBottom: 3,
                            }}>
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Bold',
                                    fontSize: 18,
                                    color: colors.sheen,
                                }}>
                                Send
                            </Text>
                        </TouchableOpacity>
                    )}
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
export default ChatScreen;
