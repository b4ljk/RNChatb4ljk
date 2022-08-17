import React, {createContext, useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

const AuthContext = createContext({});
export const useAuth = () => {
  return useContext(AuthContext);
};
export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(undefined);
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const signInWithEmailAndPassword = async (email, password) => {
    try {
      return auth().signInWithEmailAndPassword(email, password);
    } catch {
      console.log('error');
    }
  };
  const signOutUser = async () => {
    return auth().signOut();
  };

  const signInWithGoogle = async () => {
    GoogleSignin.configure({
      webClientId:
        '192130499003-jseq0dlor78r0ohk154rag1gs5127ohc.apps.googleusercontent.com',
      // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  };

  const registerAccount = async (email, password) => {
    try {
      return auth().createUserWithEmailAndPassword(email, password);
    } catch {
      console.log('error');
    }
  };

  const signInWithFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (result.isCancelled) {
        throw new Error('User cancelled request');
      }
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw new Error('Something went wrong obtaining access token');
      }
      const credential = auth.FacebookAuthProvider.credential(data.accessToken);

      return auth().signInWithCredential(credential);
    } catch (error) {}
  };

  const value = {
    signInWithEmailAndPassword,
    signOutUser,
    signInWithGoogle,
    user,
    registerAccount,
    signInWithFacebook,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
