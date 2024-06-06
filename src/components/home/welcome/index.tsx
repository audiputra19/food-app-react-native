import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Styles from './styles'
import { faCartShopping, faMoon, faSearch, faSun } from '@fortawesome/free-solid-svg-icons'
import { COLORS } from '../../../themes/variables/colors'
import { useTheme } from '../../../hooks/themeContext'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../navigators/Main'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

type ProductListScreenProp = StackNavigationProp<RootStackParamList, 'Home'>
const Welcome: FC = () => {
  const { theme, toggleTheme } = useTheme();
  const navigation =  useNavigation<ProductListScreenProp>();
  const cartItem = useSelector((state: RootState) => state.cart.items)

  return (
    <View style={Styles.container}>
      <View>
        <View style={Styles.flex}>
            <TouchableOpacity style={{ flex:1 }}>
              <View style={Styles.search}>
                <FontAwesomeIcon icon={faSearch} size={16}/>
                <Text style={Styles.placeholder}>Search Product</Text>
              </View>
            </TouchableOpacity>
            <View style={{ marginLeft: 12 }}>
              <TouchableOpacity 
                onPress={toggleTheme}
              >
                <FontAwesomeIcon icon={theme.colorDefault === COLORS.slateDark ? faMoon : faSun} size={23} color={theme.colorDefault} />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={{ paddingLeft:12, paddingRight:6 }}
                onPress={() => navigation.navigate('Cart', { showModal: false })}
              >
                {
                  cartItem.length !== 0 ? (
                    <View style={Styles.cartWrap}>
                      <Text style={Styles.cartTxt}>{cartItem.length}</Text>
                    </View>
                  ) : null
                }
                <FontAwesomeIcon icon={faCartShopping} size={23} color={theme.colorDefault} />
              </TouchableOpacity>
            </View>
        </View>
      </View>
    </View>
  )
}

export default Welcome