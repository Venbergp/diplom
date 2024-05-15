import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { useUser } from "../../../contexts/UserContext";

const ProfileStats = () => {
    const { userId } = useUser();
    const [stats, setStats] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get(`http://192.168.0.16:5000/profile/profile_stats/${userId}`);
                setStats([
                    { number: response.data.total_works, label: 'designs' },
                    { number: response.data.total_likes, label: 'likes' },
                    { number: response.data.total_sales, label: 'sold' }
                ]);
            } catch (error) {
                console.error("Failed to fetch stats", error);
                // Обработка ошибок, например, можно показать сообщение
            }
        };

        if (userId) {
            fetchStats();
        }
    }, [userId]);  // Обновление при изменении userId

    return (
        <View style={styles.container}>
            {stats.map((item, index) => (
                <View key={index} style={styles.statItem}>
                    <Text style={styles.statNumber}>{item.number}</Text>
                    <Text style={styles.statLabel}>{item.label}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#161616', // Этот цвет должен совпадать с фоном приложения
        paddingVertical: 10, // Отступ сверху и снизу
        paddingHorizontal: 40,
        marginBottom: 18,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    statLabel: {
        color: 'white',
        fontSize: 12,
    },
});

export default ProfileStats;
