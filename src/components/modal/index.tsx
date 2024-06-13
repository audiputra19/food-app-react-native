import { View, Text, Modal, Button, TouchableOpacity, Animated, Easing } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import Styles from './style'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigators/Main';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../store/cart';

interface Props {
    title: string,
    dialog: string,
}

const ModalDialog: FC<Props> = ({title, dialog}) => {
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const navigation = useNavigation();
    const route = useRoute<RouteProp<RootStackParamList, 'Cart'>>();
    const slideAnim = useRef(new Animated.Value(-600)).current;

    useEffect(() => {
        if (route.params?.showModal) {
            setIsModalVisible(true);
            navigation.setParams({ showModal: false } as any);
            
            Animated.spring(slideAnim, {
              toValue: 0,
              friction: 7,
              tension: 40,
              useNativeDriver: true,
            }).start();// Reset parameter after showing modal
        }
    }, [route.params]);

    const closeModal = () => {
      Animated.timing(slideAnim, {
        toValue: -600,
        duration: 200, // Shorter duration for quicker closing
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start(() => setIsModalVisible(false));
    }
  
    const handleClearCart = () => {
        dispatch(clearCart());
        setIsModalVisible(false);
    }  

  return (
    <View>
      <Modal
          transparent={true}
          visible={isModalVisible} // Use local state for modal visibility
          onRequestClose={closeModal}
        >
          <TouchableOpacity 
            activeOpacity={1}
            style={Styles.modalContainer} 
            onPress={() => setIsModalVisible(false)}
            >
            <Animated.View style={[Styles.modalContent, { transform: [{ translateY: slideAnim }] }]}>
              <Text style={Styles.modalTitle}>{title}</Text>
              <Text style={Styles.modalText}>{dialog}</Text>
              <View style={Styles.modalButtonContainer}>
                <TouchableOpacity 
                    onPress={closeModal} 
                    style={Styles.cancelBtn}
                >
                    <Text style={Styles.cancelTxt}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={handleClearCart} 
                    style={Styles.okBtn}    
                >
                    <Text style={Styles.okTxt}>Remove</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableOpacity>
        </Modal>
    </View>
  )
}

export default ModalDialog