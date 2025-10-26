import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../config/firebase';
import { useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = () => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem('phoneNumber'); // Remove phone number from AsyncStorage
      dispatch(logout());
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' as never }],
      });
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'Failed to sign out');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4c669f" />
      <View style={styles.card}>
        <View style={styles.solidHeader}>
          <Text style={styles.title}>Welcome Home!</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.infoTitle}>Your Dashboard</Text>
          <Text style={styles.info}>This is some dummy info for demonstration purposes. You can add your own content here.</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4c669f',
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('6%'),
  },
  card: {
    width: '100%',
    borderRadius: wp('6%'),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  solidHeader: {
    width: '100%',
    paddingVertical: hp('4%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: wp('6%'),
    borderTopRightRadius: wp('6%'),
    backgroundColor: '#3b5998',
  },
  title: {
    fontSize: wp('7%'),
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  content: {
    padding: wp('7%'),
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: wp('5%'),
    fontWeight: '600',
    color: '#4c669f',
    marginBottom: hp('1.5%'),
  },
  info: {
    fontSize: wp('4%'),
    color: '#333',
    textAlign: 'center',
    marginBottom: hp('3%'),
    lineHeight: wp('6%'),
  },
  logoutButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: wp('3%'),
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('12%'),
    alignItems: 'center',
    marginTop: hp('1%'),
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  logoutText: {
    color: '#fff',
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default HomeScreen;
