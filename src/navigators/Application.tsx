import React, { FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import Main from './Main'
import { createStackNavigator } from '@react-navigation/stack'
import { StatusBar } from 'react-native'

const Stack = createStackNavigator();

const Application: FC = () => {
  return (
    <>
        <NavigationContainer>
            <StatusBar
                translucent
                backgroundColor="transparent"
            />
            <Stack.Navigator 
                screenOptions={{ 
                    headerShown: false 
                }}
            >
                <Stack.Screen 
                    name='Main'
                    component={Main}
                />
            </Stack.Navigator>
        </NavigationContainer>
    </>
  )
}

export default Application