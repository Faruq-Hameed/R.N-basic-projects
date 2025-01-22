import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, Button, Input } from "@rneui/base";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Spacer from "../components/Spacer";

const SignInScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Spacer>
        <Text h2>Sign Up For Tracker</Text>
      </Spacer>
      <Spacer />
      <Input label="Email" style={[styles.Input]} />
      <Spacer />
      <Input label="Password" secureTextEntry style={[styles.Input]}/>
      <Button
        title="Sign In"
        onPress={() =>
          navigation.reset({
            //clear the stack and navigate to the Tabs screen
            index: 0,
            routes: [
              {
                name: "Tabs", //only keep the Tabs screen in the stack
                // params: { someParam: 'Param1' },
              },
            ],
          })
        }
      />
      <Spacer />
        <Button 
        title=""
        type="clear" //to make it look like a link
        onPress={() => navigation.navigate("SignUp")}>
          Don't have an account? Go Back to Sign up.
        </Button>
    <Spacer />
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
  Input: {
borderWidth: 2,

  },
  links: {
    color: "primary",
  },
});

export default SignInScreen;
