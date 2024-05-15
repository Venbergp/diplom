// registration-page/components/BackIcon.jsx
import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';

const BackIcon = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.icon}>
            <Image source={require('../assets/back-icon.png')} style={styles.image} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
        marginLeft: 24,
        marginTop: 24,
    },
    // Если вы используете изображение для иконки:
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
});

export default BackIcon;
