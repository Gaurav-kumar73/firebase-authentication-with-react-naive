import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OtpVerification() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (text.length > 1) {
      text = text.slice(-1);
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={router.back}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} style={styles.backIcon} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={{ gap: 30, marginTop: 50 }}>
          <View>
            <Text style={styles.title}>Confirm your number</Text>
            <Text style={styles.subtitle}>
              Enter the code we sent to the number ending with 0957
            </Text>
          </View>

          {/* OTP Inputs */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputs.current[index] = ref)}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                style={styles.input}
                keyboardType="number-pad"
                maxLength={1}
              />
            ))}
          </View>
        </View>

        <View>
          <Link href="/screens/home" style={styles.confirmButton}>
            Confirm
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backIcon: {
    borderWidth: 1.5,
    borderRadius: 50,
    borderColor: Colors.primary,
    padding: 5,
  },
  signup: {
    borderWidth: 1.5,
    borderRadius: 50,
    borderColor: Colors.primary,
    color: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'gray',
    width: 250,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 30,
    padding: 12,
    textAlign: 'center',
    fontSize: 20,
    width: 70,
    height: 50,
  },
  confirmButton: {
    borderRadius: 50,
    backgroundColor: Colors.primary,
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    elevation: 10,
  },
});
