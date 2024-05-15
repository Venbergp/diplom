import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TextInput, Image, Keyboard, Animated, Alert } from 'react-native';
import AuthButton from './components/AuthButton';
import SignUpButton from './components/SignUpButton';
import axios from 'axios';
import {useUser} from "../../contexts/UserContext";

const emailIcon = require('./assets/images/email-icon.png');
const passwordIcon = require('./assets/images/password-icon.png');

const LoginPage = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const imageHeight = useRef(new Animated.Value(300)).current;
    const { userId, setUserId } = useUser();

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            Animated.timing(imageHeight, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start();
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            Animated.timing(imageHeight, {
                toValue: 300,
                duration: 300,
                useNativeDriver: false,
            }).start();
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://192.168.0.16:5000/auth/login', {
                username: email,
                password: password
            });
            if (response.data && response.data.user_id) {
                console.log(response.data)
                setUserId(response.data.user_id);
                navigation.navigate('Profile', { userId: response.data.user_id });
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                Alert.alert("Login Failed", "Invalid username or password");
            } else {
                Alert.alert("Login Error", "An unexpected error occurred. Please try again later.");
            }
        }
    };

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('./assets/images/logo.png')}
                style={[styles.image, { height: imageHeight }]}
                resizeMode="contain"
            />
            <Text style={styles.title}>Custy</Text>
            <View style={styles.inputContainer}>
                <Image source={emailIcon} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    placeholderTextColor="#bbbbbb"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <View style={styles.inputContainer}>
                <Image source={passwordIcon} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor="#bbbbbb"
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <View style={styles.authButton}>
                <AuthButton title="Sign In" onPress={handleLogin} />
            </View>
            <View style={styles.signUpButton}>
                <SignUpButton title="Sign Up" onPress={() => navigation.navigate('Register')} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        marginBottom: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#161616',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 20,
        paddingTop: 60
    },
    title: {
        color: '#ffffff',
        fontSize: 28,
        // fontFamily: 'Source Sans Pro',
        fontWeight: '700',
        marginVertical: 32,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        width: '90%',
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    input: {
        backgroundColor: '#2b2b2b',
        color: '#ffffff',
        borderRadius: 25,
        fontSize: 16,
        padding: 10,
        flex: 1,
    },
    authButton: {
        marginVertical: 10,
    },
    signUpButton: {
        margin: 10,
    },
});

export default LoginPage;
