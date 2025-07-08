import Colors from '@/constants/Colors';
import { auth } from "@/firebaseConfig";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New password and confirmation do not match.");
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "User not logged in.");
        return;
      }

      // Re-authenticate
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);
      Alert.alert("Success", "Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      router.replace("/screens/home");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.message);
    }
  };                        

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <TouchableOpacity onPress={router.back}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} style={styles.backIcon} />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => router.replace("/screens/login")} style={styles.signup}>
          <Text style={{ color: Colors.primary }}>Log In</Text>
        </TouchableOpacity> */}
      </View>

      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View style={{ gap: 30, marginTop: 30 }}>
          <View>
            <Text style={{ fontSize: 40, fontWeight: "bold" }}>Choose new password</Text>
            <Text style={{ color: "gray" }}>Choose a new password to login</Text>
          </View>

          {/* Inputs */}
          <View style={{ gap: 15 }}>

            {/* Current Password */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="lock" size={24} color="gray" />
              <TextInput
                placeholder="Current Password"
                placeholderTextColor={"gray"}
                style={{ flex: 1 }}
                secureTextEntry={!passwordVisible}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                autoCapitalize='none'
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                <Ionicons name={passwordVisible ? "eye-sharp" : "eye-off-sharp"} size={20} color="gray" />
              </TouchableOpacity>
            </View>

            {/* New Password */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="lock" size={24} color="gray" />
              <TextInput
                placeholder="New Password"
                placeholderTextColor={"gray"}
                style={{ flex: 1 }}
                secureTextEntry={!newPasswordVisible}
                value={newPassword}
                onChangeText={setNewPassword}
                autoCapitalize='none'
              />
              <TouchableOpacity onPress={() => setNewPasswordVisible(!newPasswordVisible)}>
                <Ionicons name={newPasswordVisible ? "eye-sharp" : "eye-off-sharp"} size={20} color="gray" />
              </TouchableOpacity>
            </View>

            {/* Confirm Password */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="lock" size={24} color="gray" />
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor={"gray"}
                style={{ flex: 1 }}
                secureTextEntry={!confirmPasswordVisible}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize='none'
              />
              <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                <Ionicons name={confirmPasswordVisible ? "eye-sharp" : "eye-off-sharp"} size={20} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={handleChangePassword} style={styles.confirmButton}>
          <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: 15 }}>
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 30
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
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  inputContainer: {
    borderWidth: 1.5,
    borderColor: "gray",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  confirmButton: {
    borderRadius: 50,
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 10,
  },
});
