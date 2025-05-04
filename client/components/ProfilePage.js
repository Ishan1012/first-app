import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { UserService } from './UserService';
import ArrowLeftIcon from './ArrowLeftIcon';
import responsiveSize from '../hooks/responsiveSize';

const ProfilePage = ({ navigation, route }) => {
    const user = route.params.user;
    
    function goBack() {
        navigation.goBack();
    };

    const { username, email, isVerified } = user;

    const logout = async () => {
        try {
            const res = await UserService.clearUser();
            navigation.navigate('Home');
            Alert.alert('Logout successful', 'You have been logged out');
        }
        catch (err) {
            Alert.alert(
                "Logout Failed",
                "An error occurred while trying to log out. Please try again later.",
                [
                    {
                        text: 'Retry',
                        onPress: () => logout(),
                    },
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    }
                ]
            );
        }
    }

    return (
        <View style={styles.container2}>
            <TouchableOpacity onPress={() => goBack()} style={styles.backBtn}>
                <ArrowLeftIcon size={responsiveSize(30)} color="#333" />
                <Text style={styles.BtnText}>Back</Text>
            </TouchableOpacity>
            <View style={styles.container}>
                <Image
                    source={require('../assets/user-icon.png')} // Replace with your actual image
                    style={styles.avatar}
                />
                <Text style={styles.name}>{username}</Text>
                <Text style={styles.email}>{email}</Text>

                {!isVerified && (
                    <Text style={styles.verifyWarning}>⚠️ Verify your email to access all features</Text>
                )}

                <TouchableOpacity style={styles.logout} onPress={logout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProfilePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
    },
    container2: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
        backgroundColor: '#f0f0f0',
    },
    name: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 10,
        color: '#333',
    },
    email: {
        fontSize: 18,
        color: '#666',
        marginBottom: 20,
    },
    verifyWarning: {
        fontSize: 16,
        color: '#d9534f',
        textAlign: 'center',
        marginTop: 10,
        paddingHorizontal: 20,
    },
    logout: {
        backgroundColor: '#f00',
        padding: '5%',
        borderRadius: 10,
    },
    logoutText: {
        color: '#fff',
        fontSize: 20,
    },
    backBtn: {
        marginLeft: 20,
        flexDirection: 'row',
        marginTop: 0,
    },
    BtnText: {
        fontSize: responsiveSize(20),
    }
});
