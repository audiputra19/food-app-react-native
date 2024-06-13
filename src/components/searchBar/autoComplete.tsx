import React, { FC, useEffect, useRef, useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Product } from '../../interfaces/products';
import useApi from '../../hooks/useApi';
import Loading from '../loading';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigators/Main';
import { useTheme } from '../../hooks/themeContext';

interface AutoCompleteProps {
  inputRef: React.RefObject<TextInput>;
  query: string;
  onSuggestClick: (value: string) => void;
}

type searchNavigationProps = StackNavigationProp<RootStackParamList, 'ResultSearch'>
const AutoComplete: FC<AutoCompleteProps> = ({ inputRef, query, onSuggestClick }) => {
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
    <View style={styles.container}>
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity 
                style={[styles.suggestionContainer, {borderColor:theme.colorTxt}]}
                onPress={() => navigation.navigate('ResultSearch', {keyword: item})}
            >
              <View style={styles.suggestionContent}>
                <Icon name="search" size={20} color={theme.colorDefault} />
                <Text style={[styles.suggestionText, {color:theme.colorDefault}]}>{item}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 5
  },
  suggestionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 13,
  },
  suggestionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  suggestionText: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

export default AutoComplete;
