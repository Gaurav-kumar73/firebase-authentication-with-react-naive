import Colors from "@/constants/Colors";
import { auth } from "@/firebaseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, router } from "expo-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const [user, setUser] = useState(null);
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/screens/login");
    } catch (error) {
      alert("Logout failed. Try again!");
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading user...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome 👋</Text>
      <View style={styles.card}>
        <Ionicons name="person-circle-sharp" size={80} color={Colors.primary} />
        <Text style={styles.infoText}>
          Name: {user.displayName || "Not set"}
        </Text>
        <Text style={styles.infoText}>Email: {user.email}</Text>
      </View>

      <TouchableOpacity onPress={handleLogout} style={[styles.button, {backgroundColor: "red"}]}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      <View>
        <TouchableOpacity style={[styles.button, {backgroundColor: Colors.primary}]}>
          <Link href={"/screens/phoneVerification"} style={styles.buttonText}>{verified ? "Phone Number Verified" : "Verify Phone Number"}</Link>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: Colors.primary}]}>
          <Link href={"/screens/changePassword"} style={styles.buttonText}>Change Password</Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafc",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  infoText: {
    fontSize: 16,
    marginTop: 10,
    color: "#333",
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 40,
    elevation: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign:"center"
  },
  loadingText: {
    fontSize: 18,
    color: "#888",
  },
});
