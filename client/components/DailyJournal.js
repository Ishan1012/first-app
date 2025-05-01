import { SafeAreaProvider } from "react-native-safe-area-context";
import GetData from "../hooks/GetData";
import Cards from "./Cards";
import CalendarCheckIcon from "./CalendarCheckIcon";
import responsiveSize from '../hooks/responsiveSize';

import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { useEffect, useState } from "react";

export default function DailyJournal({ navigation }) {
    const [data,setData]=useState([])

    useEffect(() => {
        setData(GetData())
    },[])

    function buttonPressed() {
        navigation.navigate('NewMemo');
    }
    return (
        <SafeAreaProvider style={styles.container}>
            <View style={{backgroundColor: '#fff'}}>
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
            <ScrollView style={styles.content}>
                {
                    data.map((data, index) => (
                        <View key={index}>
                            <Cards values={data} navigation={navigation} />
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
        justifyContent: 'space-evenly',
        alignItems: 'center',
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
    }
});