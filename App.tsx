import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

// Import screens
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import VerifyOTPScreen from './src/screens/VerifyOTPScreen';
import HomeScreen from './src/screens/HomeScreen';

// Create stack navigator
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false, // Hide header for all screens
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen}
        />
        <Stack.Screen 
          name="VerifyOTP" 
          component={VerifyOTPScreen}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
