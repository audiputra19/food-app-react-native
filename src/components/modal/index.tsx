import { View, Text, Modal, Button, TouchableOpacity } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
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

    useEffect(() => {
        if (route.params?.showModal) {
            setIsModalVisible(true);
            navigation.setParams({ showModal: false } as any); // Reset parameter after showing modal
        }
    }, [route.params]);
  
    const handleClearCart = () => {
        dispatch(clearCart());
        setIsModalVisible(false);
    }  

  return (
    <View>
      <Modal
          transparent={true}
          animationType="slide"
          visible={isModalVisible} // Use local state for modal visibility
          onRequestClose={() => setIsModalVisible(false)}
        >
          <TouchableOpacity 
            activeOpacity={1}
            style={Styles.modalContainer} 
            onPress={() => setIsModalVisible(false)}
            >
            <View style={Styles.modalContent}>
              <Text style={Styles.modalTitle}>{title}</Text>
              <Text style={Styles.modalText}>{dialog}</Text>
              <View style={Styles.modalButtonContainer}>
                <TouchableOpacity 
                    onPress={() => setIsModalVisible(false)} 
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
            </View>
          </TouchableOpacity>
        </Modal>
    </View>
  )
}

export default ModalDialog