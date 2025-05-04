import React, { useState, useEffect } from 'react'
import Header from './Header';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native'
import { getMood, moods } from '../hooks/getMood';
import responsiveSize from '../hooks/responsiveSize';
import { UserService } from './UserService';

export default function NewMemo({ navigation }) {
  const [date, setDate] = React.useState('');
  const [currMood, setCurrMood] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [loading, setLoading] = useState(false);

  function buttonPressed(emoji) {
    setCurrMood(emoji);
  }

  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await UserService.loadUser();
        if (!savedUser)
          navigation.navigate('Home');
      } catch (error) {
        console.error("Error in loadUser:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const submit = async () => {
    if (loading) return;
    setLoading(true);

    const user = await UserService.loadUser();
    const userId = user._id;
    console.log(userId);
    if (date.length > 0 && currMood.length > 0 && desc.length > 0) {
      try {

        const data = {
          userId,
          date,
          mood: currMood,
          desc,
        };

        const response = await fetch("https://memo-mate-cbzn.onrender.com/api/notes/", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        const res = await response.json();
        console.log(res);

        if (response.ok) {
          Alert.alert("Saved Successfully!", "Your memo has been saved successfully.", [
            {
              text: 'Ok',
              onPress: () => {
                navigation.goBack();
              }
            }
          ])
        }
        else {
          Alert.alert("Error Saving Memo", "An error occurred while saving your memo. Please try again later", [
            {
              text: 'Ok',
              onPress: () => console.log("Error details:", res),
            }
          ]);
        }

      }
      catch (err) {
        Alert.alert("Error Saving Memo", "An error occurred while saving your memo. Please try again later", [
          {
            text: 'Ok',
            onPress: () => console.log("Error details:", err),
          }
        ]);
      } finally {
        setLoading(false);
      }
      setDate('');
      setCurrMood('');
      setDesc('');
    }
    else {
      Alert.alert("Incomplete Memo", "Please ensure all fields are filled out correctly before submitting.", [
        {
          text: 'Ok',
          onPress: () => console.warn("Incomplete memo submission detected."),
        }
      ]);
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Header navigation={navigation} del={false} />
      <View style={styles.heading}>
        <Text style={styles.headingText}>New Entry</Text>
      </View>
      <View style={styles.innerContainer}>
        <Text style={[styles.date, styles.text]}>Date: </Text>
        <TextInput
          style={[styles.input]}
          onChangeText={setDate}
          value={date}
          placeholder='Enter Date'
        />
        <Text style={[styles.date, styles.text]}>Mood: </Text>
        <View style={styles.emojiContainer}>
          {
            moods.map((item, index) => (
              <TouchableOpacity key={index} style={[styles.btn, currMood == item && styles.selectedBtn]} onPress={() => buttonPressed(item)}>
                <Text style={[styles.btnText, currMood == item && styles.selectedBtnText]}>{getMood[item]}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
        <Text style={[styles.date, styles.text]}>What's in your mind: </Text>
        <TextInput
          style={[styles.inputDesc]} // Increased height
          multiline={true}
          numberOfLines={4}
          onChangeText={setDesc}
          value={desc}
          textAlignVertical="top"
        />
      </View>
      <TouchableOpacity style={styles.btn2} onPress={() => submit()}>
        <Text style={styles.btnText2}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  innerContainer: {
    marginInline: '5%'
  },
  heading: {
    marginTop: '10%',
    marginInline: '5%'
  },
  headingText: {
    fontSize: responsiveSize(45),
    fontWeight: '500'
  },
  text: {
    fontSize: responsiveSize(30)
  },
  date: {
    marginTop: 20,
  },
  input: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#999',
    paddingLeft: 20,
    height: 70,
    fontSize: responsiveSize(25),
  },
  inputDesc: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#999',
    height: 150,
    paddingLeft: 20,
    paddingTop: 20,
    fontSize: responsiveSize(25)
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  btn: {
    padding: 5,
    borderRadius: 50,
  },
  btnText: {
    fontSize: responsiveSize(40)
  },
  selectedBtn: {
    borderRadius: 10,
  },
  selectedBtnText: {
    backgroundColor: '#eee',
    padding: 5,
    borderRadius: 5,
  },
  btn2: {
    backgroundColor: '#56709e',
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginTop: responsiveSize(20),
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    cursor: 'pointer'
  },
  btnText2: {
    fontSize: responsiveSize(20),
    fontWeight: '500',
    color: '#fff',
  }
})