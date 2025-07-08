import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PhoneVerification() {
  return (
    <SafeAreaView style={styles.container}>
        <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
            <TouchableOpacity onPress={router.back}>
                <Ionicons name="arrow-back" size={24} color={Colors.primary} style={styles.backIcon}/>
            </TouchableOpacity>
         </View>

        <View style={{flex:1, justifyContent:"space-between"}}>
            <View style={{gap:30, marginTop:50}}>
                <View>
                    <Text style={{fontSize: 40, fontWeight:"bold"}}>Enter your phone number</Text>
                    <Text style={{color:"gray"}}>We will send an OTP verification to you.</Text>
                </View>

                {/* Text Input */}
                <View style={{gap:15}}>
                    <View style={[styles.inputContainer, {borderColor:Colors.primary}]}>
                        <Text>+91</Text>
                        <View style={{borderWidth:1, height:28, marginHorizontal:10, borderColor:Colors.primary}}></View>
                        <TextInput placeholder='Phone Number' placeholderTextColor={"gray"} style={{flex:1}} keyboardType='phone-pad' />
                    </View>
                </View>

            </View>

            <View>
                <Link href={"/screens/otpVerification"} style={styles.confirmButton}>Confirm</Link>
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "white",
        flex:1,
        padding:30
    },
    backIcon:{
        borderWidth:1.5,
        borderRadius: 50,
        borderColor: Colors.primary,
        padding:5,
    },
    signup:{
        borderWidth:1.5,
        borderRadius: 50,
        borderColor: Colors.primary,
        color: Colors.primary,
        paddingHorizontal:20,
        paddingVertical:8
    },
    inputContainer:{
        borderWidth: 1.5,
        borderColor: "gray",
        borderRadius: 12,
        flexDirection:"row",
        alignItems:"center",
        // gap:8,
        paddingHorizontal:14,
        paddingVertical: 4
    },
    confirmButton:{
        borderRadius: 50,
        backgroundColor: Colors.primary,
        color: "white",
        paddingHorizontal:20,
        paddingVertical:15,
        textAlign:"center",
        fontWeight: "bold",
        fontSize:15,
        elevation:10
    }
})