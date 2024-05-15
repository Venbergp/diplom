// profile-page/components/ProductCardBuy.jsx
import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

const ProductCardBuy = ({ product }) => {
    product = product_mock
    return (
        <View style={styles.cardContainer}>
            <View style={styles.userSection}>
                <Image
                    source={require('../assets/avatar.png')} // Замените на свой путь к аватару пользователя
                    style={styles.userAvatar}
                />
                <Text style={styles.username}>{product.username}</Text>
            </View>
            <Image
                source={require('../assets/product_1.png')} // Замените на свой путь к изображению товара
                style={styles.productImage}
            />
            <Text style={styles.productDescription}>{product.description}</Text>
            <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.likeButton}>
                    <Image
                        source={require('../assets/like.png')} // Замените на свой путь к изображению иконки лайка
                        style={styles.likeIcon}
                    />
                    <Text style={styles.likesCount}>{product.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buyButton}>
                    <Text style={styles.buyText}>Buy</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#2b2b2b',
        borderRadius: 24,
        padding: 16,
        margin: 12,
        alignItems: 'flex-start',
    },
    userSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
    },
    username: {
        color: '#ffffff',
        fontSize: 16,
        // fontFamily: 'Source Sans Pro',
        fontWeight: '600',
    },
    productImage: {
        width: '100%',
        height: 246,
        borderRadius: 24,
        marginVertical: 8,
    },
    productDescription: {
        color: '#ffffff',
        fontSize: 14,
        // fontFamily: 'Source Sans Pro',
        alignSelf: 'center',
        marginVertical: 8,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    likeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#00e226',
        borderRadius: 24,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    likeIcon: {
        width: 12,
        height: 12,
        marginRight: 4,
    },
    likesCount: {
        color: '#030303',
        fontSize: 12,
        // fontFamily: 'Source Sans Pro',
    },
    buyButton: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buyText: {
        color: '#030303',
        fontSize: 12,
        // fontFamily: 'Source Sans Pro',
    },
});

export default ProductCardBuy;

const product_mock = {
    username: 'username',
    description: 'Personalized initials, unique pattern',
    likes: '123',
    // Добавьте свои изображения
};

// Вставьте <ProductCardBuy product={product_mock} /> в место, где вы хотите отобразить карточку товара
