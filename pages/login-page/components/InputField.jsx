// login-page/components/InputField.jsx
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const InputField = ({ placeholder, secureTextEntry }) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#bbbbbb"
            secureTextEntry={secureTextEntry}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        width: 255,
        height: 36,
        paddingHorizontal: 8,
        borderRadius: 24,
        backgroundColor: '#2b2b2b',
        color: '#bbbbbb',
        fontSize: 12,
        // fontFamily: 'Source Sans Pro',
    },
});

export default InputField;
