import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { View } from 'react-native';
import { COLORS } from '../../themes/variables/colors';
library.add(fas, far);

interface Props {
    rating: number;
    maxStars: number;
}

const StarRating: FC<Props> = ({ rating, maxStars = 5 }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxStars; i++) {
        if (i <= rating) {
             stars.push(<FontAwesomeIcon key={i} icon={['fas','star']} style={{ color: COLORS.yellow }} size={20} />);
        } else if (i - rating < 1) {
            stars.push(<FontAwesomeIcon key={i} icon={['fas','star-half-stroke']} style={{ color: COLORS.yellow }} size={20} />);
        } else {
            stars.push(<FontAwesomeIcon key={i} icon={['far','star']} style={{ color: COLORS.yellow }} size={20} />);
        }
    }
    return stars;
  };

  return <View style={{ flexDirection: 'row' }}>{renderStars()}</View>;
};

export default StarRating;
