import { View, Text } from 'react-native'
import React, { FC } from 'react'
import { Review } from '../../../interfaces/products';
import { COLORS } from '../../../themes/variables/colors';
import { useTheme } from '../../../hooks/themeContext';
import Styles from './style';
import NameInitials from '../../nameInitial';
import LikeButton from '../../likeButton';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface Props {
    review: Review | Review[] | null;
    rate: number | string;
}

const ReviewColumn: FC<Props> = ({ review, rate }) => {

    const {theme} = useTheme();

    if (!Array.isArray(review)) {
        review = review ? [review] : [];
    }

    const formatDate = (date: string | Date): string => {
        const dateObject = new Date(date); // Pastikan bahwa date adalah objek Date yang valid
        const options: Intl.DateTimeFormatOptions = {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        };
      
        return dateObject.toLocaleDateString('id-ID', options);
    };

    const reviewItem = (data:Review, i:number, arr:Review[]) => {
        return (
            <View key={i} style={{ borderBottomWidth: i !== arr.length - 1 ? 1 : 0, borderColor:'rgb(229 231 235)' }}>
                <View style={Styles.reviewCol}>
                    <View style={Styles.iconName}>
                        <NameInitials name={data.name} />
                    </View>
                    <View style={Styles.topCard}>
                        <View style={Styles.flexName}>
                            <Text style={[Styles.name, {color:theme.colorDefault}]}>{data.name}</Text>
                            <View>
                                <LikeButton/>
                            </View>
                        </View>
                        <View style={Styles.rateWrap}>
                            <FontAwesomeIcon icon={faStar} color={COLORS.yellow} />
                            <Text style={[Styles.rateTxt, {color:theme.colorDefault}]}>{rate}</Text>
                        </View>
                        <View style={Styles.reviewSet}>
                            <Text style={[Styles.review, {color:theme.colorDefault}]}>{data.review}</Text>
                        </View>
                        <View style={Styles.dateWrap}>
                            <Text style={[Styles.dateTxt, {color:theme.colorTxt}]}>Posted on {formatDate(data.date)}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return (
      <View style={Styles.container}>
        <View>
            <Text style={[Styles.reviewTxt, {color:theme.colorDefault}]}>Review</Text>
        </View>
        <View style={Styles.card}>
            {review.length > 0 ? (
                review.map(reviewItem)
            ) : (
                <View style={Styles.noReviewWrap}>
                    <Text style={[Styles.noReviewTxt, {color:theme.colorDefault}]}>No Reviews</Text>
                </View>
            )}
        </View>
      </View>
    );
}

export default ReviewColumn;
