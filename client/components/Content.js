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
    TouchableOpacity,
    ScrollView
} from 'react-native'

export default function Content({navigation,route}) {
    const {item} = route.params;
    const date = JSON.parse(JSON.stringify(item.date));
    const mood = JSON.parse(JSON.stringify(item.mood));
    const desc = JSON.parse(JSON.stringify(item.desc));
    return (
        <ScrollView style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.innerContainer}>
                <Text style={styles.text}>{date}</Text>
                <Text style={styles.text}>{'\n'}Mood: {getMood[mood]}{'\n'}</Text>
                <Text style={styles.descText}>{'\n'}{desc}</Text>
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
    },
    innerContainer: {
        marginTop: '10%',
        marginInline: '5%'
    },
    text: {
        fontSize: responsiveSize(30),
    },
    descText: {
        fontWeight: '300',
        fontSize: responsiveSize(30),
    }
})