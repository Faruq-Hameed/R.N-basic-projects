import { Button, Text } from "@rneui/base";
import React from "react";
import { StyleSheet, View } from "react-native";
import Spacer from "../components/Spacer";
import { useAuthContext } from "../contexts/authContext";
import { SafeAreaView } from "react-native-safe-area-context";

const AccountScreen = () => {
    const {clearToken}  = useAuthContext();
  return (
    //Use safeAreaView to
    <SafeAreaView> 
      <Spacer>
      <Text h2>Create Track</Text>
      <Spacer />
      <Button title="Sign Out" onPress={clearToken}/>
    </Spacer>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({});

export default AccountScreen;
