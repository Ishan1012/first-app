// services/UserService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'MEMO_USER';

export const UserService = {
  // Save user to AsyncStorage
  saveUser: async (user) => {
    try {
      const jsonValue = JSON.stringify(user);
      await AsyncStorage.setItem(USER_KEY, jsonValue);
    } catch (e) {
      console.error('Error saving user:', e);
    }
  },

  // Load user from AsyncStorage
  loadUser: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(USER_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Error loading user:', e);
      return null;
    }
  },

  // Remove user from AsyncStorage (e.g., on logout)
  clearUser: async () => {
    try {
      await AsyncStorage.removeItem(USER_KEY);
    } catch (e) {
      console.error('Error clearing user:', e);
    }
  }
};
