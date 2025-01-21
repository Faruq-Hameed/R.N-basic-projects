import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, Button, Input } from "@rneui/base";
import { StyleSheet, View, TouchableOpacity } from "react-native";

const SignUpScreen = () => {
  const navigation = useNavigation();
  return (
    <>
      <Text h2>Sign Up For Tracker</Text>
      <Input label="Email"/>
      <Input label="Password"/>
      <Button title="Sign Up" onPress={()=> navigation.navigate('') }/>
      {/* <Button title="Go to SignIn"onPress={() => navigation.navigate("SignIn")}/> */}
    </>
  );
};

const styles = StyleSheet.create({});

export default SignUpScreen;
