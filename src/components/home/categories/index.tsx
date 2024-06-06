import { View, Text, TouchableOpacity, StyleSheet, FlatList, ListRenderItem } from 'react-native'
import React, { FC } from 'react'
import { COLORS } from '../../../themes/variables/colors';
import Styles from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCompass, faCookieBite, faMugSaucer, faPepperHot, faUtensils } from '@fortawesome/free-solid-svg-icons';

interface Props {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const Categories:FC<Props> = ({categories, selectedCategory, onSelectCategory}) => {

  const renderItem: ListRenderItem<string> = ({item}) => {
    const icon = () => {
      switch (item) {
        case "Food":
          return <FontAwesomeIcon icon={faUtensils} size={18} color={COLORS.redDark} />;
        case "Drink":
          return <FontAwesomeIcon icon={faMugSaucer} size={18} color={COLORS.redDark} />;
        case "Spicy":
          return <FontAwesomeIcon icon={faPepperHot} size={18} color={COLORS.redDark} />;
        case "Snack":
          return <FontAwesomeIcon icon={faCookieBite} size={18} color={COLORS.redDark} />;
        default:
          return null;
      }
    };

    if (item === '') {
      return (
        <View>
          <TouchableOpacity 
            style={[Styles.button, selectedCategory === '' && Styles.selectedButton]}
            onPress={() => onSelectCategory('')}
          >
            <View style={Styles.customBtn}>
              <View style={Styles.iconWrap}>
                <FontAwesomeIcon icon={faCompass} size={18} color={COLORS.redDark} />
              </View> 
              <Text style={[Styles.buttonText, selectedCategory === '' && Styles.selectedButtonText]}>
                All Food
              </Text>
            </View>
          </TouchableOpacity>
        </View> 
      );
    }

    return (
      <View>
        <TouchableOpacity
          style={[Styles.button, selectedCategory === item && Styles.selectedButton]}
          onPress={() => onSelectCategory(item)}
        >
          <View style={Styles.customBtn}>
            <View style={Styles.iconWrap}>
              {icon()}
            </View>
            <Text style={[Styles.buttonText, selectedCategory === item && Styles.selectedButtonText]}>
              {item}
            </Text>
          </View>
        </TouchableOpacity>
      </View>  
    );
  }

  return (
    <View>
      <FlatList
        style={Styles.container}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={['', ...categories]}
        renderItem={renderItem }
      />
    </View>
  )
}

export default Categories