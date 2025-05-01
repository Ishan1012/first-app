import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Cards from "./Cards";
import { useFocusEffect } from '@react-navigation/native';
import CalendarCheckIcon from "./CalendarCheckIcon";
import responsiveSize from '../hooks/responsiveSize';
import axios from 'axios';

import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl
} from "react-native";
import { useEffect, useState } from "react";

export default function DailyJournal({ navigation }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true);
        await axios.get('https://memo-mate-cbzn.onrender.com/api/notes')
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
        } catch(err) {
            console.warn("Error in Deleting: ",err);
        } finally {
            setLoading(false);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            getData(); // Fetch data when the screen comes into focus
        }, [])
    );

    function buttonPressed() {
        navigation.navigate('NewMemo');
    }
    return (
        <SafeAreaProvider style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.headingContainer}>
                    <View style={styles.icon}>
                        <CalendarCheckIcon size={32} color="#000" style={styles.heading} />
                    </View>
                    <Text style={styles.heading}>{' '}Daily Journal</Text>
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => buttonPressed()}>
                    <Text style={styles.btnText}>Add a Memo</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                style={styles.content}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={getData} />
                }
            >
                {
                    data.map((data, index) => (
                        <View key={index}>
                            <Cards values={data} navigation={navigation} del={deleteData} id={data._id} />
                        </View>
                    ))
                }
            </ScrollView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
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
        marginTop: 80,
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
        width: '90%',
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
    }
});