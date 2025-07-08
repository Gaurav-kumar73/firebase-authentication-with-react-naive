import Colors from "@/constants/Colors";
import {
  auth,
  GoogleAuthProvider,
  signInWithCredential,
} from "@/firebaseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Google from "expo-auth-session/providers/google";
import { Link, router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focus, setFocus] = useState({
    email: false,
    password: false,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Please fill all fields!");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      alert("Logged in successfully!");
      router.replace("/screens/home"); // Navigate after successful login
    } catch (error) {
      // User-friendly error handling
      if (error.code === "auth/invalid-email") {
        alert("Invalid email format.");
      } else if (error.code === "auth/invalid-credential") {
        alert("Email or Password is wrong.");
      } else if (error.code === "auth/user-not-found") {
        alert("No user found with this email.");
      } else if (error.code === "auth/wrong-password") {
        alert("Incorrect password.");
      } else {
        alert(error.message);
      }
    }
  };

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "253725383536-6qqsf896pjo12mcqcf3bt8gh2l1b5cv5.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          alert("Logged in successfully!");
          router.replace("/screens/home"); // Navigate after successful login
        })
        .catch((error) => {
          console.error(error);
          Alert.alert("Error", "Google Sign-in failed");
        });
    }
  }, [response]);

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
        <Link href={"/screens/signup"} style={styles.signup}>
          Sign up
        </Link>
      </View>

      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View style={{ gap: 30, marginTop: 30 }}>
          <View>
            <Text style={{ fontSize: 40, fontWeight: "bold" }}>
              Login to your account
            </Text>
            <Text style={{ color: "gray" }}>
              Enter your credentials to sign in.
            </Text>
          </View>

          {/* Form -  Text Input */}
          <View style={{ gap: 15 }}>
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
                onFocus={() => setFocus({ email: true, password: false })}
                onBlur={() => setFocus({ email: false, password: false })}
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
                onFocus={() => setFocus({ email: false, password: true })}
                onBlur={() => setFocus({ email: false, password: false })}
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
              <Text style={{color:Colors.primary, textAlign:"right"}}>Forgot Password?</Text>
          </View>

          <Text style={{ textAlign: "center" }}>or login using</Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => promptAsync()}
              disabled={!request}
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
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => promptAsync()}
              disabled={!request}
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
            </TouchableOpacity>
          </View>

          <Link href={"/screens/signup"} style={{ textAlign: "center" }}>
            Dont't have an account{" "}
            <Text style={{ color: Colors.primary }}>Sign up</Text>?
          </Link>
        </View>

        <TouchableOpacity onPress={handleLogin}>
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
