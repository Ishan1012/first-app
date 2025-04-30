import React from 'react'
import Header from './Header';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet
} from 'react-native'

export default function NewMemo({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: '#fff',
      height: '100%',
  },
})