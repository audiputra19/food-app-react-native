import React, { FC } from 'react'
import TabMain from './TabMain';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import DetailProduct from '../screens/Detail';
import { TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { COLORS } from '../themes/variables/colors';
import { faHeart, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { useNavigation } from '@react-navigation/native';
import LoveItems from '../screens/LoveItems';
import CartItems from '../screens/CartItems';
import { useTheme } from '../hooks/themeContext';
import { useDispatch } from 'react-redux';
import { clearCart } from '../store/cart';

export type RootStackParamList = {
  TabMain: undefined;
  Home: undefined;
  Detail: { itemId: number };
  Cart: { showModal: boolean };
};

const Stack = createStackNavigator<RootStackParamList>();

const Main: FC = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();

  return (
    <>
      <Stack.Navigator 
        screenOptions={{ headerShown: false }
      }>
          <Stack.Screen 
            name='TabMain'
            component={TabMain}
          />
          <Stack.Screen
            name='Home'
            component={Home}
          />
          <Stack.Screen
            name='Detail'
            component={DetailProduct}
            options={{ 
              headerShown:true,
              headerTransparent: true,
              headerTitle: '',
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                >
                  <View 
                    style={{ 
                      marginTop:15,
                      marginLeft:15,
                      padding:14, 
                      backgroundColor:COLORS.white,
                      borderRadius:15 
                    }}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} size={18} />
                  </View>
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity>
                  <View
                    style={{ 
                      marginTop:15,
                      marginRight:15
                    }}>
                    <FontAwesomeIcon icon={faHeart} size={30} color={COLORS.red} />
                  </View>
                </TouchableOpacity>
              )
            }}
          />
          <Stack.Screen
            name='Cart'
            component={CartItems}
            options={({ navigation }) => ({ 
              headerStyle:{
                height: 120,
                backgroundColor: theme.backgroundColor
              },
              headerShown:true,
              headerTransparent: false,
              headerTitle: '',
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                >
                  <View 
                    style={{ 
                      marginTop:15,
                      marginLeft:15,
                      padding:14, 
                      backgroundColor:COLORS.white,
                      borderRadius:15 
                    }}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} size={18} />
                  </View>
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Cart', { showModal: true });
                  }}
                >
                  <View
                    style={{ 
                      marginTop:10,
                      marginRight:15
                    }}>
                    <FontAwesomeIcon icon={faTrashCan} size={25} color={theme.colorDefault} />
                  </View>
                </TouchableOpacity>
              )
            })}
          />
      </Stack.Navigator>
    </>
  )
}

export default Main