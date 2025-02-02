import AsyncStorage from "@react-native-async-storage/async-storage";

/** An helper function to load token from async storage*/
export const getTokenFromStorage = async() =>  await AsyncStorage.getItem("authToken");

/** An asynchronous helper function to remove token from async storage */
export const removeTokenFromStorage = async() => await AsyncStorage.removeItem("authToken")
