import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Alert } from 'react-native';
import Navbar from '../shared/Navbar';
import axios from 'axios';
import { useUser } from "../../contexts/UserContext";
import ProductCard from "../profile-page/components/ProductCard";

const RecomendtationScreen = ({ navigation }) => {
    const { userId } = useUser();
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://192.168.0.16:5000/profile/recommendations/${userId}`);
                setRecommendations(response.data.recommended_post_ids);
                setLoading(false);
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch recommendations');
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [userId]);

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.header}>Recommendations</Text>
                {loading ? (
                    <Text style={styles.loading}>Loading...</Text>
                ) : (
                    recommendations.map(postId => (
                        <ProductCard key={postId} postId={postId} />
                    ))
                )}
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
    header: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 24,
        fontWeight: '700',
        marginVertical: 8,
    },
    container: {
        backgroundColor: '#161616',
        paddingTop: 40,
        flex: 1,
        justifyContent: 'space-between',
    },
    loading: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 18,
        marginVertical: 20,
    },
    navbar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#424242',
    },
});

export default RecomendtationScreen;
