import AsyncStorage from "@react-native-async-storage/async-storage";

/** An helper function to load token from async storage*/
export const getTokenFromStorage = async() =>  await AsyncStorage.getItem("authToken");

