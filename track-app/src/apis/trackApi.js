import axios from "axios";

const createTrackApi = (token) =>
  axios.create({
    baseURL: "https://84f8-102-89-85-55.ngrok-free.app",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export default createTrackApi;

// export default axios.create({
//   baseURL: "https://d615-102-89-85-55.ngrok-free.app",
// });
