import { useContext } from "react";
import LocationContext from "../contexts/locationContext";

export const useLocationContext = ()=> useContext(LocationContext)
