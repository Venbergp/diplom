// login-page/components/SignUpText.jsx
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const SignUpButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    text: {
        color: '#ffffff',
        fontSize: 12,
        // fontFamily: 'Source Sans Pro',
        fontWeight: '700',
    },
});

export default SignUpButton;
