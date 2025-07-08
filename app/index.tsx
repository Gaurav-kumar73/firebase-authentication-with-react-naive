import Colors from "@/constants/Colors";
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function index() {
  return (
    <LinearGradient colors={["#027EF0", "#0060B8"]} style={styles.container}>
      <View style={{flex:1, justifyContent:"center", paddingBottom:25}}>
        <View style={styles.subContainer}>
        <Image source={require("@/assets/images/logo.png")} style={{width:80, height:80, resizeMode:"contain"}}/>
        <Text style={{color:"white", fontSize:30, fontWeight:"bold"}}>Welcome to spehre!</Text>
        <Text style={{color:"white", textAlign:"center"}}>Find peers, internships, and job opportunities within your college community.</Text>
      </View>

      <View style={styles.subContainer}>
        <View style={{alignItems:"center" , gap:10}}>
          <TouchableOpacity>
            <Link href={"/screens/signup"} style={[styles.button, {backgroundColor: Colors.primary, color:"white"}]}>Create Account</Link>
          </TouchableOpacity>
          <Text style={{color:"white"}}>OR</Text>
          <TouchableOpacity>
            <Link href={"/screens/login"} style={[styles.button, {backgroundColor: "white"}]}>Log In</Link>
          </TouchableOpacity>
        </View>
      </View>
      </View>

       <View style={{ paddingHorizontal: 40,}}>
        <Text style={{textAlign:"center", color:"white", fontSize:12 }}>
          By continuing, you agree to Spehre.io's{' '}
        <Text style={{ textDecorationLine: 'underline' }}>Terms of Service</Text>{' '}
          and{' '}
        <Text style={{ textDecorationLine: 'underline' }}>Privacy Policy</Text>
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom:50,
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  subContainer:{
    alignItems: "center",
    margin:30,
    gap:10
  },
  button:{
    width:330,
    paddingHorizontal:20,
    paddingVertical:15,
    borderRadius:50,
    fontWeight:"bold",
    fontSize:15,
    textAlign: "center",
    elevation:10
  }
});
