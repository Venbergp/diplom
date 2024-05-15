// registration-page/components/InputLabel.jsx
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const InputLabel = ({ text }) => {
    return <Text style={styles.text}>{text}</Text>;
};

const styles = StyleSheet.create({
    text: {
        color: '#ffffff',
        fontSize: 14,
        // fontFamily: 'Source Sans Pro',
        fontWeight: '500',
        marginVertical: 8, // Добавляем небольшой отступ между метками и полями ввода
    },
});

export default InputLabel;
