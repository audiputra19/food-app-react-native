import { View, Text, Image, TouchableOpacity, Modal, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../themes/variables/colors'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { CartItem } from '../../interfaces/carList'
import Styles from './style'
import { useTheme } from '../../hooks/themeContext'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { clearCart, descreaseQty, increaseQty, removeFromCart } from '../../store/cart'
import { ScrollView } from 'react-native-gesture-handler'
import PurchaseBar from '../../components/cartItems/purchaseBar'
import Loading from '../../components/loading'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '../../navigators/Main'
import ModalDialog from '../../components/modal'

const CartItems = () => {

  const dispatch = useDispatch();
  const prod = useSelector((state: RootState) => state.cart.items);
  const {theme} = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    });
    return () => clearTimeout(timer);
  })

  if (isLoading) {
      return <Loading />;
  }

  const showProduct = (item:CartItem, i:number) => {

    const handleRemoveFromCart = (id: number) => {
      dispatch(removeFromCart(id))
    }

    const handleDecreaseQty = (id: number) => {
      dispatch(descreaseQty(id))
    }

    const handleIncreaseQty = (id: number) => {
      dispatch(increaseQty(id))
    }

    const pricedisc = item.price * (item.disc/100);
    const totaldisc = item.price - pricedisc;
    function Disc(){
        if(item.disc !== 0){
            return (
                <View>
                    <Text style={[Styles.priceLine, {color:theme.colorTxt}]}>Rp. {item.price.toLocaleString('id-ID')}</Text>
                    <Text style={[Styles.price, {color:theme.colorDefault}]}>Rp. {totaldisc.toLocaleString('id-ID')}</Text>
                </View>  
            )
        } 
        else 
            return (
              <View>
                <Text style={[Styles.price, {color:theme.colorDefault}]}>Rp. {item.price.toLocaleString('id-ID')}</Text>
              </View>
            )
    }

    return(
      <View key={i} style={Styles.gap}>
        <View style={Styles.prodList}>
          <View>
            <TouchableOpacity 
              style={Styles.delIcon}
              onPress={() => handleRemoveFromCart(item.id)}
            >
              <FontAwesomeIcon icon={faTrashCan} size={25} color={COLORS.white}/>
            </TouchableOpacity>
            <Image 
              source={{ uri: item.img }}
              style={Styles.img}
            />
          </View>
          <View style={Styles.main}>
            <View style={Styles.titleWrap}>
              <Text style={[Styles.title, {color:theme.colorDefault}]}>{item.title}</Text>
            </View>
            <View style={Styles.footer}>
              <Disc/>
              <View style={Styles.qtyButton}>
                <TouchableOpacity 
                  onPress={() => handleDecreaseQty(item.id)}
                  style={Styles.plusBtn}
                >
                  <FontAwesomeIcon icon={faMinus} size={12} color={COLORS.white} />
                </TouchableOpacity>
                <View style={Styles.qtyWrap}>
                  <Text style={[Styles.qtyTxt, {color:theme.colorDefault}]}>{item.qty}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleIncreaseQty(item.id)} 
                  style={Styles.minusBtn}
                >
                  <FontAwesomeIcon icon={faPlus} size={12} color={COLORS.white} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }

  return (
    <>
        <View style={[Styles.container, {backgroundColor:theme.backgroundColor}]}>
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              <View style={Styles.subContainer}>
                <View>
                  <Text style={[Styles.titleCart, {color:theme.colorDefault}]}>My Cart List</Text>
                </View>
                <View style={Styles.prodListWrap}>
                  {prod.length === 0 
                  ? (
                      <View style={Styles.noItemWrap}>
                        <Text style={[Styles.noItemTxt, {color:theme.colorTxt}]}>No Items</Text>
                      </View>
                    ) 
                  : (prod.map(showProduct))}
                </View>
              </View>
            </ScrollView>
        </View>
        <View>
          <PurchaseBar/>
        </View>
        <View>
          <ModalDialog 
            title='Comfirm Removal'
            dialog='Are you sure you want to remove all items?'
          />
        </View>
    </>

  )
}

export default CartItems