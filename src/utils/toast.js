import {showMessage} from 'react-native-flash-message';

export const rntoast = ({
  message = 'Error',
  description = 'Something went wrong',
  type = 'danger',
  onPress = () => null,
  position = 'bottom',
  duration = 4500,
}) => {
  return showMessage({
    position,
    animated: true,
    floating: true,
    message,
    description,
    duration,
    type,
    titleStyle: {
      fontSize: 16,
      fontFamily: 'Roboto-Bold',
      color: 'white',
    },
    textStyle: {
      fontFamily: 'Roboto-Regular',
      maxHeight: 60,
      lineHeight: 20,
      color: 'white',
    },
    onPress,
    hideOnPress: true,
  });
};
