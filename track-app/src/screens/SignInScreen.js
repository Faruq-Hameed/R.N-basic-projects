import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, Button, Input } from "@rneui/base";
import { StyleSheet, View, ActivityIndicator,
} from "react-native";
import Spacer from "../components/Spacer";
import { useAuthContext } from "../contexts/authContext";

const SignInScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state,signIn } = useAuthContext();
  
  return (
    <View style={styles.container}>
      <Spacer>
        <Text h2>Sign Up For Tracker</Text>
      </Spacer>
      <Spacer />
      <Input
        label="Email"
        style={[styles.Input]}
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
      />
      <Spacer />
      <Input
        label="Password"
        secureTextEntry
        style={[styles.Input]}
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChangeText={setPassword}
      />
      {state.errorMessage? 
      <Spacer>
      <Text h5 style={[styles.error]}>{state.errorMessage}</Text> 
      </Spacer>
      : null}
      <Button
        title="Sign In"
        onPress={
          async () => {
          const isSignInTrue = await signIn({ email, password })
          // if (isSignInTrue)  navigation.reset({
          //   //clear the stack and navigate to the Tabs screen
          //   index: 0,
          //   routes: [
          //     {
          //       name: "Tabs", //only keep the Tabs screen in the stack
          //       // params: { someParam: 'Param1' },
          //     },
          //   ],
          // })
          }
   
        }
      />
      <Spacer />
      <Button
        title=""
        type="clear" //to make it look like a link
        onPress={() => navigation.navigate("SignUp")}
      >
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
    marginBottom: 200,
  },
  Input: {
    borderWidth: 2,
  },
  links: {
    color: "primary",
  },
  error: {
    color: 'red',
  }
});

export default SignInScreen;
