import React, {createContext, useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const AuthContext = createContext({});
export const useAuth = () => {
  return useContext(AuthContext);
};
export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
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

  const value = {
    signInWithEmailAndPassword,
    signOutUser,
    signInWithGoogle,
    user,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
