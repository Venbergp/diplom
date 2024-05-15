// registration-page/components/InputField.jsx
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const InputField = ({ placeholder, secureTextEntry, value, onChangeText }) => {
    return (
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#bbbbbb"
            secureTextEntry={secureTextEntry}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        width: '100%', // ранее было 327px, теперь используем 100% относительно родительского элемента
        height: 44,
        paddingHorizontal: 8,
        borderRadius: 24,
        backgroundColor: '#161616',
        color: '#bbbbbb',
        fontSize: 16,
        // fontFamily: 'Source Sans Pro',
        marginVertical: 8, // добавим отступ сверху и снизу
    },
});

export default InputField;
