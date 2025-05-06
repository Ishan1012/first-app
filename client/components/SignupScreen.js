import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { Alert } from 'react-native';
import { UserService } from './UserService';

export default function SignupScreen({ navigation }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        const loadUser = async () => {
            try {
                const savedUser = await UserService.loadUser();
                if (savedUser)
                    navigation.navigate('Home');
            } catch (error) {
                console.error("Error in loadUser:", error);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = async () => {
        if (loading) return; // Prevent multiple clicks

        setLoading(true);
        const { username, email, password, confirmPassword } = form;

        if (!username || !email || !password || !confirmPassword) {
            Alert.alert('Missing Information', 'All fields are required. Please complete the form.');
        }

        try {
            const response = await axios.post('https://memo-mate-cbzn.onrender.com/api/user/signup', {
                username: form.username,
                email: form.email,
                password: form.password,
                confirmPassword: form.confirmPassword
            });
            const resData = await response.data;

            await UserService.saveUser(resData);
            setForm({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            Alert.alert('Signup Successful', 'Your account has been created successfully.', [
                { text: 'OK', onPress: () => {
                    navigation.goBack();
                    navigation.navigate('DailyJournal');
                }
            }
            ]);
        } catch (error) {
            console.log(error);
            Alert.alert('Signup failed', error?.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };


    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView contentContainerStyle={styles.container}>
                <Image
                    source={require('../assets/mewmo exercise.png')} // Replace with your local Mewmo image
                    style={styles.mascot}
                    resizeMode="contain"
                />
                <Text style={styles.heading}>Create an Account</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#aaa"
                    onChangeText={(text) => handleChange('username', text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                    onChangeText={(text) => handleChange('email', text)}
                />

                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Password"
                        placeholderTextColor="#aaa"
                        secureTextEntry={!showPassword}
                        onChangeText={(text) => handleChange('password', text)}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#888" />
                    </TouchableOpacity>
                </View>

                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Confirm Password"
                        placeholderTextColor="#aaa"
                        secureTextEntry={!showConfirmPassword}
                        onChangeText={(text) => handleChange('confirmPassword', text)}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color="#888" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    {loading ? (
                        <ActivityIndicator size='large' color='#fff' style={styles.buttonText} />
                    ) : (
                        <Text style={styles.buttonText}>Sign Up</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        padding: 24,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    heading: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#56709e',
        textAlign: 'center',
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 14,
        borderRadius: 10,
        marginBottom: 16,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 12,
        borderRadius: 10,
        marginBottom: 16,
        backgroundColor: '#f9f9f9',
    },
    passwordInput: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#56709e',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    mascot: {
        width: 200,
        height: 200,
        marginTop: 20,
        marginBottom: 10,
        alignSelf: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    }
});
