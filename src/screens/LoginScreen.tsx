import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const LoginScreen = () => {
    const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+92');

  const handleLogin = () => {
    navigation.navigate('Home' as never);
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp' as never);
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
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <Text style={styles.subtitleText}>
              Please enter your phone number to continue
            </Text>
          </View>

          {/* Login Form Container */}
          <View style={styles.formContainer}>
            {/* Phone Number Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="+923XXXXXXXXX"
                  placeholderTextColor="#999"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  maxLength={13}
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <View style={styles.buttonGradient}>
                <Text style={styles.loginButtonText}>Login</Text>
              </View>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <TouchableOpacity onPress={handleSignUp} activeOpacity={0.7}>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>
                By continuing, you agree to our Terms of Service and Privacy Policy
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
  countryCode: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: '#333',
    paddingRight: wp('2%'),
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
    marginRight: wp('2%'),
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
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  signUpText: {
    fontSize: wp('3.5%'),
    color: '#666',
  },
  signUpLink: {
    fontSize: wp('3.5%'),
    color: '#3b5998',
    fontWeight: '600',
    textDecorationLine: 'underline',
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

export default LoginScreen;