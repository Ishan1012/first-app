import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ArrowLeftIcon from './ArrowLeftIcon';
import responsiveSize from '../hooks/responsiveSize';

const HelpPage = ({ navigation }) => {
    
    function goBack() {
        navigation.goBack();
    };

    const handleEmailPress = () => {
        Linking.openURL('mailto:memomate702@gmail.com');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={() => goBack()} style={styles.backBtn}>
                <ArrowLeftIcon size={responsiveSize(30)} color="#333" />
                <Text style={styles.BtnText}>Back</Text>
            </TouchableOpacity>

            <Text style={styles.heading}>Need Help?</Text>
            <Text style={styles.subheading}>Feel free to contact the developer:</Text>

            <View style={styles.contactContainer}>
                <Ionicons name="mail" size={24} color="#007AFF" />
                <TouchableOpacity onPress={handleEmailPress}>
                    <Text style={styles.contactText}>memomate702@gmail.com</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.contactContainer}>
                <Ionicons name="call" size={24} color="#34C759" />
                <TouchableOpacity>
                    <Text style={styles.contactText}>+1 234 567 890</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.noteBox}>
                <Text style={styles.note}>
                    💡 For faster responses, include your app version and describe the issue clearly.
                </Text>
            </View>
        </ScrollView>
    );
};

export default HelpPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 24,
        alignItems: 'flex-start'
    },
    heading: {
        marginTop: 50,
        fontSize: 26,
        fontWeight: '600',
        marginBottom: 10,
        color: '#333',
    },
    subheading: {
        fontSize: 18,
        marginBottom: 20,
        color: '#555',
    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        gap: 10,
    },
    contactText: {
        fontSize: 18,
        color: '#007AFF',
    },
    noteBox: {
        marginTop: 30,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 16,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    note: {
        fontSize: 16,
        color: '#666',
    },
    backBtn: {
        flexDirection: 'row',
        marginTop: 20,
    },
    BtnText: {
        fontSize: responsiveSize(20),
    } 
});
