import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AuthProvider, { useAuthContext } from "../contexts/authContext";
import { getTokenFromStorage } from "../helpers/asyncTokenManager";
import { ActivityIndicator, Alert } from "react-native";

/**  ResolveScreen to avoid using auth Screen as flash screen while async storage is still fetching data */
const ResolveScreen = ({ onResolve }) => {
  const { setToken } = useAuthContext();
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    //load the token from storage if available and store in the state
    const loadTokenFromStorage = async () => {
      try {
        const token = await getTokenFromStorage();
        if (token) {
          setToken(token);
        }
      } catch (err) {
        Alert.alert("Error", err.message);
      } finally {
        setLoading(false);
        onResolve(); //Call the prop to Notify parent when done
      }
    };
    loadTokenFromStorage();
  }, []);
  if (loading) {
    // return (
    //   <ActivityIndicator
    //     size="large"
    //     color="#0000ff"
    //     style={{ margin: "auto" }}
    //   />
    // );
  }
  return null; // The screen render nothing (i.e another screen will render )once the token resolution is done
};

export default ResolveScreen;