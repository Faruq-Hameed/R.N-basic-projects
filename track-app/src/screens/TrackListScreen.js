import React from "react";
import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
import { useAuthContext } from "../contexts/authContext";
import { Button } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { removeTokenFromStorage } from "../helpers/asyncTokenManager";

const TrackListScreen = () => {
  const { state, setToken } = useAuthContext();
  console.log({state})
  const navigation = useNavigation();
  const handleSignOut = async () => {
    await removeTokenFromStorage();
    setToken(null);
  };

  return (
    <View>
      <Text style={styles.header}>Track List Screen</Text>
      <Button title="signOut" type="clear" onPress={handleSignOut} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default TrackListScreen;
