import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, Button, Input } from "@rneui/base";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Spacer from "../components/Spacer";

const SignUpScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
    <Spacer>
    <Text h2>Sign Up For Tracker</Text>
    </Spacer>
      <Spacer/>
      <Input label="Email"/>
      <Spacer/>
      <Input label="Password"/>
      <Button title="Sign Up" onPress={()=>
        navigation.reset({ //clear the stack and navigate to the Tabs screen
          index: 0,
          routes: [
            {
              name: 'Tabs', //only keep the Tabs screen in the stack
              // params: { someParam: 'Param1' },
            },
          ],
        })
       }/>
       <Spacer/>
       <Spacer/>
      <Button title="Go to SignIn"onPress={() => navigation.navigate("SignIn")}/>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    // alignItems: ""
    marginBottom: 280,
  },
});

export default SignUpScreen;
