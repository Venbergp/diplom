import React from 'react';
import { Image, StyleSheet } from 'react-native';

const ImageContainer = ({ source }) => {
    return <Image source={source} style={styles.image} />;
};

const styles = StyleSheet.create({
    image: {
        width: 248,
        height: 248,
        borderRadius: 124,
    },
});

export default ImageContainer;
