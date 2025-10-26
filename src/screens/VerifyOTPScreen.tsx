import React, { useRef, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
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
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type VerifyOTPRouteParams = {
  confirmation: any;
  phone: string;
};
type VerifyOTPRouteProp = RouteProp<{ VerifyOTP: VerifyOTPRouteParams }, 'VerifyOTP'>;

const VerifyOTPScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = Array.from({ length: 6 }, () => useRef<TextInput>(null));
  const navigation = useNavigation();
  const route = useRoute<VerifyOTPRouteProp>();
  const { confirmation, phone } = route.params || {};
  const [loading, setLoading] = useState(false);

  const handleChange = (text: string, index: number) => {
    if (/^\d*$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (text && index < 5) {
        inputs[index + 1].current?.focus();
      }
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length !== 6) {
      Alert.alert('Error', 'Please enter all 6 digits');
      return;
    }

    setLoading(true);
    try {
      // 🔹 Confirm the code with Firebase Auth
      const result = await confirmation.confirm(code);
      const user = result.user;

      // 🔹 Save or update user in Firestore
      await firestore().collection('users').doc(user.uid).set({
        id: user.uid,
        phoneNumber: user.phoneNumber,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });


      Alert.alert('Success', 'Phone number verified successfully!');
      navigation.navigate('Login' as never);

    } catch (error: any) {
      console.error('❌ OTP verification error:', error);
      Alert.alert('Failed', 'OTP verification failed');
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
            <Text style={styles.welcomeText}>Verify OTP</Text>
            <Text style={styles.subtitleText}>
              Enter the 6-digit code sent to your phone
            </Text>
          </View>

          {/* OTP Input Fields */}
          <View style={styles.formContainer}>
            <View style={styles.otpInputContainer}>
              {otp.map((digit, idx) => (
                <TextInput
                  key={idx}
                  ref={inputs[idx]}
                  style={styles.otpInput}
                  value={digit}
                  onChangeText={(text) => handleChange(text, idx)}
                  keyboardType="number-pad"
                  maxLength={1}
                  returnKeyType={idx === 5 ? 'done' : 'next'}
                />
              ))}
            </View>

            {/* Verify Button */}
            <TouchableOpacity
              style={[styles.loginButton, loading && { opacity: 0.6 }]}
              onPress={handleVerify}
              activeOpacity={0.8}
              disabled={loading}
            >
              <View style={styles.buttonGradient}>
                <Text style={styles.loginButtonText}>
                  {loading ? 'Verifying...' : 'Verify'}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>
                Didn’t receive the code? Resend
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
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('3%'),
  },
  otpInput: {
    width: wp('10%'),
    height: hp('6%'),
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: wp('2%'),
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
    fontSize: wp('5%'),
    color: '#333',
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

export default VerifyOTPScreen;
