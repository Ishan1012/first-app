import React, { useState, useEffect } from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import DailyJournal from './components/DailyJournal';
import Content from './components/Content';
import NewMemo from './components/NewMemo';
import HelpPage from './components/HelpPage';
import ProfilePage from './components/ProfilePage';
import SignupScreen from './components/SignupScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const savedUser = await UserService.loadUser();
      if (savedUser) setUser(savedUser);
      setLoading(false);
    };
    loadUser();
  }, []);

  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false,
          statusBarStyle: 'dark',
        }} initialRouteName='Home'>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Signup" component={SignupScreen}/>
          <Stack.Screen name="DailyJournal" component={DailyJournal} />
          <Stack.Screen name="Profile" component={ProfilePage} />
          <Stack.Screen name="Content" component={Content} />
          <Stack.Screen name="NewMemo" component={NewMemo} />
          <Stack.Screen name="Help" component={HelpPage} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

