import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../assets/colors';
import {styles} from '../assets/styles';
import * as Animatable from 'react-native-animatable';
import firestore from '@react-native-firebase/firestore';
import {useAuth} from '../settings/authContext';

const ChatScreen = ({navigation, route}) => {
    const {user} = useAuth();
    const [lastDocument, setLastDocument] = useState();
    const [loading, setLoading] = useState(true);
    const {responderName} = route.params;
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [chatData, setChatData] = useState([]);
    const [nextPagination, setNextPagination] = useState(0);
    //doc data paramaar orj ireh
    let dbQuery = firestore().collection('chats').doc('123').collection('chats');

    useEffect(() => {
        dbQuery = dbQuery.orderBy('time', 'desc');
        const subscriber = dbQuery.limit(25).onSnapshot(querySnapshot => {
            setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);

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
        if (lastDocument && chatData.length <= 25) {
            dbQuery
                .startAfter(lastDocument)
                .limit(25)
                .get()
                .then(querySnapshot => {
                    const data = [...chatData];
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
            <View style={[styles.body]}>
                <FlatList
                    onEndReached={pullToRefresh}
                    // onRefresh={pullToRefresh}
                    // refreshing={false}
                    // // refreshControl={
                    // //     <RefreshControl refreshing={loading} onRefresh={pullToRefresh} />
                    // // }
                    inverted
                    data={chatData}
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
                    value={message}
                    onChange={e => {
                        setMessage(e.nativeEvent.text);
                        console.log(e.nativeEvent.text);
                    }}
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
                <TouchableOpacity onPress={sendMessage} style={{paddingHorizontal: 6}}>
                    <Ionicons name="ios-paper-plane" size={25} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
export default ChatScreen;
