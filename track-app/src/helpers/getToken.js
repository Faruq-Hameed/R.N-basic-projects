import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthContext } from "../contexts/authContext";

/** An helper function to load token from async storage*/
export const getTokenFromStorage = async() =>  await AsyncStorage.getItem("authToken");

export const removeTokenFromStorage = async() => await AsyncStorage.removeItem("authToken")
