import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, Button, Input } from "@rneui/base";
import { StyleSheet, View } from "react-native";
import Spacer from "../components/Spacer";
import { useAuthContext } from "../hooks/contextHooks";

import { useOnWillBlurEvent } from "../hooks/useOnWillBlurEvent";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const { state, signUp, clearErrorMessage } = useAuthContext();
  useOnWillBlurEvent(clearErrorMessage);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const body = {
    email,
    password,
    phonenumber,
    firstname,
    lastname,
  };
  return (
    <View style={styles.container}>
      <Spacer>
        <Text h2>Sign Up For Tracker</Text>
      </Spacer>
      <Spacer />
      <Input label="Email" value={email} onChangeText={setEmail} />
      <Input label="Password" value={password} onChangeText={setPassword} />
      <Input label="Firstname" value={firstname} onChangeText={setFirstname} />
      <Input label="Lastname" value={lastname} onChangeText={setLastname} />
      <Input
        label="Phonenumber"
        value={phonenumber}
        onChangeText={setPhonenumber}
      />
      {state.errorMessage ? ( //display error message if there was an error during signUp
        <Spacer>
          <Text h5 style={[styles.error]}>
            {state.errorMessage}{" "}
          </Text>
        </Spacer>
      ) : null}
      <Button title="Sign Up" onPress={() => signUp(body)} />
      <Spacer />
      {/* <Button type="outline"> */}
      <Button
        title="Already have an account? Go Back to Sign In."
        type="clear"
        onPress={() => navigation.navigate("SignIn")}
      />
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
    marginBottom: 80,
  },
  error: {
    color: "red",
  },
});

export default SignUpScreen;
