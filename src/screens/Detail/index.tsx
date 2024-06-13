import { View, Text, Image, ScrollView, TouchableOpacity, Animated } from 'react-native';
import React, { FC, useRef, useState } from 'react';
import useApi from '../../hooks/useApi';
import { COLORS } from '../../themes/variables/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import Loading from '../../components/loading';
import { RootStackParamList } from '../../navigators/Main';
import Styles from './style';
import { useTheme } from '../../hooks/themeContext';
import TopInformation from '../../components/detail/top';
import { Product } from '../../interfaces/products';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCartShopping, faChevronLeft, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import ReviewColumn from '../../components/detail/review';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addToCart } from '../../store/cart';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import LoveButton from '../../components/loveButton';
import SlideUpModal from '../../components/modal/SlideUpModal';
import NoItem from '../../components/noItem';

type DetailProductRouteProp = RouteProp<RootStackParamList, 'Detail'>;
type DetailProductNavigationProps = StackNavigationProp<RootStackParamList, 'Detail'>;
interface DetailProductProps {
    route: DetailProductRouteProp;
    navigation: DetailProductNavigationProps;
}

const DetailProduct: FC<DetailProductProps> = ({ route }) => {
    const { itemId } = route.params;
    const { data, loading, error, review } = useApi(itemId); 
    const { theme } = useTheme();
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const navigation = useNavigation<DetailProductNavigationProps>();
    const cartItem = useSelector((state: RootState) => state.cart.items)
    const scrollY = useRef(new Animated.Value(0)).current;
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    if (loading) {
        return <Loading />;
    }

    if (error || !data || !('title' in data)) {
        return (
            <NoItem/>
        );
    }

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const headerBackgroundColor = scrollY.interpolate({
        inputRange: [0, 170],
        outputRange: ['rgba(0, 128, 255, 0)', theme.backgroundDetail],
        extrapolate: 'clamp',
    });

    const backgroundIcon = scrollY.interpolate({
        inputRange: [0, 170],
        outputRange: [COLORS.white, theme.backgroundIcon],
        extrapolate: 'clamp',
    });

    const increase = () => {
        setQty(prevQty => prevQty + 1);
    };

    const decrease = () => {
        setQty(prevQty => Math.max(1, prevQty - 1));
    };

    const pricedisc = data.price ? data.price * (data.disc / 100) : 0;
    const totaldisc = data.price ? data.price - pricedisc : 0;
    const totalprice = totaldisc * qty;

    const handleAddCart = () => {
        const now = new Date();

        const newProduct = [
            {
                id: data.id,
                img: data.img,
                title: data.title,
                price: data.price,
                disc: data.disc,
                category: data.category,
                qty: qty,
                date: now
            }
        ];

        dispatch(addToCart(newProduct))
    }

    return (
      <View style={[Styles.container, {backgroundColor: theme.backgroundDetail}]} >
        <Animated.View style={[Styles.headerBar, { backgroundColor: headerBackgroundColor }]}>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Animated.View style={[Styles.btnBack, { backgroundColor: backgroundIcon }]}>
                        <FontAwesomeIcon icon={faChevronLeft} size={20} />
                    </Animated.View>
                </TouchableOpacity>
            </View>
            <View style={Styles.btnRightWrap}>
                <TouchableOpacity
                    style={{ marginRight:10 }}
                    onPress={openModal}
                >
                    <Animated.View style={[Styles.btnBack, { backgroundColor: backgroundIcon }]}>
                        <LoveButton/>
                    </Animated.View>
                </TouchableOpacity>  
                <TouchableOpacity
                    onPress={() => navigation.navigate('Cart', { showModal: false })}
                >
                    <Animated.View 
                        style={[Styles.btnCart, { backgroundColor: backgroundIcon }]}
                    >
                        <View style={{ width:28 }}>
                            {
                            cartItem.length !== 0 ? (
                                <View style={Styles.cartWrap}>
                                    <Text style={Styles.cartLengthTxt}>{cartItem.length}</Text>
                                </View>
                            ) : null
                            }
                        </View>
                        <FontAwesomeIcon icon={faCartShopping} size={23} />
                    </Animated.View>
                </TouchableOpacity>
            </View>
        </Animated.View>
        <ScrollView 
            showsVerticalScrollIndicator={false}
            onScroll=
                {Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
            scrollEventThrottle={16}
        >
            <Image 
                source={{ uri: data.img }} 
                style={Styles.image}
            />
            <View style={Styles.subContainer}>
                <TopInformation 
                    data={data} 
                    qty={qty}
                    increase={increase}
                    decrease={decrease}
                    review={review} 
                />
            </View>
            <View>
                <ReviewColumn
                    review={review} 
                    rate={data.rate}
                />
            </View>
        </ScrollView>
        <View style={[Styles.stickyBottom, {backgroundColor:theme.backgroundTab}]}>
            <View style={Styles.flexBottom}>
                <View>
                    <Text style={[Styles.totPriceTxt, {color:theme.priceTxt}]}>Total Price</Text>
                    <Text style={Styles.totPrice}>Rp. {totalprice.toLocaleString('id-ID')}</Text>
                </View>
                <TouchableOpacity
                    onPress={handleAddCart}
                >
                  <View style={Styles.cartBtn}>
                    <View style={Styles.flexCartBtn}>
                      <FontAwesomeIcon icon={faShoppingBag} size={20} color={COLORS.white} />
                      <Text style={Styles.cartTxt}>Go to Cart</Text>
                    </View>
                  </View>
                </TouchableOpacity>
            </View>
        </View>
        <SlideUpModal isVisible={isModalVisible} onClose={closeModal} />
      </View>
    );
};

export default DetailProduct;
