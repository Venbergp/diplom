// profile-page/components/ProfileHeader.jsx
import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

const ProfileHeader = ({ username, onEditProfile, onSettings }) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/header-background.png')}
                style={styles.backgroundImage}
            />
            <Image
                source={require('../assets/avatar.png')}
                style={styles.avatar}
            />
            <Text style={styles.username}>{'@'+username}</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.editProfileButton} onPress={onEditProfile}>
                    <Text style={styles.editProfileText}>Edit profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsButton} onPress={onSettings}>
                    <Image
                        source={require('../assets/settings-icon.png')}
                        style={styles.settingsIcon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 12,
    },
    backgroundImage: {
        width: '100%',
        height: 140,
        borderRadius: 24,
        position: 'absolute',
    },
    avatar: {
        width: 96,
        height: 96,
        borderRadius: 48,
        marginTop: 92,
        borderWidth: 3,
        borderColor: 'white',
    },
    username: {
        color: 'white',
        fontSize: 24,
        // fontFamily: 'Source Sans Pro',
        fontWeight: '700',
        marginVertical: 8,
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignSelf: 'stretch', // Растягиваем контейнер на всю доступную ширину
        paddingHorizontal: 16, // Добавляем горизонтальные отступы
        marginTop: 12, // Добавляем отступ сверху
    },
    editProfileButton: {
        flex: 1, // Кнопка займет всю доступную ширину слева
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 24,
        paddingVertical: 8,
        paddingHorizontal: 32,
        marginRight: 12
    },
    editProfileText: {
        color: '#161616',
        fontSize: 14,
        // fontFamily: 'Source Sans Pro',
    },
    settingsButton: {
        marginLeft: 'auto', // Выравниваем кнопку настроек по правому краю
        backgroundColor: 'white',
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
        width: 42,
        height: 42,
    },
    settingsIcon: {
        width: 42,
        height: 42
    },
    // ... остальные стили
});

export default ProfileHeader;
