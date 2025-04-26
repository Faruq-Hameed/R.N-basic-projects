import React from "react";
import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
import { useAuthContext } from "../contexts/authContext";

import { Button } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { removeTokenFromStorage } from "../helpers/asyncTokenManager";

const TrackListScreen = () => {
  const { state, setToken } = useAuthContext();
  const navigation = useNavigation();

  return (
    <View>
      <Text style={styles.header}>Track List Screen</Text>
      <Button title='Go to track details' 
        onPress={() => navigation.navigate("TrackDetail")}
       type="clear"
        
       />
    </View>
  );
};

const styles = StyleSheet.create({});

export default TrackListScreen;
