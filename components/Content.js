import React from 'react'
import ArrowLeftIcon from './ArrowLeftIcon'
import Header from './Header';
import { getMood } from '../hooks/getMood';
import responsiveSize from '../hooks/responsiveSize';

import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

export default function Content({navigation,route}) {
    const {item} = route.params;
    const date = JSON.parse(JSON.stringify(item.date));
    const mood = JSON.parse(JSON.stringify(item.mood));
    const desc = JSON.parse(JSON.stringify(item.desc));
    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.heading}>
                <Text style={styles.text}>{date}</Text>
                <Text style={styles.text}>Mood: {getMood[mood]}</Text>
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
    },
    heading: {

    },
    text: {
    }
})