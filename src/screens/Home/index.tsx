import React, { FC, useEffect, useRef, useState } from 'react'
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import { Animated, Easing, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import Styles from './style';
import Welcome from '../../components/home/welcome';
import Categories from '../../components/home/categories';
import Populer from '../../components/home/populer';
import { RootStackParamList } from '../../navigators/Main';
import useApi from '../../hooks/useApi';
import { useNavigation } from '@react-navigation/native';
import Discover from '../../components/home/discover';
import { useTheme } from '../../hooks/themeContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { COLORS } from '../../themes/variables/colors';
import Loading from '../../components/loading';

const Stack = createStackNavigator();
type ProductListScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;
const Home: FC = () => {
  const { data, loading, error } = useApi();
  const { theme } = useTheme();
  const navigation = useNavigation<ProductListScreenProp>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>('');

  if (!data || !Array.isArray(data)) {
    return (
      <Loading />
    );
  }

  const categories = Array.from(new Set(data.map(product => product.category)));

  let filteredData = data;
  if (selectedCategory !== '') {
    filteredData = data.filter(product => product.category === selectedCategory);
  }

  let getPopularItems = [...selectedCategory !== '' ? data.filter(item => item.category === selectedCategory) : data]
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10);

  const handleCategorySelection = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <View style={[Styles.container, { backgroundColor: theme.backgroundColor}]}>
      <View style={[Styles.stickyContainer, {backgroundColor:theme.backgroundColor}]}>
        <Welcome />
      </View>
      <FlatList
        data={[{ key: 'Welcome' }, { key: 'Categories' }, { key: 'Populer' }, { key: 'Discover' }]}
        renderItem={({ item }) => {
          switch (item.key) {
            case 'Categories':
              return (
                <Categories
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={handleCategorySelection}
                />
              );
            case 'Populer':
              return <Populer data={getPopularItems} />;
            case 'Discover':
              return <Discover data={filteredData} />;
            default:
              return null;
          }
        }}
        keyExtractor={(item) => item.key}
      />
    </View>
  )
}

export default Home