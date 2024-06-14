import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useRef, FC, useEffect, useCallback } from 'react';
import Styles from './style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faCircleXmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import AutoComplete from '../../components/search/autoComplete';
import { useTheme } from '../../hooks/themeContext';
import { RouteProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { COLORS } from '../../themes/variables/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigators/Main';
import Loading from '../../components/loading';
import { getSearchHistory, saveSearchHistory } from '../../utils/storage/historySearch';
import SearchHistory from '../../components/search/searchHistory';

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
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      const savedHistory = await getSearchHistory();
      setHistory(savedHistory);
    };

    loadHistory();
  }, []);

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

  const handleKeyPress = async () => {
    let updatedHistory = [query, ...history.filter(item => item !== query)];
    if (updatedHistory.length > 5) {
      updatedHistory = updatedHistory.slice(0, 5);
    }
    setHistory(updatedHistory);
    await saveSearchHistory(updatedHistory);
    navigation.navigate('ResultSearch', {keyword: query})
  };

  const handleClearKeyword = () => {
    setQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  const handleSearchHistory = async (value: string) => {
    //if(value.trim().length === 0) return;

    let updatedHistory = [value, ...history.filter(item => item !== value)];
    if (updatedHistory.length > 5) {
      updatedHistory = updatedHistory.slice(0, 5);
    }
    setHistory(updatedHistory);
    await saveSearchHistory(updatedHistory);
    navigation.navigate('ResultSearch', { keyword: value });
  }

  const handleRemoveFromHistory = async (value: string) => {
    const updatedHistory = history.filter(item => item !== value);
    setHistory(updatedHistory)
    await saveSearchHistory(updatedHistory)
  }

  const handleClearHistory = async () => {
    setHistory([]);
    await saveSearchHistory([]);
};

  return (
    <View style={[Styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={Styles.subContainer}>
        <View style={Styles.searchWrap}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={Styles.backWrap}>
                <FontAwesomeIcon icon={faArrowLeft} size={20} color={theme.colorDefault} />
            </View>
          </TouchableOpacity>
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
      {
        query!=='' ? (
          <AutoComplete 
            inputRef={inputRef} 
            query={query} 
            onSuggestClick={handleSuggestClick} 
            handleSearchHistory={handleSearchHistory}
          />
        ) : (
          <SearchHistory 
            history={history}
            removeFromHistory={handleRemoveFromHistory}
            clearHistory={handleClearHistory}
          />
          
        )
      }
    </View>
  );
};

export default SearchPage;
