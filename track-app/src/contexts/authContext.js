import React, {useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

import { authReducer } from '../reducers/authReducer';
import trackerApi from '../apis/trackApi'

const AuthContext = React.createContext();
const initialState = {
  token: "",
  errorMessage: "",
  loading: false
};
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const signUp = async ({
    firstname,
    lastname,
    email,
    phonenumber,
  }) => {
    try {
      const response = await trackerApi.post("/auth/signup", {
        firstname,
        lastname,
        email,
        phonenumber,
      });
      const token = response.data.token 
      await AsyncStorage.setItem('authToken', token);
      Alert.alert("success", response.data.message);
      dispatch({ type: "set_token", payload: token});
    } catch (err) {
      //   dispatch({ type: "set_error_message", payload: err.message });
      dispatch({
        type: "set_error_message",
        payload: "Something went wrong in signUp",
      });
    }
  };

  const signIn = async ({ email, password }) => {
    try {
      const response = await trackerApi.post(`/auth/signin`, {
        email,
        password,
      });
      const token = response.data.token 
      await AsyncStorage.setItem('authToken', token);
      Alert.alert("success", response.data.message);
      dispatch({ type: "set_token", payload:token });
      return true //added for navigation purposes earlier
    } catch (error) {
      let message = ''
      if(error.response){ // if error response
        message = error.response.data?.message || "An unknown error occurred from server."
      }
      else{ //if network from device is not available
        message = "Unable to connect. Please try again later."
      }
        dispatch({ type: "set_error_message", payload: message });
    }
    return false
  };

  const setToken = (token) => {
    dispatch({ type: "set_token", payload: token });
  }
  return (
    <AuthContext.Provider value={{ state, signIn, signUp, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

/**custom hook to access auth state  */
export const useAuthContext = () => React.useContext(AuthContext); // ✅ so I will just call useAuthContext anywhere i 
// need to access the state instead of useContext(AuthContext) everywhere

export default AuthProvider;