import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import BackIcon from './components/BackIcon';
import InputField from './components/InputField';
import RegistrationButton from './components/RegistrationButton';
import InputLabel from './components/InputLabel';

const RegistrationScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }
        try {
            const response = await axios.post('http://192.168.0.16:5000/auth/register', {
                username,
                email,
                password,
                confirm_password: confirmPassword
            });
            if (response.status === 201) {
                Alert.alert("Success", "Registration successful, please login.", [
                    { text: "OK", onPress: () => navigation.navigate('Login') }
                ]);
            }
        } catch (error) {
            if (error.response) {
                Alert.alert("Registration Failed", error.response.data.error);
            } else {
                Alert.alert("Registration Failed", "An unexpected error occurred.");
            }
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <BackIcon onPress={() => navigation.navigate('Login')} />
            </View>
            <View style={styles.card}>
                <InputLabel text="Email" />
                <InputField placeholder="введите email" value={email} onChangeText={setEmail} />

                <InputLabel text="Username" />
                <InputField placeholder="введите login" value={username} onChangeText={setUsername} />

                <InputLabel text="Password" />
                <InputField placeholder="введите пароль" secureTextEntry value={password} onChangeText={setPassword} />

                <InputLabel text="Confirm Password" />
                <InputField placeholder="повторите пароль" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />

                <RegistrationButton title="Sign Up" onPress={handleRegister} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161616',
    },
    header: {
        height: 96,
        paddingTop: 32,
        backgroundColor: '#2b2b2b',
    },
    card: {
        marginTop: 20,
        marginHorizontal: 8,
        backgroundColor: '#2b2b2b',
        borderRadius: 24,
        padding: 16,
    },
});

export default RegistrationScreen;
