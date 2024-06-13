import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Styles from './style'
import { COLORS } from '../../../themes/variables/colors'
import { useTheme } from '../../../hooks/themeContext'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { addToHistory } from '../../../store/history'
import { v4 as uuidv4 } from 'uuid'
import { clearCart } from '../../../store/cart'
import Alert from '../../alert'

const { width } = Dimensions.get('window');
const DOT_SIZE = 3;
const DOT_SPACING = 8;

const PurchaseBar = () => {
  const {theme} = useTheme();  
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const numberOfDots = Math.floor(width / (DOT_SIZE + DOT_SPACING));
  const dispatch = useDispatch();
  const prod = useSelector((state: RootState) => state.cart.items);
  const [showAlert, setShowAlert] = useState(false);
  const [showMessage, setShowMessage] = useState('');

  const handleAddHistory = () => {
    const now = new Date();
    const randomID = Math.random().toString(36).substr(2, 9);
    const newProduct = {
        id: randomID,
        value: prod,
        date: now
    }

    dispatch(addToHistory(newProduct));
    dispatch(clearCart());
    setShowAlert(true);
    setShowMessage('Transaction successful');
    setTimeout(() => {
        setShowAlert(false);
    }, 3000);
  }

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <View style={[Styles.sticky, {backgroundColor:theme.backgroundTab}]}>
        <View style={Styles.container}>
            <View style={[Styles.subTotalWrap, {marginBottom:15}]}>
                <Text style={[Styles.subTotalTxt, {color:COLORS.white}]}>Subtotal</Text>
                <Text style={[Styles.subTotal, {color:COLORS.white}]}>Rp. {totalPrice.toLocaleString('id-ID')}</Text>
            </View>
            <View style={[Styles.subTotalWrap, {marginBottom:20}]}>
                <Text style={[Styles.subTotalTxt, {color:COLORS.white}]}>Shipping Cost</Text>
                <Text style={[Styles.subTotal, {color:COLORS.white}]}>Rp. 0</Text>
            </View>
            <View style={[Styles.subTotalWrap, {marginBottom:15}]}>
                {Array.from({ length: numberOfDots }).map((_, index) => (
                    <View key={index} style={styles.dot} />
                ))}
            </View>
            <View style={Styles.subTotalWrap}>
                <Text style={[Styles.totalTxt, {color:COLORS.white}]}>Total</Text>
                <Text style={[Styles.total, {color:COLORS.white}]}>Rp. {totalPrice.toLocaleString('id-ID')}</Text>
            </View>
        </View>
        <View style={Styles.subContainer}>
            <TouchableOpacity
                onPress={handleAddHistory}
            >
                <View style={Styles.checkoutBtn}>
                    <Text style={Styles.checkoutTxt}>Checkout</Text>
                </View>
            </TouchableOpacity>    
        </View>
        <Alert 
            message={showMessage} 
            visible={showAlert}
            onClose={handleCloseAlert} 
        />
    </View>
  )
}

const styles = StyleSheet.create({
    dot: {
      width: DOT_SIZE,
      height: DOT_SIZE,
      borderRadius: DOT_SIZE / 2,
      backgroundColor: 'white',
    },
});

export default PurchaseBar