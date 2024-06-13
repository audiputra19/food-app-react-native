import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useRef, FC, useEffect, useCallback } from 'react';
import Styles from './style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faCircleXmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import AutoComplete from '../../components/searchBar/autoComplete';
import { useTheme } from '../../hooks/themeContext';
import { RouteProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { COLORS } from '../../themes/variables/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigators/Main';
import Loading from '../../components/loading';

type searchPageRouteProp = RouteProp<RootStackParamList, 'SearchPage'>
type searchPageNavigationProp = StackNavigationProp<RootStackParamList, 'SearchPage'>
interface Props {
  route: searchPageRouteProp
}

const SearchPage: FC<Props> = ({ route }) => {
  const { keyword = '' } = route.params || {};
  const { theme } = useTheme();
  const navigation = useNavigation<searchPageNavigationProp>();
  const inputRef = useRef<TextInput>(null);
  const [query, setQuery] = useState('');

  useFocusEffect(
    useCallback(() => {
      if (keyword) {
        setQuery(keyword);
      }
      
      const focusTimeout = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);

      return () => {
        setQuery('');
        clearTimeout(focusTimeout);
      };
    }, [keyword])
  );

  const handleSuggestClick = (value: string) => {
    setQuery(value)
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyPress = () => {
      navigation.navigate('ResultSearch', {keyword: query})
  };

  const handleClearKeyword = () => {
    setQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  return (
    <View style={[Styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={Styles.subContainer}>
        <View style={Styles.searchWrap}>
          <View style={Styles.backWrap}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesomeIcon icon={faArrowLeft} size={20} color={theme.colorDefault} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <View style={[Styles.search, { borderColor: COLORS.gray }]}>
              <FontAwesomeIcon icon={faSearch} size={16} color={theme.colorDefault} />
              <TextInput
                style={[Styles.textInput, {color:theme.colorDefault}]}
                placeholder="Search Product"
                placeholderTextColor={COLORS.gray}
                autoFocus={true}
                ref={inputRef}
                onChangeText={(text) => setQuery(text)}
                value={query}
                onSubmitEditing={handleKeyPress}
                returnKeyType='search'
              />
              { 
                query!=='' ? (
                  <TouchableOpacity
                    onPress={handleClearKeyword}
                  >
                    <FontAwesomeIcon icon={faCircleXmark} size={16} color={theme.colorDefault} />
                  </TouchableOpacity>
                ) : null
              }
            </View>
          </View>
        </View>
      </View>
      <AutoComplete inputRef={inputRef} query={query} onSuggestClick={handleSuggestClick}/>
    </View>
  );
};

export default SearchPage;
