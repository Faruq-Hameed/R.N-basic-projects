import { useFocusEffect } from "@react-navigation/native";
import React from "react";

/**Custom reusable hook that accepts callBack which get called when we are about to leave a screen */
export const useOnWillBlurEvent = (onWillBlur) =>{
    useFocusEffect(
        React.useCallback(() => {
          // Do something when the screen is focused //NOT USED
          return () => {
            // Do something when the screen is unfocused
            // Useful for cleanup functions
            // / Cleanup or trigger function when screen loses focus
            onWillBlur()
          };
        }, []) 
      );
}