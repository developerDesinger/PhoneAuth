import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SignUpScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  const handleSignUp = async () => {
    setLoading(true);
    try {
    
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      Alert.alert('Success', 'OTP has been sent to your phone number');
      navigation.navigate('VerifyOTP', { confirmation, phone: phoneNumber });
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      Alert.alert('Error', 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="#4c669f" />
      <View style={styles.gradient}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.headerContainer}>
            <Text style={styles.welcomeText}>Create Account</Text>
            <Text style={styles.subtitleText}>
              Enter your phone number to sign up
            </Text>
          </View>

          {/* Sign Up Form Container */}
          <View style={styles.formContainer}>
            {/* Phone Number Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="+92XXXXXXXXXX"
                  placeholderTextColor="#999"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  maxLength={13}
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleSignUp}
              activeOpacity={0.8}
              disabled={loading}
            >
              <View style={styles.buttonGradient}>
                <Text style={styles.loginButtonText}>{loading ? 'Sending OTP...' : 'Sign Up'}</Text>
              </View>
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>
                By signing up, you agree to our Terms of Service and Privacy Policy
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    backgroundColor: '#4c669f',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: wp('8%'),
    paddingVertical: hp('5%'),
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: hp('5%'),
  },
  welcomeText: {
    fontSize: wp('8%'),
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: hp('1%'),
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: wp('4%'),
    color: '#e8e8e8',
    textAlign: 'center',
    lineHeight: wp('5.5%'),
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: wp('6%'),
    padding: wp('8%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: hp('3%'),
  },
  inputLabel: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: '#333',
    marginBottom: hp('1%'),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: wp('3%'),
    backgroundColor: '#f8f9fa',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('0.5%'),
  },
  textInput: {
    flex: 1,
    fontSize: wp('4%'),
    color: '#333',
    paddingVertical: hp('2%'),
  },
  loginButton: {
    marginTop: hp('2%'),
    marginBottom: hp('3%'),
    borderRadius: wp('3%'),
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: hp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff6b6b',
    borderRadius: wp('3%'),
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
  },
  footerContainer: {
    alignItems: 'center',
    paddingTop: hp('1%'),
  },
  footerText: {
    fontSize: wp('2.8%'),
    color: '#999',
    textAlign: 'center',
    lineHeight: wp('4%'),
  },
});

export default SignUpScreen;
