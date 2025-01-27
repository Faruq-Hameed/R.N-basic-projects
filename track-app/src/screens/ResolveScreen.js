import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AuthProvider, { useAuthContext } from "../contexts/authContext";
import { getTokenFromStorage } from "../helpers/asyncTokenManager";
import { ActivityIndicator, Alert } from "react-native";


/** ResolveScreen Component
 * ResolveScreen to avoid using auth Screen as flash screen while async storage is still fetching data */
/**
 *
 * This component is responsible for fetching the token from Async Storage and updating the authentication state.
 * It ensures the app does not render the Auth flow or the main Tab flow prematurely, avoiding a " auth or tab screen as flash screen"
 * effect during the token fetching process from.
 *
 * Props:
 * @param {Function} onResolve - A callback function provided by the parent component to be executed 
 *                               once the token resolution is complete.
 *
 * Behavior:
 * - While loading, the component displays an `ActivityIndicator`.
 * - It retrieves the token from Async Storage, updates the authentication context, and notifies the parent when done.
 * - Once token resolution is complete, the component renders `null`, allowing the parent to decide the next screen.
 *
 * Usage Example:
 * <ResolveScreen onResolve={() => setIsResolved(true)} />
 *
 * Notes:
 * - Ensure the `onResolve` prop is provided for proper integration with the parent component.
 * - Customize the `ActivityIndicator` styling or behavior if needed.
 */

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
    return ( //if loading, this activity indicator will be shown
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={{ margin: "auto" }}
      />
    );
  }
  return null; // The screen render nothing (i.e another screen will render )once the token resolution is done
};

export default ResolveScreen;