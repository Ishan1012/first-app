import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function App() {
  let a=require('./assets/image2.jpg');
  let c=require('./assets/image1.jpg');
  let b=false;

  function buttonClick() {
    b=!b;
    return b?a:c;
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.hero}>
        <Image source={a} style={styles.heroImg} />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}> Plan your day {'\n'} with{' '}
            <View style={styles.appName}>
              <Text style={styles.appNameText}>Portify</Text>
            </View>
          </Text>
          
          <Text style={styles.message}>
            this is a sample message
          </Text>
        </View>

        <TouchableOpacity style={styles.btn} onPress={() => buttonClick()}>
          <Text style={styles.btnText}>Let's go</Text>
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
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 45,
    color: '#281b52',
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    fontSize: 15,
    lineHeight: 40,
    fontWeight: '400',
    color: '#9992a7',
    textAlign: 'center',
  },
  hero: {
    backgroundColor: '#d8dffe',
    marginTop: 45,
    padding: 16,
    borderRadius: 16,
    margin: 12,
  },
  heroImg: {
    width: '100%',
    height: 400,
    borderRadius: 10,
  },
  appName: {
    backgroundColor: '#fff2dd',
    paddingHorizontal: 6,
    transform: [
      {
        rotate: '-5deg',
      }
    ]
  },
  appNameText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#281b52',
  },
  btn: {
    backgroundColor: '#56409e',
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  btnText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff',
  }
});
