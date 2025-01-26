import { useFocusEffect } from "@react-navigation/native";

export const useOnWillBlurEvent = (onWillBlur) =>{
    useFocusEffect(
        React.useCallback(() => {
          // Do something when the screen is focused //NOT USED
          return () => {
            // Do something when the screen is unfocused
            // Useful for cleanup functions
            onWillBlur
          };
        }, [])
      );
}