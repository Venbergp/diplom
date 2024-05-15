import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useUser } from "../../../contexts/UserContext";

const ProductCard = ({ postId }) => {
    const { userId } = useUser();
    const [product, setProduct] = useState({
        username: '',
        description: '',
        imageUrl: '',
        likes: 0,
        userLiked: false, // добавляем состояние, чтобы отслеживать, лайкнул ли пользователь пост
    });

    useEffect(() => {
        fetchPostDetails();
    }, [postId]);

    const fetchPostDetails = async () => {
        try {
            const detailsResponse = await axios.get(`http://192.168.0.16:5000/profile/post_details/${postId}`);
            const imageResponse = await axios.get(`http://192.168.0.16:5000/profile/post_image/${postId}`, { responseType: 'blob' });
            const likeCheckResponse = await axios.get(`http://192.168.0.16:5000/profile/check_like/${postId}/${userId}`);

            const imageBlob = new Blob([imageResponse.data], { type: 'image/png' });
            const imageUrl = URL.createObjectURL(imageBlob);

            setProduct({
                username: detailsResponse.data.username,
                description: detailsResponse.data.caption,
                imageUrl: imageUrl,
                likes: detailsResponse.data.likes_count,
                userLiked: likeCheckResponse.data.userLiked
            });
        } catch (error) {
            Alert.alert("Error", "Failed to fetch post details");
        }
    };

    const toggleLike = async () => {
        try {
            const endpoint = product.userLiked ? `unlike_post` : `like_post`;
            const response = await axios.post(`http://192.168.0.16:5000/profile/${endpoint}`, {
                user_id: userId,
                post_id: postId
            });

            if (response.status === 200) {
                setProduct(prevState => ({
                    ...prevState,
                    likes: product.userLiked ? prevState.likes - 1 : prevState.likes + 1,
                    userLiked: !product.userLiked
                }));
            } else {
                Alert.alert("Error", response.data.error || "Could not toggle like.");
            }
        } catch (error) {
            Alert.alert("Error", "Failed to toggle like.");
        }
    };

    return (
        <View style={styles.cardContainer}>
            <View style={styles.nick_group}>
                {product.imageUrl && (
                    <Image
                        source={{ uri: product.imageUrl }}
                        style={styles.userAvatar}
                    />
                )}
                <Text style={styles.username}>{'@' + product.username}</Text>
            </View>
            {product.imageUrl && (
                <Image
                    source={{ uri: product.imageUrl }}
                    style={styles.productImage}
                />
            )}

            <Text style={styles.productDescription}>{product.description}</Text>
            <View style={styles.actionsContainer}>
                <TouchableOpacity style={[styles.likeButton, product.userLiked ? styles.likedButton : styles.unlikedButton]} onPress={toggleLike}>
                    <Image
                        source={product.userLiked ? require('../assets/like.png') : require('../assets/green_like.png')}
                        style={styles.like}
                    />
                    <Text style={product.userLiked ? styles.likesCount_liked : styles.likesCount_unliked}>{product.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buyButton}>
                    <Text style={styles.buyText}>Buy</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    productDescription: {
        color: '#ffffff',
        fontSize: 14,
        // fontFamily: 'Source Sans Pro',
        alignSelf: 'center',
        marginVertical: 8,
    },
    buyButton: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    nick_group: {
        flexDirection: "row"
    },
    cardContainer: {
        backgroundColor: '#2b2b2b',
        borderRadius: 24,
        padding: 16,
        margin: 12,
        alignItems: 'flex-start',
    },
    userAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    username: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
        marginVertical: 8,
        marginLeft: 12
    },
    productImage: {
        width: '100%',
        height: 246,
        borderRadius: 24,
        marginVertical: 8,
    },
    like: {
        width: 12,
        height: 12,
    },
    likeButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 24,
        flexDirection: 'row',
        alignItems: 'center',
    },
    likedButton: {
        backgroundColor: '#00e226', // Зеленый фон, если лайкнуто
    },
    unlikedButton: {
        backgroundColor: '#000000', // Черный фон, если не лайкнуто
        borderWidth: 0.5,
        borderColor: '#00e226' // Тонкая зеленая обводка
    },
    likesCount_liked: {
        color: '#000000',
        fontSize: 12,
        marginLeft: 4,
    },
    likesCount_unliked: {
        color: '#00e226',
        fontSize: 12,
        marginLeft: 4,
    },
});

export default ProductCard;
