import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch } from './src/redux/hooks';
import { login } from './src/redux/slices/authSlice';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import ReduxProvider from './src/redux/ReduxProvider';
import { useAppSelector } from './src/redux/hooks';
import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack';

const MainNavigator = () => {
  const isLoggedIn = useAppSelector((state: any) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const checkPhoneNumber = async () => {
      const phoneNumber = await AsyncStorage.getItem('phoneNumber');
      if (phoneNumber && !isLoggedIn) {
        dispatch(login({ uid: '', phoneNumber }));
      }
    };
    checkPhoneNumber();
  }, [isLoggedIn, dispatch]);

  console.log('MainNavigator: isLoggedIn =', isLoggedIn);
  return isLoggedIn ? <AppStack /> : <AuthStack />;
};

const App = () => {
  return (
    <ReduxProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </ReduxProvider>
  );
};

export default App;
