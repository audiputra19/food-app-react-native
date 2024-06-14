import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClockRotateLeft, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faClock, faKeyboard } from '@fortawesome/free-regular-svg-icons';
import { useTheme } from '../../../hooks/themeContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigators/Main';
import Styles from './style';
import { COLORS } from '../../../themes/variables/colors';

type searchHistoryNavigationProp = StackNavigationProp<RootStackParamList, 'ResultSearch'>

interface Props {
    history: string[];
    removeFromHistory: (value: string) => void;
    clearHistory: () => void;
}

const SearchHistory: FC<Props> = ({ history, removeFromHistory, clearHistory }) => {
  const {theme} = useTheme();
  const navigation = useNavigation<searchHistoryNavigationProp>();  

  return (
    <View style={Styles.container}>
        <FlatList
          data={history}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity 
                style={[Styles.suggestionContainer, {borderColor:theme.colorTxt}]}
                onPress={() => navigation.navigate('ResultSearch', {keyword: item})}
            >
              <View style={Styles.suggestionContent}>
                <FontAwesomeIcon icon={faClock} size={20} color={theme.colorDefault} />
                <Text style={[Styles.suggestionText, {color:theme.colorDefault}]}>{item}</Text>
              </View>
              <TouchableOpacity onPress={() => removeFromHistory(item)}>
                <FontAwesomeIcon icon={faXmark} size={20} color={theme.colorDefault} />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
        {
          history.length > 0 ? (
            <TouchableOpacity
              onPress={clearHistory}
            >
              <View style={[Styles.btnClearHist, {backgroundColor:theme.backgroundTab}]}>
                <Text style={Styles.clearHistTxt}>Clear Search History</Text>
              </View>
            </TouchableOpacity>
          ) : null
        }
    </View>
  )
}

export default SearchHistory