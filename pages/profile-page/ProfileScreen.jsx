import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Navbar from '../shared/Navbar';
import ProfileStats from "./components/ProfileStats";
import ProductCard from "./components/ProductCard";
import { useUser } from "../../contexts/UserContext";
import axios from 'axios';
import ProfileHeader from "./components/Profileheader";

const ProfileScreen = ({ navigation }) => {
    const { userId } = useUser();
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            const fetchUserData = async () => {
                setLoading(true);
                try {
                    // Запрос данных пользователя
                    const userResponse = await axios.get(`http://192.168.0.16:5000/profile/get_username/${userId}`);
                    setUsername(userResponse.data.username);

                    // Запрос постов пользователя
                    const postsResponse = await axios.get(`http://192.168.0.16:5000/profile/user_posts/${userId}`);
                    setPosts(postsResponse.data.post_ids);
                } catch (error) {
                    Alert.alert('Error', 'Failed to fetch data');
                }
                setLoading(false);
            };

            if (userId) {
                fetchUserData();
            }

            return () => {};
        }, [userId])
    );

    return (
        <View style={styles.container}>
            <ScrollView>
                <ProfileHeader username={username || '@username'} onSettings={() => navigation.navigate('Login')}/>
                <ProfileStats />
                {loading ? <Text>Loading...</Text> : posts.map(postId => (
                    <ProductCard key={postId} postId={postId} />
                ))}
            </ScrollView>
            <Navbar
                style={styles.navbar}
                pressOnAdd={() => navigation.navigate('NewItem')}
                pressOnRec={() => navigation.navigate('Recommendations')}
                pressOnProfile={() => navigation.navigate('Profile')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161616',
        justifyContent: 'space-between',
    },
    navbar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#424242',
    },
});

export default ProfileScreen;
