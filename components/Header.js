import React from 'react'
import ArrowLeftIcon from './ArrowLeftIcon'
import responsiveSize from '../hooks/responsiveSize';

import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    PixelRatio
} from 'react-native'

export default function Header({ navigation }) {
    function goBack() {
        navigation.goBack();
    }
    function save() {
        console.log("memo saved");
    }
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => goBack()} style={styles.backBtn}>
                <ArrowLeftIcon size={responsiveSize(30)} color="#333" />
                <Text style={styles.BtnText}>Back</Text>
            </TouchableOpacity>
            {
                save &&
                <TouchableOpacity onPress={() => save()} style={styles.backBtn}>
                    <Text style={styles.BtnText}>Save</Text>
                </TouchableOpacity>
            }

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
    },
    header: {
        marginTop: 50,
        paddingInline: 50,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    backBtn: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    BtnText: {
        fontSize: responsiveSize(20),
    }
})