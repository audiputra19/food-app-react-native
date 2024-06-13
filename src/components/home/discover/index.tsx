import { View, Text, FlatList, TouchableOpacity, Image, ListRenderItem, Dimensions } from 'react-native'
import React, { FC, useRef, useState } from 'react'
import Styles from './styles';
import { Product } from '../../../interfaces/products';
import LoveButton from '../../loveButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigators/Main';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShoppingBag, faStar } from '@fortawesome/free-solid-svg-icons';
import { COLORS } from '../../../themes/variables/colors';
import { useTheme } from '../../../hooks/themeContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../../store/cart';
import CartButton from '../../cartButton';
import { RootState } from '../../../store';

const { width } = Dimensions.get('window');
const numColumns = 2;
const paddingHorizontal = 15;
const cardMargin = 10;
const cardWidth = (width - paddingHorizontal * 2 - cardMargin * (numColumns - 1)) / numColumns;

type ProductListScreenProp = StackNavigationProp<RootStackParamList, 'Home'>
interface Props {
    data: Product[];
    visible: (data: boolean) => void;
    message: (data: string) => void;
}

const Discover: FC<Props> = ({data, visible, message}) => {
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
                  <View style={Styles.priceWrap}>
                      <Text style={[Styles.price, {color:theme.cardTxt}]}>Rp. {totaldisc.toLocaleString('id-ID')}</Text>
                      <View style={Styles.customDisc}>
                        <Text style={Styles.discTxt}>{item.disc}%</Text>
                      </View>
                  </View>  
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
            <View style={[Styles.card, { width: cardWidth, backgroundColor:theme.card, elevation:theme.shadow }]}>
              <View>
                <Image 
                  source={{ uri: item.img }}
                  style={Styles.image}
                />
                <View style={Styles.mainCard}>
                  <Text style={[Styles.title, {color:theme.colorDefault}]} numberOfLines={1}>{item.title}</Text>
                  <Text style={Styles.category}>{item.category}</Text>
                  <Disc/>
                  <View style={Styles.footCard}>
                    <View style={Styles.rateWrap}>
                      <FontAwesomeIcon icon={faStar} color={COLORS.yellow} />
                      <Text style={[Styles.rateTxt, {color: theme.colorDefault}]}>{item.rate}</Text>
                    </View>
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
        <View style={Styles.container}>
          <Text style={[Styles.textDiscover, {color: theme.colorDefault}]}>Discover</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            numColumns={2}
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
          />
        </View>
    );
}

export default Discover