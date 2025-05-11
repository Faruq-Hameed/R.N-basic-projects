import axios from "axios";
import { getTokenFromStorage } from "../helpers/asyncTokenManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = axios.create({
  baseURL: "https://d615-102-89-85-55.ngrok-free.app",
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => { 
    return Promise.reject(err);
  }
);

export default instance;
