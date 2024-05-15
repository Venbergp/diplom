// registration-page/components/RegistrationButton.jsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const RegistrationButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '100%', // ранее было 327px, теперь используем 100% относительно родительского элемента
        height: 40,
        borderRadius: 24,
        backgroundColor: '#00e226',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8, // добавим отступ сверху и снизу
    },
    text: {
        color: '#ffffff',
        fontSize: 16,
        // fontFamily: 'Source Sans Pro',
    },
});

export default RegistrationButton;
