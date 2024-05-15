// login-page/components/AuthButton.jsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AuthButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 295,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#00e226',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#ffffff',
        fontSize: 16,
        // fontFamily: 'Source Sans Pro',
        fontWeight: '700',
    },
});

export default AuthButton;
