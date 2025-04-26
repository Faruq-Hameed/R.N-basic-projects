import axios from "axios";
import { getTokenFromStorage } from "../helpers/asyncTokenManager";

// const createTrackApi = (token) =>
//   axios.create({
//     baseURL: "https://89ee-2c0f-2a80-a4e-d910-3973-6861-2699-4901.ngrok-free.app",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

// export default createTrackApi;
// const token = async() => await getTokenFromStorage()
// console({token})

// const token

export default axios.create({
  baseURL: "https://d615-102-89-85-55.ngrok-free.app",
  // header: {
  //   Authorization: `Bearer ${token}`,
  //   "Content-Type": "application/json",
  // }
});
