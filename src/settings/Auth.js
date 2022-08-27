import {SafeAreaView, View, TouchableOpacity, Image, TextInput} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useEffect, useState, useRef} from 'react';
import {styles} from '../assets/styles';
import {colors} from '../assets/colors';
import {ColorSpace} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import {useAuth} from './authContext';
import {
    LoginManager,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
} from 'react-native-fbsdk-next';
import {rntoast} from '../utils/toast';
import auth from '@react-native-firebase/auth';
import CustomTextInput from '../utils/textInput';

const DividerWithText = ({moreStyle, children}) => {
    return (
        <View style={[styles.row, styles.center, moreStyle]}>
            <View style={{borderWidth: 1 / 4, borderColor: colors.gray400, flex: 1}} />
            <Text
                style={{
                    marginHorizontal: 15,
                    color: colors.gray600,
                    fontFamily: 'Roboto-Bold',
                    textTransform: 'uppercase',
                }}>
                {children}
            </Text>
            <View style={{borderWidth: 1 / 4, borderColor: colors.gray400, flex: 1}} />
        </View>
    );
};

const Auth = ({navigation}) => {
    const passwordInput = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {
        signInWithEmailAndPassword,
        signOutUser,
        signInWithGoogle,
        user,
        signInWithFacebook,
        linkWithCredential,
    } = useAuth();

    useEffect(() => {
        if (user) {
            navigation.reset({
                index: 0,
                routes: [{name: 'Home'}],
            });
        }
    }, [user]);

    const getFacebookEmail = () =>
        new Promise(resolve => {
            const infoRequest = new GraphRequest('/me?fields=email', null, (error, result) => {
                if (error) {
                    console.log('Error fetching data: ' + error.toString());
                    resolve(null);
                    return;
                }

                resolve(result.email);
            });
            new GraphRequestManager().addRequest(infoRequest).start();
        });

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
                    <Text style={{fontFamily: 'Roboto-Bold', fontSize: 30, marginBottom: 10}}>
                        Login
                    </Text>
                    <View style={[styles.row, styles.center]}>
                        <CustomTextInput
                            placeholder="Email"
                            customIcon={color => {
                                return <Icon name="at" size={22} color={color} />;
                            }}
                            style={[styles.textInput]}
                            textContentType={'emailAddress'}
                            keyboardType="email-address"
                            onChange={e => setEmail(e.nativeEvent.text)}
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                passwordInput.current.focus();
                            }}
                        />
                    </View>
                    <View style={[styles.row, styles.center, {marginTop: 20}]}>
                        <CustomTextInput
                            ref={passwordInput}
                            customIcon={color => {
                                return <Octicons name="shield-lock" size={23} color={color} />;
                            }}
                            placeholder="Password"
                            style={styles.textInput}
                            textContentType={'password'}
                            secureTextEntry={true}
                            returnKeyType="done"
                            onChange={e => {
                                setPassword(e.nativeEvent.text);
                                console.log(password, 'password');
                            }}
                            onSubmitEditing={() => {
                                if (password.length < 6) {
                                    rntoast({
                                        description: 'Password must be at least 6 characters',
                                    });
                                    return;
                                } else if (!email || !password) {
                                    rntoast({description: 'Please fill all fields'});
                                    return;
                                }
                                signInWithEmailAndPassword(email, password)
                                    .then(() => {})
                                    .catch(() => {
                                        rntoast({description: 'Invalid email or password'});
                                    });
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            if (password.length < 6) {
                                rntoast({
                                    description: 'Password must be at least 6 characters',
                                });
                                return;
                            } else if (!email || !password) {
                                rntoast({description: 'Please fill all fields'});
                                return;
                            }

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
                            backgroundColor: colors.sheen,
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
                        onPress={async () => {
                            const signin = await signInWithFacebook();
                            const fbCredentials = signin[1];
                            signin[0]
                                .then(res => {
                                    console.log(res);
                                    console.log('signed in');
                                })
                                .catch(async error => {
                                    if (
                                        error.code &&
                                        error.code ===
                                            'auth/account-exists-with-different-credential'
                                    ) {
                                        const email = await getFacebookEmail();
                                        //credential

                                        if (email) {
                                            console.log(email);
                                            rntoast({
                                                message: 'Email already exists',
                                                description: 'please login with email',
                                            });
                                            const providers =
                                                await auth().fetchSignInMethodsForEmail(email);
                                            console.log(providers);
                                            if (true) {
                                                signInWithGoogle()
                                                    .then(res => {
                                                        linkWithCredential(fbCredentials);
                                                    })
                                                    .catch(err => {
                                                        console.log(err, 'err');
                                                    });
                                            }
                                            // fetchProvidersAndLink(email);
                                        }
                                    }
                                });
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
                            <Text style={{color: colors.sheen, fontFamily: 'Roboto-Bold'}}>
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
