import React from 'react'
import { getMood } from '../hooks/getMood';
import { getColor } from '../hooks/getColor';
import responsiveSize from '../hooks/responsiveSize';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  PixelRatio,
  TouchableOpacity,
} from 'react-native';

export default function Cards({ values, navigation }) {

  function openContent(item) {
    navigation.navigate('Content', { item: item });
  }

  return (
    <View style={styles.container}>
      <View style={[styles.innerContainer, {
        backgroundColor: getColor[values.mood],
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
      }]}
      >
        {/* <Text style={styles.text}>{index}.{' '}</Text> */}
        <Text style={[styles.text, styles.emoji]}>{getMood[values.mood]}</Text>
        <Text style={styles.text}>{values.date}</Text>
      </View>
      <Text style={[styles.text, styles.desc]}>{values.desc}</Text>
      <TouchableOpacity style={styles.button} onPress={() => openContent(values)}>
        <Text style={styles.buttonText}>View</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginInline: '10%',
    marginBottom: '5%',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#bbb',
    alignItems: 'center'

  },
  innerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingInline: 30,
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingBottom: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  },
  emoji: {
    fontSize: responsiveSize(25),
  },
  text: {
    fontSize: responsiveSize(20),
    paddingInline: responsiveSize(5)
  },
  desc: {
    textAlign: 'justify',
    paddingBlock: responsiveSize(20),
    paddingInline: 10,
  },
  button: {
    alignSelf: 'flex-end',
    marginInline: '7%',
    marginBottom: '5%'
  },
  buttonText: {
    fontSize: responsiveSize(20),

  }
})