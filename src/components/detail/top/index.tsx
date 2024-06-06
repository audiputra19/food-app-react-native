import { View, Text, TouchableOpacity } from 'react-native'
import React, { FC, useState } from 'react'
import StarRating from '../../starRating'
import Styles from './style'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { COLORS } from '../../../themes/variables/colors'
import { Product, Review } from '../../../interfaces/products'
import { useTheme } from '../../../hooks/themeContext'
import ReadMoreComponent from '../../readMore'

interface Props {
    data: Product;
    qty: number;
    increase: () => void;
    decrease: () => void;
    review: Review | Review[] | null;
}

const TopInformation: FC<Props> = ({ data, qty, increase, decrease, review }) => {

    const { theme } = useTheme();

    if (!Array.isArray(review)) {
        review = review ? [review] : [];
    }

    const stringRate = data.rate;
    const rate = Number(stringRate);

    const pricedisc = data.price ? data.price * (data.disc / 100) : 0;
    const totaldisc = data.price ? data.price - pricedisc : 0;
   
    const Disc = () => {
        if (data?.disc !== 0 && data !== undefined) {
            return (
                <View>
                    <View style={Styles.flexDisc}>
                        <View style={Styles.discWrap}>
                            <Text style={Styles.discTxt}>{data.disc}%</Text>
                        </View>
                        <Text style={Styles.priceBeforeDisc}>Rp. {data.price?.toLocaleString('id-ID')}</Text>    
                    </View>
                    <Text style={[Styles.priceAfterDisc, {color:theme.colorDefault}]}>Rp. {totaldisc.toLocaleString('id-ID')}</Text>
                </View>  
            )
        } 
        else 
            return (
                <View>
                    <Text style={[Styles.priceNotDisc, {color:theme.colorDefault}]}>Rp. {totaldisc.toLocaleString('id-ID')}</Text>
                </View>
            )
    }  

    return (
        <View>
            <View style={Styles.flexTitle}>
                <View style={{ flex:1 }}>
                    <Text style={[Styles.title, {color:theme.colorDefault}]}>{data.title}</Text>
                </View>
                <View style={Styles.flexBtn}>
                    <TouchableOpacity onPress={decrease}>
                    <View style={Styles.decreases}>
                        <FontAwesomeIcon icon={faMinus} color={COLORS.slateDark} />
                    </View>
                    </TouchableOpacity>
                    <View style={Styles.number}>
                    <Text style={Styles.numTxt}>{qty}</Text>
                    </View>
                    <TouchableOpacity onPress={increase}>
                    <View style={Styles.increase}>
                        <FontAwesomeIcon icon={faPlus} color={COLORS.slateDark} />
                    </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={Styles.flexRate}>
                <View style={Styles.flexStar}>
                    <StarRating rating={rate} maxStars={5} />
                    <Text style={[Styles.rate, {color:theme.colorDefault}]}>{data.rate}</Text>
                    <Text style={[Styles.reviewLength, {color:theme.colorTxt}]}>({review.length})</Text>
                </View>
                <View>
                    <Disc/>
                </View>
            </View>
            <View>
                <Text style={[Styles.descTxt, {color:theme.colorDefault}]}>Description</Text>
                <ReadMoreComponent text={data.desc} maxLength={100} />
            </View>
        </View>
    )
}

export default TopInformation