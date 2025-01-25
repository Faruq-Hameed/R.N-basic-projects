import React from "react";
import { Text, StyleSheet, View, Button, ActivityIndicator } from "react-native";
import { useAuthContext } from "../contexts/authContext";

const TrackListScreen = () =>{
    const {state} = useAuthContext()
    
    // if (!state.loading) {
    //     return <ActivityIndicator size="large" color="#0000ff" style={{margin: "auto"}} />;
    //   }
    return (
        <View>
        <Text style={styles.header}>Track List Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({});

export default TrackListScreen;