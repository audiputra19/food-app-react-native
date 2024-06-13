import { View, Text, FlatList, TouchableOpacity, ListRenderItem, Image } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Product } from '../../../interfaces/products';
import { COLORS } from '../../../themes/variables/colors';
import axios from 'axios';
import useApi from '../../../hooks/useApi';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigators/Main';
import Styles from './styles';
import LoveButton from '../../loveButton';
import { useTheme } from '../../../hooks/themeContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import CartButton from '../../cartButton';
import { addToCart, removeFromCart } from '../../../store/cart';

type ProductListScreenProp = StackNavigationProp<RootStackParamList, 'Home'>
interface Props {
  data: Product[];
  visible: (data: boolean) => void;
  message: (data: string) => void;
}
const Populer: FC<Props> = ({data, visible, message}) => {
    const {theme} = useTheme();    
    const navigation = useNavigation<ProductListScreenProp>();
    const dispatch = useDispatch();
    const prodCart = useSelector((state: RootState) => state.cart.items)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const renderItem:ListRenderItem<Product> = ({item}) => {
      const isInCart = prodCart.some(cartItem => cartItem.id === item.id);

      const handleVisibility = () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        visible(false);
        timeoutRef.current = setTimeout(() => {
          visible(true);
          timeoutRef.current = setTimeout(() => {
            visible(false);
          }, 3000);
        }, 100); 
      };

      const handleAddCart = () => {
        const now = new Date();
        const newProduct = [
            {
                id: item.id,
                img: item.img,
                title: item.title,
                price: item.price,
                disc: item.disc,
                category: item.category,
                qty: 1,
                date: now
            }
        ];

        dispatch(addToCart(newProduct))
        message('Saved to cart')
        handleVisibility();
      }

      const handleRemoveCart =(id:number) => {
        dispatch(removeFromCart(id));
        message('Remove to cart')
        handleVisibility();
      }

      const pricedisc = item.price * (item.disc/100);
      const totaldisc = item.price - pricedisc;
      function Disc(){
          if(item.disc !== 0){
              return (
                <Text style={[Styles.price, {color:theme.cardTxt}]}>Rp. {totaldisc.toLocaleString('id-ID')}</Text>
              )
          } 
          else 
              return (
                <Text style={[Styles.price, {color:theme.cardTxt}]}>Rp. {item.price.toLocaleString('id-ID')}</Text>
              )
      }

      return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Detail', { itemId: item.id })}
          >
            <View style={[Styles.card, {backgroundColor:theme.card, elevation:theme.shadow}]}>
              <View>
                <Image 
                  source={{ uri: item.img }}
                  style={Styles.image}
                />
                <View style={Styles.mainCard}>
                  <Text style={[Styles.title, {color:theme.colorDefault}]} numberOfLines={1}>{item.title}</Text>
                  <Text style={Styles.category}>{item.category}</Text>
                  <View style={Styles.footCard}>
                    <Disc/>
                    <TouchableOpacity
                      onPress={isInCart ? () => handleRemoveCart(item.id) : handleAddCart}
                    >
                      <CartButton
                        color={isInCart ? COLORS.yellow : theme.colorDefault}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
      )
    }

    return (
      <View>
        <Text style={[Styles.textPop, {color: theme.colorDefault}]}>Popular</Text>
        <FlatList
          style={{ paddingHorizontal:15 }}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    );
};

export default Populer