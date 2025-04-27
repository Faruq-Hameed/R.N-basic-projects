import { useFocusEffect } from '@react-navigation/native';
import React from 'react';

/** Custom reusable hook that accepts a callback which gets called every time the screen comes into focus */
export const useOnFocusEvent = (onFocus) => {
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      onFocus(); // Trigger it immediately when screen gains focus

      return undefined; // No cleanup needed for focus
    }, []) // dependency
  );
};
