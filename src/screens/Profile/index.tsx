import { View, Text } from 'react-native'
import React from 'react'
import Styles from './style'
import { useTheme } from '../../hooks/themeContext'

const ProfilePage = () => {
  const {theme} = useTheme();  

  return (
    <View style={[Styles.container, {backgroundColor:theme.backgroundColor}]}>
      <Text>ProfilePage</Text>
    </View>
  )
}

export default ProfilePage