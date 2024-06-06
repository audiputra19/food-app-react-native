import React, { FC } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faBagShopping, faBoxArchive, faChevronLeft, faHeart, faHome, faIgloo, faUser } from '@fortawesome/free-solid-svg-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../themes/variables/colors';
import { useTheme } from '../hooks/themeContext';
import Cart from '../screens/CartItems';
import LoveItems from '../screens/LoveItems';
import { useNavigation } from '@react-navigation/native';
import HistoryItems from '../screens/HistoryItems';

const Tab = createBottomTabNavigator();

const TabMain: FC = () => {
  const {theme} = useTheme(); 
  const navigation = useNavigation();
  
  return (
    <Tab.Navigator 
    screenOptions={{
        tabBarShowLabel:false,
        tabBarStyle: {
            backgroundColor: theme.backgroundTab,
            height: 60,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            position: 'absolute',
            borderColor: theme.backgroundTab,
            bottom: 0,
            left: 0,
            right: 0
        },
        tabBarActiveTintColor: COLORS.amber,
        tabBarInactiveTintColor: COLORS.gray
    }}>
        <Tab.Screen  
            name='Home'
            component={Home}
            options={{
                headerShown: false,
                tabBarIcon: ({color}) => (
                   <FontAwesomeIcon icon={faHome} size={23} color={color} />
                )
            }}
        />
        <Tab.Screen  
            name='Love'
            component={LoveItems}
            options={{
                tabBarIcon: ({color}) => (
                    <FontAwesomeIcon icon={faHeart} size={22} color={color} />
                ),
                headerStyle:{
                    height: 120,
                    backgroundColor: theme.backgroundColor
                },
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
                )
            }}
        />
        <Tab.Screen  
            name='History'
            component={HistoryItems}
            options={{
                tabBarIcon: ({color}) => (
                    <FontAwesomeIcon icon={faBoxArchive} size={22} color={color} />
                ),
                headerStyle:{
                    height: 120,
                    backgroundColor: theme.backgroundColor
                },
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
                )
            }}
        />
        <Tab.Screen  
            name='Profile'
            component={Home}
            options={{
                tabBarIcon: ({color}) => (
                    <FontAwesomeIcon icon={faUser} size={22} color={color} />
                )
            }}
        />
    </Tab.Navigator>
  )
}

export default TabMain