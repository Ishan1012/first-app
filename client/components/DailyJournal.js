import React, { useRef, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Cards from "./Cards";
import { useFocusEffect } from '@react-navigation/native';
import CalendarCheckIcon from "./CalendarCheckIcon";
import ListIcon from "./ListIcon";
import CloseIcon from "./CloseIcon";
import responsiveSize from '../hooks/responsiveSize';
import axios from 'axios';
import { UserService } from "./UserService";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image,
    RefreshControl,
    Animated,
    Dimensions,
    Alert
} from "react-native";

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function DailyJournal({ navigation }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const translateX = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
    const [open, setOpen] = useState(false);


    const toggleDrawer = () => {
        Animated.timing(translateX, {
            toValue: open ? -SCREEN_WIDTH : 0,
            duration: 300,
            useNativeDriver: true
        }).start();
        setOpen(!open);
    };

    const profile = async () => {
        const getUser = await UserService.loadUser();
        if(!getUser)
            navigation.navigate('Login');
        else
            navigation.navigate('Profile', { user: getUser });
    }

    const help = async () => {
        navigation.navigate('Help');
    }

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

    let a = require('../assets/mewmo lying on sofa.png')

    const getData = async () => {
        setLoading(true);
        const user = await UserService.loadUser();
        const userId = user._id;
        await axios.get(`https://memo-mate-cbzn.onrender.com/api/notes/${userId}`)
            .then((res) => setData(res.data))
            .catch(err => console.warn('Error fetching notes', err))
        setLoading(false);
    }

    const deleteData = async (itemId) => {
        setLoading(true);
        try {
            await fetch(`https://memo-mate-cbzn.onrender.com/api/notes/${itemId}`, {
                method: 'DELETE'
            }
            )
            getData();
        } catch (err) {
            console.warn("Error in Deleting: ", err);
        } finally {
            setLoading(false);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            const loadUser = async () => {
                try {
                    const savedUser = await UserService.loadUser();
                    if (!savedUser)
                        navigation.navigate('Home');
                } catch (error) {
                    console.error("Error in loadUser:", error);
                } finally {
                    setLoading(false);
                }
            };
            loadUser();
            getData(); // Fetch data when the screen comes into focus
        }, [])
    );

    const buttonPressed = async () => {
        const getUser = await UserService.loadUser();
        if (!getUser) {
            navigation.navigate('Login');
        }
        else {
            navigation.navigate('NewMemo');
        }
    }
    return (
        <SafeAreaProvider style={styles.container}>
            <TouchableOpacity style={styles.btn2} onPress={toggleDrawer}>
                <ListIcon width={34} height={34} fill="#000" style={styles.btnText2} />
            </TouchableOpacity>
            <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
                <TouchableOpacity style={styles.btn2} onPress={toggleDrawer}>
                    <CloseIcon size={32} color="#fff" style={styles.btnText2} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn2} onPress={profile}>
                    <Text style={styles.navLinks}>Profle</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn2} onPress={help}>
                    <Text style={styles.navLinks}>Help</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn2} onPress={logout}>
                    <Text style={[styles.navLinks, { color: '#f00' }]}>Logout</Text>
                </TouchableOpacity>
            </Animated.View>
            <View style={styles.innerContainer}>
                <View style={styles.headingContainer}>
                    <View style={styles.icon}>
                        <CalendarCheckIcon size={32} color="#000" style={styles.heading} />
                    </View>
                    <Text style={styles.heading}>{' '}Daily Journal</Text>
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => buttonPressed()}>
                    <Text style={styles.btnText}>Add a New Memo</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                style={styles.content}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={getData} />
                }
            >
                {
                    (!data || data.length === 0) ? (
                        <View style={styles.emptyContainer}>
                            <Image source={a} style={styles.emptyImg} />
                            <Text style={styles.emptyText}>No memos found. Start by creating one!</Text>
                        </View>
                    ) :
                        (data.map((data, index) => (
                            <View key={index}>
                                <Cards values={data} navigation={navigation} del={deleteData} id={data._id} />
                            </View>
                        )))
                }
            </ScrollView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column',
        width: '100%',
    },
    icon: {
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 10
    },
    content: {
        width: '100%',
        flex: 1,
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    heading: {
        fontSize: responsiveSize(40),
        fontWeight: '400',
    },

    btn: {
        backgroundColor: '#fc6262',
        paddingVertical: 12,
        paddingHorizontal: 14,
        marginBottom: 20,
        width: '80%',
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
    },
    loader: {
        alignSelf: 'center',
        verticalAlign: 'middle',
    },
    innerContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerContainer2: {
        marginTop: 30,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        marginTop: '10%'
    },
    emptyImg: {
        width: responsiveSize(300),
        height: responsiveSize(300)
    },
    emptyText: {
        fontSize: responsiveSize(35),
        marginInline: '7%',
        textAlign: 'center'
    },
    btn2: {
        alignSelf: 'flex-start',
        marginInline: 20,
        marginBlock: 10
    },
    btnText2: {
        marginTop: 30
    },
    drawer: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: SCREEN_WIDTH * 0.75,
        height: "110%",
        backgroundColor: '#333',
        padding: 20,
        paddingTop: 50,
        zIndex: 1000,
    },
    navLinks: {
        color: '#fff',
        fontSize: responsiveSize(30),
    }
});