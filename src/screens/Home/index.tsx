import React, { FC, useEffect, useRef, useState } from 'react'
import { Animated, Easing, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import Styles from './style';
import Welcome from '../../components/home/welcome';
import Categories from '../../components/home/categories';
import Populer from '../../components/home/populer';
import useApi from '../../hooks/useApi';
import Discover from '../../components/home/discover';
import { useTheme } from '../../hooks/themeContext';
import Loading from '../../components/loading';
import Alert from '../../components/alert';

const Home: FC = () => {
  const { data, loading, error } = useApi();
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string | null>('');
  const [showAlert, setShowAlert] = useState(false);
  const [showMessage, setShowMessage] = useState('');
  
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
        .slice(0, 5);

  let otherItems = filteredData.filter(item => !getPopularItems.includes(item));      

  const handleCategorySelection = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleAlert = (data: boolean) => {
    setShowAlert(data);
  }

  const handleMessage = (data: string) => {
    setShowMessage(data)
  }

  const handleCloseAlert = () => {
    setShowAlert(false);
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
              return (
                <Populer 
                  data={getPopularItems} 
                  visible={handleAlert}
                  message={handleMessage}  
                />
              ) 
            case 'Discover':
              return (
                <Discover 
                  data={otherItems} 
                  visible={handleAlert}
                  message={handleMessage}
                />
              )
            default:
              return null;
          }
        }}
        keyExtractor={(item) => item.key}
      />
      <Alert 
        message={showMessage} 
        visible={showAlert}
        onClose={handleCloseAlert}
        marginBottom={75}
        marginHorizontal={15}
      />
    </View>
  )
}

export default Home