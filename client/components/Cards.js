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
import TrashIcon from './TrashIcon';

export default function Cards({ values, navigation, del, id }) {

  function openContent(item) {
    navigation.navigate('Content', { item: item, id: id });
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
      <Text style={[styles.text, styles.desc]}>{values.desc.substring(0,40)}...</Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.button} onPress={() => del(id)}>
          <TrashIcon styles={styles.trash} width={20} height={20} color='red' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => openContent(values)}>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      </View>
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
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
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