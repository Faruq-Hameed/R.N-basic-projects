import { Button, Text } from "@rneui/base";
import React from "react";
import { StyleSheet, View } from "react-native";
import Spacer from "../components/Spacer";
import { useAuthContext } from "../contexts/authContext";

const AccountScreen = () => {
    const {clearToken}  = useAuthContext();
  return (
    <Spacer>
      <Text h2>Create Track</Text>
      <Button title="Sign Out" onPress={clearToken}/>
    </Spacer>
  );
};

const styles = StyleSheet.create({});

export default AccountScreen;
