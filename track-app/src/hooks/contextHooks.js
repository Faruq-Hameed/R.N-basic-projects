import { useContext } from "react";
import { LocationContext } from "../contexts/locationContext";
import { AuthContext } from "../contexts/authContext";

/** custom hook to access location state*/
const useLocationContext = () => useContext(LocationContext);

/**custom hook to access auth state  */
const useAuthContext = () => useContext(AuthContext); // ✅ so I will just call useAuthContext() anywhere i
// need to access the state instead of useContext(AuthContext) everywhere

export { useLocationContext, useAuthContext };
