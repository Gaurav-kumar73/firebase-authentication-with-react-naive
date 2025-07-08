import Colors from "@/constants/Colors";
import { auth } from "@/firebaseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link, router } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focus, setFocus] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      await updateProfile(userCredential.user, { displayName: name.trim() }); // save name after
      alert("Signed up successfully!");
      router.replace("/screens/home");

    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already in use.");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email format.");
      } else if (error.code === "auth/weak-password") {
        alert("Password should be at least 6 characters.");
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={router.back}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={Colors.primary}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Link href={"/screens/login"} style={styles.signup}>
          Login
        </Link>
      </View>

      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View style={{ gap: 30, marginTop: 30 }}>
          <View>
            <Text style={{ fontSize: 40, fontWeight: "bold" }}>
              Create your New Account
            </Text>
            <Text style={{ color: "gray" }}>
              Enter your credentials to sign up.
            </Text>
          </View>

          {/* Form -  Text Input */}
          <View style={{ gap: 15 }}>
            {/* Name Input */}
            <View
              style={[
                styles.inputContainer,
                { borderColor: focus.name ? Colors.primary : "gray" },
              ]}
            >
              <Ionicons
                name="person-sharp"
                size={24}
                style={{ color: focus.name ? Colors.primary : "gray" }}
              />
              <TextInput
                placeholder="Name"
                placeholderTextColor="gray"
                value={name}
                onChangeText={setName}
                style={{ flex: 1 }}
                onFocus={() =>
                  setFocus({ name: true, email: false, password: false })
                }
                onBlur={() =>
                  setFocus({ name: false, email: false, password: false })
                }
              />
            </View>

            {/* Email Input */}
            <View
              style={[
                styles.inputContainer,
                { borderColor: focus.email ? Colors.primary : "gray" },
              ]}
            >
              <Ionicons
                name="mail-sharp"
                size={24}
                style={{ color: focus.email ? Colors.primary : "gray" }}
              />
              <TextInput
                placeholder="Email"
                placeholderTextColor="gray"
                value={email}
                onChangeText={setEmail}
                style={{ flex: 1 }}
                autoCapitalize="none"
                onFocus={() =>
                  setFocus({ name: false, email: true, password: false })
                }
                onBlur={() =>
                  setFocus({ name: false, email: false, password: false })
                }
              />
            </View>

            {/* Password Input with Eye Toggle */}
            <View
              style={[
                styles.inputContainer,
                { borderColor: focus.password ? Colors.primary : "gray" },
              ]}
            >
              <MaterialIcons
                name="lock"
                size={24}
                style={{ color: focus.password ? Colors.primary : "gray" }}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="gray"
                value={password}
                onChangeText={setPassword}
                style={{ flex: 1 }}
                secureTextEntry={!passwordVisible}
                autoCapitalize="none"
                onFocus={() =>
                  setFocus({ name: false, email: false, password: true })
                }
                onBlur={() =>
                  setFocus({ name: false, email: false, password: false })
                }
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                <Ionicons
                  name={passwordVisible ? "eye-sharp" : "eye-off-sharp"}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={{ textAlign: "center" }}>or signup using</Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                paddingHorizontal: 60,
                paddingVertical: 8,
                borderRadius: 10,
              }}
            >
              <Image
                source={require("@/assets/images/google.png")}
                style={{ width: 25, height: 25, resizeMode: "contain" }}
              />
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                paddingHorizontal: 60,
                paddingVertical: 8,
                borderRadius: 10,
              }}
            >
              <Image
                source={require("@/assets/images/apple.png")}
                style={{ width: 30, height: 30, resizeMode: "contain" }}
              />
            </View>
          </View>

          <Link href={"/screens/login"} style={{ textAlign: "center" }}>
            Already have an account{" "}
            <Text style={{ color: Colors.primary }}>Login</Text>?
          </Link>
        </View>

        <TouchableOpacity onPress={handleSignup}>
          <Text style={styles.confirmButton}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 30,
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
    color: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    elevation: 10,
  },
});
