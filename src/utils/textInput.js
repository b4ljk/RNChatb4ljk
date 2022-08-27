import {styles} from '../assets/styles';
import {colors} from '../assets/colors';
import React, {useEffect, useState, forwardRef} from 'react';
import {TextInput} from 'react-native';

const CustomTextInput = forwardRef(
    (
        {
            customIcon,
            placeholder,
            secureTextEntry,
            onChangeText,
            value,
            onSubmitEditing,
            returnKeyType,
            keyboardType,
            autoCapitalize,
            autoCorrect,
            style,
            ...rest
        },
        ref,
    ) => {
        const [isFocused, setIsFocused] = useState(false);
        return (
            <>
                {customIcon && customIcon(isFocused ? colors.sheen : colors.gray500)}
                <TextInput
                    ref={ref}
                    placeholderTextColor={colors.gray400}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    onChangeText={onChangeText}
                    value={value}
                    onSubmitEditing={onSubmitEditing}
                    returnKeyType={returnKeyType}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    autoCorrect={autoCorrect}
                    style={[
                        styles.textInput,
                        style,
                        {borderBottomColor: isFocused ? colors.sheen : colors.gray400},
                    ]}
                    {...rest}
                />
            </>
        );
    },
);
export default CustomTextInput;
