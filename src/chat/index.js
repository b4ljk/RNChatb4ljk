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
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../assets/colors';
import {styles} from '../assets/styles';
import * as Animatable from 'react-native-animatable';
import firestore from '@react-native-firebase/firestore';
import {useAuth} from '../settings/authContext';
import {Surface} from 'react-native-paper';
import uuid from 'react-native-uuid';

const ChatScreen = ({navigation, route}) => {
    const {user} = useAuth();
    const [lastDocument, setLastDocument] = useState();
    const [loading, setLoading] = useState(true);
    const {responderName, responderProfile, responderId, idOfChat} = route.params;
    const messageRef = useRef();
    const [keyBoardSwipeY, setKeyBoardSwipeY] = useState(0);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [chatData, setChatData] = useState([]);
    const [nextPagination, setNextPagination] = useState(0);
    const [firstInteraction, setFirstInteraction] = useState(undefined);
    const [tempChatId, setTempChatId] = useState('id');
    //doc data paramaar orj ireh
    let dbQuery = firestore()
        .collection('chats')
        .doc('chatDoc')
        .collection(idOfChat || tempChatId);
    console.log(responderProfile, 'wrtf', responderName);
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
                console.log(documentSnapshot.data(), 'data');
            });
            setChatData(data);
            if (data != []) {
                setFirstInteraction(true);
            }
        });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);

    const sendMessage = () => {
        if (firstInteraction) {
            setFirstInteraction(false);
            const newChatId = uuid.v4();
            setTempChatId(newChatId);
            let newChatQuery = firestore()
                .collection('user')
                .doc(user?.uid)
                .collection(`responderId`)
                .doc('chat')
                .set({
                    lastChat: message,
                    time: firestore.FieldValue.serverTimestamp(),
                    chatId: newChatId,
                });
            let newChatQueryForResponder = firestore()
                .collection('user')
                .doc(`responderId`)
                .collection(user?.uid)
                .doc('chat')
                .set({
                    lastChat: message,
                    time: firestore.FieldValue.serverTimestamp(),
                    chatId: newChatId,
                });

            const newMessage = {
                message: message,
                time: firestore.FieldValue.serverTimestamp(),
                userId: user.uid || '',
            };
            firestore().collection('chats').doc('chatDoc').collection(newChatId).add(newMessage);
            setMessage('');
        }
        const newMessage = {
            message: message,
            time: firestore.FieldValue.serverTimestamp(),
            userId: user.uid || '',
        };
        dbQuery.add(newMessage);
        //fix becuase still creating new chats wtf right ?

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
                <Image
                    source={{uri: responderProfile}}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 79,
                        marginLeft: 5,
                        marginRight: 10,
                    }}
                />
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
