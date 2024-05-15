import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native';
import Navbar from "../shared/Navbar";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { encode as base64Encode } from 'base-64';
import {useUser} from "../../contexts/UserContext";

const NewItemScreen = ({ navigation }) => {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(require('./assets/white_t-shirt_plus.jpg'));
    const { userId, setUserId } = useUser();
    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        // console.log(result)
        if (!result.cancelled) {
            await uploadImage(result.assets[0]);
        }
    };

    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var length = bytes.byteLength;
        for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return base64Encode(binary);
    };

    const uploadImage = async (asset) => {
        const { uri, fileName, type } = asset;
        const formData = new FormData();
        formData.append('print', {
            uri: uri,
            name: fileName || 'upload.jpg',
            type: type || 'image/jpeg'
        });

        try {
            const response = await axios.post('http://192.168.0.16:5000/profile/apply_print', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                responseType: 'arraybuffer'
            });

            const base64 = arrayBufferToBase64(response.data);
            const fileUri = `${FileSystem.cacheDirectory}print.png`;

            await FileSystem.writeAsStringAsync(fileUri, base64, {
                encoding: FileSystem.EncodingType.Base64
            });

            setImage({ uri: fileUri });
            const fileInfo = await FileSystem.getInfoAsync(fileUri);
            console.log('File Info:', fileInfo);
        } catch (error) {
            console.error('Error uploading image:', error.message);
        }
    };

    const postItem = async () => {
        if (!caption || !image.uri) {
            Alert.alert('Error', 'Please provide both an image and a caption.');
            return;
        }

        const formData = new FormData();
        formData.append('user_id', userId);
        formData.append('caption', caption);
        // Добавляем файл изображения
        formData.append('image', {
            uri: image.uri,
            name: 'upload.png', // Имя файла
            type: 'image/png' // MIME тип
        });

        try {
            const response = await axios.post('http://192.168.0.16:5000/profile/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                Alert.alert('Success', 'Your post has been published!');
                navigation.goBack();
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to post your item.');
            console.error('Error posting item:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardView}
            >
                <Text style={styles.headerText}>Add a new item</Text>
                <TouchableOpacity onPress={pickImage}>
                    <Image source={image} style={styles.image} />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    onChangeText={setCaption}
                    value={caption}
                    placeholder="Add a caption..."
                    placeholderTextColor="#bbbbbb"
                />
                <TouchableOpacity style={styles.button} onPress={postItem}>
                    <Text style={styles.buttonText}>Post</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            <Navbar
                pressOnAdd={() => navigation.navigate('NewItem')}
                pressOnRec={() => navigation.navigate('Recommendations')}
                pressOnProfile={() => navigation.navigate('Profile')}
            ></Navbar>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161616',
    },
    keyboardView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 96
    },
    headerText: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 24
    },
    image: {
        width: 335,
        height: 400,
        borderRadius: 24,
        marginBottom: 24
    },
    input: {
        width: '100%',
        height: 56,
        borderRadius: 24,
        backgroundColor: '#2b2b2b',
        color: '#bbbbbb',
        fontSize: 16,
        paddingHorizontal: 16,
        marginBottom: 24
    },
    button: {
        width: '100%',
        height: 52,
        borderRadius: 24,
        backgroundColor: '#00e226',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700'
    }
});

export default NewItemScreen;
