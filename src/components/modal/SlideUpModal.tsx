import React, { useEffect, useRef } from 'react';
import { Animated, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Styles from './style';
import { useTheme } from '../../hooks/themeContext';

interface SlideUpModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const SlideUpModal: React.FC<SlideUpModalProps> = ({ isVisible, onClose }) => {
  const {theme} = useTheme();
  const slideAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => onClose()); // Call onClose after animation completes
    }
  }, [isVisible]);

  const translateY = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [700, 0], // Adjust this value to control how high the modal will slide
  });

  return (
    <View style={Styles.container}>
      {isVisible && (
        <TouchableOpacity style={Styles.overlay} onPress={onClose} />
      )}
      <Animated.View
        style={[
          Styles.modal,
          { transform: [{ translateY }], backgroundColor:theme.backgroundTab },
        ]}
      >
        <Text>This is your modal content</Text>
        <TouchableOpacity onPress={onClose} style={Styles.closeButton}>
          <Text>Close Modal</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default SlideUpModal;
