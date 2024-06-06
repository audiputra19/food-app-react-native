import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { FC, useState } from 'react';
import useApi from '../../hooks/useApi';
import { COLORS } from '../../themes/variables/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Loading from '../../components/loading';
import { RootStackParamList } from '../../navigators/Main';
import Styles from './style';
import { useTheme } from '../../hooks/themeContext';
import TopInformation from '../../components/detail/top';
import { Product } from '../../interfaces/products';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import ReviewColumn from '../../components/detail/review';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addToCart } from '../../store/cart';

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

    if (loading) {
        return <Loading />;
    }

    if (error || !data || !('title' in data)) {
        return (
            <View>
                <Text>Failed to load data</Text>
            </View>
        );
    }

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
        const formattedDate = new Intl.DateTimeFormat('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }).format(now);

        const newProduct = [
            {
                id: data.id,
                img: data.img,
                title: data.title,
                price: data.price,
                disc: data.disc,
                category: data.category,
                qty: qty,
                date: formattedDate
            }
        ];

        dispatch(addToCart(newProduct))
    }



    return (
      <View style={[Styles.container, {backgroundColor: theme.backgroundDetail}]} >
        <ScrollView >
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
                      <FontAwesomeIcon icon={faCartShopping} size={20} color={COLORS.white} />
                      <Text style={Styles.cartTxt}>Go to Cart</Text>
                    </View>
                  </View>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    );
};

export default DetailProduct;
