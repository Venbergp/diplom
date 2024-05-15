// login-page/components/IconButton.jsx
import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const IconButton = ({ type }) => {
    const iconSource = type === 'email' ? require('../assets/images/email-icon.png') : require('../assets/images/password-icon.png');

    return (
        <TouchableOpacity style={styles.iconButton}>
            <Image source={iconSource} style={styles.icon} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    iconButton: {
        // Добавьте стили, если необходимо
    },
    icon: {
        width: 24,
        height: 24,
    },
});

export default IconButton;
