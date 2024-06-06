import { View, Text, FlatList, TouchableOpacity, ListRenderItem, Image } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
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

type ProductListScreenProp = StackNavigationProp<RootStackParamList, 'Home'>
interface Props {
  data: Product[];
}
const Populer: FC<Props> = ({data}) => {
    const {theme} = useTheme();    
    const navigation = useNavigation<ProductListScreenProp>();

    const renderItem:ListRenderItem<Product> = ({item}) => {

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
                    <LoveButton/>
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