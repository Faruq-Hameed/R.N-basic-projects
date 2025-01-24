import React, {useReducer} from 'react';
import { authReducer } from '../reducers/authReducer';
import trackerApi from '../apis/trackApi'
import { Alert } from 'react-native';

const AuthContext = React.createContext();
const initialState = {
  token: "",
  errorMessage: "",
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
      Alert.alert("success", response.data.message);
      dispatch({ type: "set_token", payload: response.data.token });
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
      Alert.alert("success", response.data.message);
      dispatch({ type: "set_token", payload: response.data.token });
      return true
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

  return (
    <AuthContext.Provider value={{ state, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext); // ✅ 

export default AuthProvider;