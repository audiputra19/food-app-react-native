import { View, Text, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Styles from './style'
import { useTheme } from '../../hooks/themeContext'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { clearHistory } from '../../store/history'
import { HistoryList } from '../../interfaces/historyList'
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import SearchBar from '../../components/searchBar'
import Loading from '../../components/loading'
import { addToCart } from '../../store/cart'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../navigators/Main'
import { StackNavigationProp } from '@react-navigation/stack';

type HistoryNavigationProps = StackNavigationProp<RootStackParamList, 'Cart'> 
const HistoryItems = () => {
  const {theme} = useTheme(); 
  const histItem = useSelector((state: RootState) => state.history.items);
  const dispatch = useDispatch();
  const navigation = useNavigation<HistoryNavigationProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<HistoryList[]>([]);

  console.log(searchQuery)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setFilteredItems(histItem);
  }, [histItem]);

  const handleClearHistory = () => {
    dispatch(clearHistory());
  }

  const handleSubmitEditing = () => {
      const filtered = histItem.filter(item =>  
        item.value.some(product => 
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredItems(filtered);
  }

  const handleClearKeyword = () => {
    setSearchQuery('')
    setFilteredItems(histItem);
  }

  const renderItem = (post: HistoryList) => {

    const handleAddCart = () => {
      const now = new Date();
      const newProducts = post.value.map(data => ({
              id: data.id,
              img: data.img,
              title: data.title,
              price: data.price,
              disc: data.disc,
              category: data.category,
              qty: data.qty,
              date: now
      }));
      dispatch(addToCart(newProducts))
      navigation.navigate('Cart', { showModal:false })
    }

    const total = post.value.reduce((total, data) => total + (data.price * data.qty), 0);
    const moreProduct = post.value.length - 1;
    const dateHist = format(post.date, 'dd MMMM yyyy, HH:mm', {locale: id});
    const item = post.value.slice().sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })

    return(
      <TouchableOpacity
        activeOpacity={0.9} 
        key={post.id}
        style={[Styles.card, {backgroundColor:theme.card, elevation:theme.shadow}]}
      >
        <View style={Styles.dateWrap}>
          <Text style={Styles.dateTxt}>Date</Text>
          <Text style={[Styles.date, {color:theme.colorDefault}]}>{dateHist}</Text>
        </View>
        <View 
          style={Styles.cardItem}
        >
          <View>
            <Image 
              source={{ uri: item[0].img }}
              style={Styles.img}
            />  
          </View>
          <View style={Styles.titleWrap}>
            <Text style={[Styles.title, {color:theme.colorDefault}]} numberOfLines={1}>{item[0].title}</Text>
            <Text style={[Styles.qty, {color:theme.colorTxt}]}>x {item[0].qty}</Text>
          </View> 
        </View>
        <View>
          {
            moreProduct > 0
            ? (<Text style={[Styles.itemMore, {color:theme.colorDefault}]}>+{moreProduct} More Product</Text>)
            : null
          }
        </View>
        <View style={Styles.footer}>
          <View style={Styles.totalWrap}>
            <Text style={[Styles.totalTxt, {color:theme.colorDefault}]}>Total Shopping</Text>
            <Text style={[Styles.total, {color:theme.colorDefault}]}>Rp. {total.toLocaleString('id-ID')}</Text>
          </View>
          <View>
            <TouchableOpacity 
              style={Styles.btnBuyMore}
              onPress={handleAddCart}
            >
              <Text style={Styles.buyMoreTxt}>Buy More</Text>
            </TouchableOpacity>
          </View>
        </View> 
      </TouchableOpacity>
    )
  }
  
  return (
    isLoading ? (
      <Loading/>
    ) : (
      <View style={[Styles.container, {backgroundColor:theme.backgroundColor}]}>
        <View style={[Styles.stickySearch, {backgroundColor:theme.backgroundColor}]}>
          <SearchBar 
            placeholder="Search Transaction" 
            editable={true}
            focus={false}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSubmitEditing}
            clearKeyword={handleClearKeyword}
          />
        </View>
        <ScrollView>
          <View style={Styles.subContainer}>
            <View style={Styles.titleHistWrap}>
              <Text style={[Styles.titleHist, {color:theme.colorDefault}]}>My History List</Text>
            </View>
            {filteredItems.length === 0 
            ? (
                <View style={Styles.noItemWrap}>
                  <Text style={[Styles.noItemTxt, {color:theme.colorTxt}]}>No Items</Text>
                </View>
              ) 
            : (filteredItems.map(renderItem))}
            <TouchableOpacity
              onPress={handleClearHistory}
            >
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  )
}

export default HistoryItems