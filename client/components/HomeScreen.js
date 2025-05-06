import React, { useState, useEffect } from 'react';
import responsiveSize from '../hooks/responsiveSize';
import { UserService } from './UserService';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Animated
} from 'react-native';

const HomeScreen = ({ navigation }) => {
    let a = require('../assets/hero-image.png');
    let b = require('../assets/logo.png');
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState('');

    useEffect(() => {
        const loadUser = async () => {
            try {
                const savedUser = await UserService.loadUser();
                if (savedUser) {
                    setUser(savedUser);
                }
            } catch (error) {
                console.error("Error in loadUser:", error);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);


    const buttonPressed = () => {
        if (!loading && !user)
            navigation.navigate('Login');
        else
            navigation.navigate('DailyJournal');
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.header}>
                <Image source={b} style={styles.iconImg} />
                <Text style={styles.appname}>{' '}MemoMate</Text>
            </View>
            <View style={styles.hero}>
                <Image source={a} style={styles.heroImg} />
            </View>
            <View style={styles.content}>
                <View>
                    <Text style={styles.title}> Welcome To MemoMate
                    </Text>

                    <Text style={styles.message}>
                        Write memos with Mewmo quickly and easily
                    </Text>
                </View>

                <TouchableOpacity style={styles.btn} onPress={() => buttonPressed()}>
                    <Text style={styles.btnText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    content: {
        padding: 24,
        justifyContent: 'space-between',
        flex: 1,
    },
    header: {
        width: '100%',
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    iconImg: {
        width: responsiveSize(60),
        height: responsiveSize(60),
    },
    appname: {
        paddingRight: 10,
        fontSize: 40,
        fontWeight: '600',
    },
    title: {
        fontSize: responsiveSize(28),
        fontWeight: '600',
        color: '#281b52',
        textAlign: 'center',
        marginTop: responsiveSize(20),
        marginBottom: 12,
    },
    message: {
        fontSize: responsiveSize(19),
        fontWeight: '400',
        color: '#9992a7',
        textAlign: 'center',
    },
    hero: {
        marginTop: 0,
        padding: 16,
        borderRadius: 16,
        margin: 0,
    },
    heroImg: {
        alignSelf: 'center',
        width: responsiveSize(350),
        height: responsiveSize(350),
        borderRadius: 10,
    },
    appName: {
        backgroundColor: '#fff2dd',
        paddingHorizontal: 6,
        transform: [
            {
                rotate: '-3deg',
            }
        ],
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#999'
    },
    appNameText: {
        fontSize: 28,
        fontWeight: '700',
        color: '#281b52',
    },
    btn: {
        backgroundColor: '#56709e',
        paddingVertical: 12,
        paddingHorizontal: 14,
        width: '90%',
        marginBlock: 20,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 60,
        cursor: 'pointer'
    },
    btnText: {
        fontSize: responsiveSize(20),
        fontWeight: '500',
        color: '#fff',
    }
});

export default HomeScreen;