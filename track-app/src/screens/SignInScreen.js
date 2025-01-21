import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, StyleSheet, View, Button, Touchable, TouchableOpacity } from "react-native";

const SignInScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text style={styles.header}>Sign In Screen</Text>
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.navigate("SignUp")}
      >
       <Text> Go to SignUp</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SignInScreen;