import {Dimensions, StyleSheet, StatusBar, ColorPropType} from 'react-native';
import {colors} from './colors';
// import DeviceInfo from 'react-native-device-info';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const statusbarHeight = StatusBar.currentHeight;

//style
export const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  container: {
    flex: 1,
    padding: 15,
  },
  row: {
    flexDirection: 'row',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    marginLeft: 10,
    borderBottomColor: colors.gray400,
    borderBottomWidth: 1.5,
    flex: 1,
    padding: 0,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
  },
  whiteTextB: {
    color: colors.white,
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
  },
});
