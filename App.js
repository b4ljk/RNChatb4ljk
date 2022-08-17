/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer} from '@react-navigation/native';
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import 'react-native-gesture-handler';
import React from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import AppNavigator from './appNavigation';
import {AuthProvider} from './src/settings/authContext';

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Roboto-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Roboto-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Roboto-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Roboto-Thin',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Roboto-Bold',
    },
  },
};
fontConfig.ios = fontConfig.default;
fontConfig.android = fontConfig.default;

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
  },
};
const App = () => {
  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer onReady={() => RNBootSplash.hide()}>
          <AppNavigator />
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
};

export default App;
