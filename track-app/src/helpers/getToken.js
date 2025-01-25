import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useAuthContext } from "../contexts/authContext";

export const getTokenFromStorage = async() =>  await AsyncStorage.getItem("authToken");

