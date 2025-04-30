import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import DailyJournal from './components/DailyJournal';
import Content from './components/Content';
import NewMemo from './components/NewMemo';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }} initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DailyJournal" component={DailyJournal} />
        <Stack.Screen name="Content" component={Content} />
        <Stack.Screen name="NewMemo" component={NewMemo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

