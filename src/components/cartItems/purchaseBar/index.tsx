import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Styles from './style'
import { COLORS } from '../../../themes/variables/colors'
import { useTheme } from '../../../hooks/themeContext'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

const { width } = Dimensions.get('window');
const DOT_SIZE = 3;
const DOT_SPACING = 8;

const PurchaseBar = () => {
  const {theme} = useTheme();  
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const numberOfDots = Math.floor(width / (DOT_SIZE + DOT_SPACING));

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
            <TouchableOpacity>
                <View style={Styles.checkoutBtn}>
                    <Text style={Styles.checkoutTxt}>Checkout</Text>
                </View>
            </TouchableOpacity>    
        </View>
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