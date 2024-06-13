import React, { useEffect, useRef } from 'react';
import { Animated, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Styles from './style';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigators/Main';

interface AlertProps {
  message: string;
  visible: boolean;
  onClose: () => void;
  marginBottom?: number;
  marginHorizontal?: number;
}
type ProductListScreenProp = StackNavigationProp<RootStackParamList, 'Home'>
const Alert: React.FC<AlertProps> = ({ 
  message, 
  visible, 
  onClose, 
  marginBottom = 0, 
  marginHorizontal = 0
}) => {
  const navigation = useNavigation<ProductListScreenProp>();  
  const slideAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : 200,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 20,
      onPanResponderMove: Animated.event(
        [
          null,
          { dy: slideAnim }
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gestureState) => {
        if (Math.abs(gestureState.dy) > 50) {
          Animated.timing(slideAnim, {
            toValue: gestureState.dy > 0 ? 200 : -200,
            duration: 300,
            useNativeDriver: true,
          }).start(() => onClose());
        } else {
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const link = () => {
    switch (message) {
      case 'Transaction successful':
        return (
          <TouchableOpacity 
            onPress={() => navigation.navigate('TabMain', { screen: 'History' })}
          >
            <Text style={Styles.viewTxt}>View</Text>
          </TouchableOpacity>
        );
      default:
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart', { showModal: false })}
          >
            <Text style={Styles.viewTxt}>View</Text>
          </TouchableOpacity>
        );          
    }
  }

  return (
    <Animated.View 
      style={[
        Styles.alert, 
        { 
          transform: [{ translateY: slideAnim }], 
          marginBottom: marginBottom, 
          marginHorizontal: marginHorizontal, 
        }
      ]}
      {...panResponder.panHandlers}  
    >
        <View style={Styles.messageWrap}>
            <Text style={Styles.alertTxt}>{message}</Text>
            {link()}
        </View>
    </Animated.View>
  );
};

export default Alert;
