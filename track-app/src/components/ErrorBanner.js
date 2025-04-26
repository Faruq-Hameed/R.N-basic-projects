import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native"; 

const ErrorBanner = ({ message, onClear }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; //  an animated value starting at 0
console.log({message})
  useEffect(() => {
    //When component mounts, start animation
    Animated.timing(fadeAnim, {
      toValue: 1,            // Animate from 0 -> 1
      duration: 10000,       // Over 10 seconds
      useNativeDriver: false, // false because we animate color (not pure transforms)
    }).start(() => {
      onClear(); // After animation ends, clear the error
    });
  }, []);

  // Animate background color from red -> white
  const backgroundColor = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#f8d7da', '#ffffff'],
  });

  // 👻 Animate opacity from fully visible -> semi-visible -> invisible
  const opacity = fadeAnim.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [1, 0.5, 0],
  });

  return (
    <Animated.View style={[styles.errorContainer, { backgroundColor, opacity }]}>
      {/* Error Content: Text + Close Button */}
      <View style={styles.errorContent}>
        <Text style={styles.errorText}>{message}</Text>

        {/* ❌ Close Button */}
        <TouchableOpacity onPress={onClear} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
errorContainer: {
    position: 'absolute',    // 📌 Float above everything
    top: 20,
    left: 20,
    right: 20,
    padding: 15,
    borderColor: '#f5c6cb',   // 🎨 Light red border
    borderWidth: 1,
    borderRadius: 8,
    zIndex: 999,             // 🚀 Make sure it's on top of all other components
  },
  
  errorContent: {
    flexDirection: 'row',     // 👉 Place Text and Button side by side
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  errorText: {
    color: '#721c24',         // 🔴 Dark red text
    fontWeight: 'bold',
    flex: 1,                  // 📏 Make text take all available space
  },
  
  closeButton: {
    marginLeft: 10,           // 📏 Small gap between text and button
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#f5c6cb', // 🎨 Slightly pink background
    borderRadius: 5,          // 🎨 Rounded button
  },
  
  closeButtonText: {
    color: '#721c24',         // 🔴 Dark red X
    fontWeight: 'bold',
  },
})

export default ErrorBanner