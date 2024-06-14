import { View, Text, TouchableOpacity, TextInput, FlatList, ListRenderItem, Image, Dimensions } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import Styles from './style'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faStar } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from '../../hooks/themeContext'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../navigators/Main'
import useApi from '../../hooks/useApi'
import Loading from '../../components/loading'
import { Product } from '../../interfaces/products'
import { COLORS } from '../../themes/variables/colors'
import CartButton from '../../components/cartButton'
import { StackNavigationProp } from '@react-navigation/stack'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import Alert from '../../components/alert'
import { addToCart, removeFromCart } from '../../store/cart'
import SearchBar from '../../components/search/searchBar'

type searchResultRouteProp = RouteProp<RootStackParamList, 'ResultSearch'>
type searchResultNavigationProp = StackNavigationProp<RootStackParamList, 'ResultSearch'>
interface Props {
    route: searchResultRouteProp;
}

const { width, height } = Dimensions.get('window');
const numColumns = 2;
const paddingHorizontal = 17;
const cardMargin = 10;
const cardWidth = (width - paddingHorizontal * 2 - cardMargin * (numColumns - 1)) / numColumns;

const ResultSearch: FC<Props> = ({ route }) => {
  const { keyword } = route.params;
  const { data, loading, error } = useApi(); 
  const {theme} = useTheme();
  const navigation = useNavigation<searchResultNavigationProp>();
  const dispatch = useDispatch();
  const prodCart = useSelector((state: RootState) => state.cart.items)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null) 
  const [showAlert, setShowAlert] = useState(false);
  const [showMessage, setShowMessage] = useState('');
  const [filteredData, setFilteredData] = useState<Product[]>([]);

  useEffect(() => {

    if(Array.isArray(data)){
      const filtered = data.filter((item: Product) =>
        item.title.toLowerCase().includes(keyword.toLowerCase()) ||
        item.category.toLowerCase().includes(keyword.toLowerCase()) ||
        item.desc.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [data, keyword]);

  const handleCloseAlert = () => {
    setShowAlert(false);
  }

  const renderItem:ListRenderItem<Product> = ({item}) => {
    const isInCart = prodCart.some(cartItem => cartItem.id === item.id);

    const handleVisibility = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setShowAlert(false);
      timeoutRef.current = setTimeout(() => {
        setShowAlert(true);
        timeoutRef.current = setTimeout(() => {
          setShowAlert(false);
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
      setShowMessage('Saved to cart')
      handleVisibility();
    }

    const handleRemoveCart =(id:number) => {
      dispatch(removeFromCart(id));
      setShowMessage('Remove from cart')
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
    <View style={[Styles.container, {backgroundColor:theme.backgroundColor}]}>
      <View style={Styles.subContainer}>
        <View style={Styles.searchWrap}>
          <View style={Styles.backWrap}>
            <TouchableOpacity
              onPress={() => navigation.navigate('TabMain', {screen: 'Home'})}
            >
              <FontAwesomeIcon icon={faArrowLeft} size={20} color={theme.colorDefault} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.navigate('SearchPage', { keyword: keyword })}
            >
              <SearchBar
                placeholder={keyword}
                editable={false}
                focus={false} />
            </TouchableOpacity>
          </View>
        </View>
        {
          loading ? (
            <Loading />
          ) : (
            <View style={Styles.itemList}>
              <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={filteredData}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
              />
            </View>
          )
        }
      </View>
      <Alert
          message={showMessage}
          visible={showAlert}
          onClose={handleCloseAlert} 
      />
    </View>
  )
}

export default ResultSearch