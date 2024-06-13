import { View, Text } from 'react-native'
import React from 'react'
import Styles from './style'
import { useTheme } from '../../hooks/themeContext'

const NoItem = () => {
  const {theme} = useTheme();  

  return (
    <View style={[Styles.container, {backgroundColor:theme.backgroundColor}]}>
        <Text style={[Styles.noItemTxt, {color:theme.colorTxt}]}>Failed to load data</Text>
    </View>
  )
}

export default NoItem