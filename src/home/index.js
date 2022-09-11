import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    TextInput,
    KeyboardAvoidingView,
} from 'react-native';
import {styles} from '../assets/styles';
import {useAuth} from '../settings/authContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {colors} from '../assets/colors';
import {color} from 'react-native-reanimated';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableRipple} from 'react-native-paper';
import SettingsScreen from '../user';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';

const Tab = createBottomTabNavigator();

const HomeScreenComponent = ({navigation}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [data, setData] = useState([
        {
            id: 1,
            userName: 'Dorjo',
            avatar: 'https://www.looper.com/img/gallery/20-epic-movies-like-avatar-you-need-to-watch-next/l-intro-1645555067.jpg',
            lastChat: 'It is about your car',
            time: '7:55',
            isRead: false,
        },
        {
            id: 2,
            userName: 'Mongoliana PM',
            avatar: 'https://yt3.ggpht.com/ytc/AMLnZu9gI3hYYS3AwFLmr0RR6UjERlqiedYSoRb_3Q=s900-c-k-c0x00ffffff-no-rj',
            lastChat: 'I need to discuss so...',
            time: '17:25',
            isRead: true,
        },
        {
            id: 3,
            userName: 'Athew',
            lastChat: 'Good day son',
            avatar: 'https://www2.deloitte.com/content/dam/Deloitte/nl/Images/promo_images/deloitte-nl-cm-digital-human-promo.jpg',
            time: '1:55',
            isRead: false,
        },
        {
            id: 4,
            userName: 'Mathew',
            lastChat: "Don't forget to...",
            avatar: 'http://keyword-hero.com/wp-content/uploads/2017/04/Cart-Hero.png',
            time: '17:59',
            isRead: true,
        },
    ]);

    //write user information to database
    const {user} = useAuth();
    const db = firestore().collection('usersData');
    useEffect(() => {
        console.log(user);
        if (user) {
            db.doc(user.uid).set({
                userName: user.displayName,
                email: user.email,
                avatar: user.photoURL,
                lastOnline: firestore.FieldValue.serverTimestamp(),
            });
        }
    }, [user]);
    console.log(isModalVisible);
    const RenderEachChat = ({item}) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Chat', {responderName: item.userName});
                }}
                style={{
                    marginVertical: 2,
                    borderRadius: 20,
                    backgroundColor: item.isRead === true ? 'transparent' : colors.gray100,
                }}>
                <View
                    style={{
                        height: 75,
                        borderRadius: 20,

                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                    <Image
                        style={{height: 60, width: 60, borderRadius: 70, marginLeft: 10}}
                        resizeMode="contain"
                        source={{
                            uri: item.avatar,
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
                                style={{
                                    fontFamily:
                                        item.isRead === true ? 'Roboto-Regular' : 'Roboto-Bold',
                                    fontSize: item.isRead === true ? 16 : 17,
                                }}>
                                {item.userName}
                            </Text>
                            <Text
                                numberOfLines={1}
                                style={{
                                    fontFamily:
                                        item.isRead === true ? 'Roboto-Regular' : 'Roboto-Bold',
                                    fontSize: item.isRead === true ? 13 : 14,
                                }}>
                                You: {item.lastChat}
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
                    <View
                        style={[
                            styles.row,
                            {justifyContent: 'space-between', alignItems: 'center'},
                        ]}>
                        <Text
                            style={{fontFamily: 'Roboto-Bold', fontSize: 20, color: colors.sheen}}>
                            Chat
                        </Text>
                        <View
                            style={{
                                borderRadius: 12,
                                height: 30,
                                backgroundColor: colors.gray200,
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingHorizontal: 10,
                                maxWidth: '70%',
                            }}>
                            <SimpleLineIcons size={15} name="magnifier" />
                            <TextInput
                                placeholder="Search"
                                style={{
                                    backgroundColor: colors.gray200,
                                    borderRadius: 12,
                                    height: 30,
                                    padding: 0,
                                    paddingHorizontal: 5,
                                }}
                            />
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    setIsModalVisible(true);
                                }}>
                                <Icon name="pencil-square-o" color={colors.sheen} size={25} />
                            </TouchableOpacity>
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
            <Modal
                style={{margin: 0, padding: 0}}
                onBackdropPress={() => {
                    setIsModalVisible(false);
                }}
                isVisible={isModalVisible}>
                <View style={{flex: 1}} />
                <View
                    style={{
                        backgroundColor: colors.white,
                        flex: 9,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        overflow: 'hidden',
                    }}>
                    <View style={{paddingVertical: 10, backgroundColor: colors.gray50}}>
                        <Text
                            style={{
                                alignSelf: 'center',
                                fontFamily: 'Roboto-Bold',
                                color: colors.black,
                                fontSize: 16,
                            }}>
                            New message
                        </Text>
                    </View>
                    <View
                        style={{
                            borderRadius: 5,
                            height: 30,
                            backgroundColor: colors.gray200,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                            marginHorizontal: 10,
                        }}>
                        <SimpleLineIcons size={15} name="magnifier" />
                        <TextInput
                            placeholder="To : "
                            onChangeText={text => {
                                console.log(text);
                            }}
                            style={{
                                width: '100%',
                                backgroundColor: colors.gray200,
                                borderRadius: 12,
                                height: 30,
                                padding: 0,
                                paddingHorizontal: 5,
                            }}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const HomeScreen = () => {
    const {user} = useAuth();

    function MyTabBar({state, descriptors, navigation, ...rest}) {
        console.log(state, descriptors, navigation);
        return (
            <View style={{flexDirection: 'row', backgroundColor: colors.gray50}}>
                {state.routes.map((route, index) => {
                    const {options} = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                            ? options.title
                            : route.name;

                    const isFocused = state.index === index;
                    const {icon} = route.params;
                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            // The `merge: true` option makes sure that the params inside the tab screen are preserved
                            navigation.navigate({name: route.name, merge: true});
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <TouchableOpacity
                            key={index}
                            activeOpacity={0.9}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? {selected: true} : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingVertical: 4,
                            }}>
                            {route.name === 'Settings' ? (
                                user ? (
                                    <Image
                                        style={{
                                            width: 25,
                                            height: 25,
                                            borderRadius: 25,
                                            borderWidth: 1.5,
                                            borderColor: isFocused ? colors.sheen : colors.gray100,
                                        }}
                                        source={{
                                            uri:
                                                user.photoURL ||
                                                'https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg',
                                        }}
                                    />
                                ) : (
                                    <Image
                                        style={{
                                            width: 25,
                                            height: 25,
                                            borderRadius: 25,
                                            borderWidth: 1.5,
                                            borderColor: isFocused ? colors.sheen : colors.gray100,
                                        }}
                                        source={{
                                            uri: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
                                        }}
                                    />
                                )
                            ) : (
                                <Ionicons
                                    name={icon}
                                    color={isFocused ? colors.sheen : colors.gray500}
                                    size={25}
                                />
                            )}
                            <Text
                                style={{
                                    color: isFocused ? colors.sheen : colors.gray500,
                                    fontSize: 10,
                                    lineHeight: 14,
                                }}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }
    return (
        <Tab.Navigator
            screenOptions={{tabBarHideOnKeyboard: true}}
            tabBar={props => <MyTabBar {...props} />}>
            <Tab.Screen
                name="Chats"
                initialParams={{icon: 'chatbubble'}}
                component={HomeScreenComponent}
                options={{headerShown: false}}
            />
            <Tab.Screen
                name="Settings"
                initialParams={{icon: 'settings-sharp'}}
                component={SettingsScreen}
                options={{headerShown: false}}
            />
        </Tab.Navigator>
    );
};

export default HomeScreen;
