import React from 'react'
import ArrowLeftIcon from './ArrowLeftIcon'
import responsiveSize from '../hooks/responsiveSize';
import TrashIcon from './TrashIcon';

import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    PixelRatio,
    Alert
} from 'react-native'

export default function Header({ navigation, del, id }) {
    function goBack() {
        navigation.goBack();
    };

    const deleteData = async (itemId) => {
        try {
            await fetch(`https://memo-mate-cbzn.onrender.com/api/notes/${itemId}`, {
                method: 'DELETE'
            })
            Alert.alert("Memo Deleted", "Your memo has been successfully deleted.", [
                {
                    text: 'OK',
                    onPress: () => goBack(),
                }
            ]);
        } catch (err) {
            Alert.alert("Deletion Failed", "We encountered an issue while trying to delete your memo. Please try again later.", [
                {
                    text: 'Ok',
                    onPress: () => console.warn("Error occurred while deleting memo:", err),
                }
            ]);
        }
    }

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => goBack()} style={styles.backBtn}>
                <ArrowLeftIcon size={responsiveSize(30)} color="#333" />
                <Text style={styles.BtnText}>Back</Text>
            </TouchableOpacity>
            {
                del &&
                (<TouchableOpacity onPress={() => deleteData(id)} style={styles.deleteBtn}>
                    <TrashIcon width={30} height={30} color="red" />
                </TouchableOpacity>)
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
        paddingInline: 30,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    backBtn: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    BtnText: {
        fontSize: responsiveSize(20),
    },
})