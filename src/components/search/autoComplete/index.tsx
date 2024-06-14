import React, { FC, useEffect, useRef, useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Product } from '../../../interfaces/products';
import useApi from '../../../hooks/useApi';
import Loading from '../../loading';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigators/Main';
import { useTheme } from '../../../hooks/themeContext';
import Styles from './style';

interface AutoCompleteProps {
  inputRef: React.RefObject<TextInput>;
  query: string;
  onSuggestClick: (value: string) => void;
  handleSearchHistory: (value: string) => void;
}

type searchNavigationProps = StackNavigationProp<RootStackParamList, 'ResultSearch'>
const AutoComplete: FC<AutoCompleteProps> = ({ inputRef, query, onSuggestClick, handleSearchHistory }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const { data, loading, error } = useApi();
  const navigation = useNavigation<searchNavigationProps>();
  const {theme} = useTheme();

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  useEffect(() => {
    if (!data || !Array.isArray(data)) return;

    if (query.length > 2) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        const filteredSuggestions: string[] = [];
        data.forEach((product: Product) => {
          const { title, category, desc } = product;
          const combinedText = `${title.toLowerCase()} ${category.toLowerCase()} ${desc.toLowerCase()}`;
          const words = combinedText.split(/\W+/);
          words.forEach((word) => {
            if (word.includes(query.toLowerCase()) && !filteredSuggestions.includes(word)) {
              filteredSuggestions.push(word);
            }
          });
        });
        setSuggestions(filteredSuggestions);
      }, 300);
    } else {
      setSuggestions([]);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, data]);

  return (
    <View style={Styles.container}>
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity 
                style={[Styles.suggestionContainer, {borderColor:theme.colorTxt}]}
                onPress={() => handleSearchHistory(item)}
            >
              <View style={Styles.suggestionContent}>
                <Icon name="search" size={20} color={theme.colorDefault} />
                <Text style={[Styles.suggestionText, {color:theme.colorDefault}]}>{item}</Text>
              </View>
              <TouchableOpacity onPress={() => onSuggestClick(item)}>
                <Icon name="keyboard-o" size={20} color={theme.colorDefault} />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default AutoComplete;
