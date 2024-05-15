// shared/Navbar.jsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Navbar = ({pressOnRec, pressOnAdd, pressOnProfile}) => {
    return (
        <View style={styles.container}>


            {/* Центральная кнопка будет позиционирована абсолютно и выступать вверх */}
            <View style={styles.addButtonContainer}>
                <TouchableOpacity style={styles.addButton} onPress={pressOnAdd}>
                    <Image source={require('./assets/add-icon.png')} style={styles.iconAdd} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.iconButton} onPress={pressOnRec}>
                <Image source={require('./assets/search-icon.png')} style={styles.icon} />
            </TouchableOpacity>
            <View style={styles.iconButton1}>
                <TouchableOpacity onPress={pressOnProfile}>
                    <Image source={require('./assets/profile-icon.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 86,
        backgroundColor: '#424242',
        // Установите paddingBottom равным высоте, которую кнопка выступает вверх
        paddingBottom: 30,
    },
    iconButton: {
        flex: 1, // равномерное распределение пространства
        alignItems: 'center', // Центрирование иконок
        zIndex: 1,
    },
    iconButton1: {
        marginLeft: 100,
        flex: 1, // равномерное распределение пространства
        alignItems: 'center', // Центрирование иконок
        zIndex: 1
    },
    addButtonContainer: {
        position: 'absolute',
        alignItems: 'center',
        left: 0,
        right: 0,
        bottom: 20, // высота выступания кнопки вверх
        zIndex: 0
    },
    addButton: {
        backgroundColor: '#161616',
        width: 66,
        height: 66,
        borderRadius: 52,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2b2b2b',
        zIndex: 3,
        // Высота выступания кнопки вверх над контейнером
        bottom: 10,
    },
    icon: {
        height: 24,
        width: 24,
        resizeMode: 'contain',
    },
    iconAdd: {
        height: 24,
        width: 24,
    },
});

export default Navbar;
