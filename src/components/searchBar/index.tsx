import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { FC, ForwardRefRenderFunction, ForwardedRef, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleXmark, faSearch } from '@fortawesome/free-solid-svg-icons'
import Styles from './style'
import { COLORS } from '../../themes/variables/colors'
import { useTheme } from '../../hooks/themeContext'

interface Props {
    placeholder: string;
    editable: boolean;
    focus: boolean;
    value?: string;
    onChangeText?: (text: string) => void;
    onSubmitEditing?: () => void;
    clearKeyword?: () => void;
}


const SearchBar : FC<Props> = ({ 
  placeholder, 
  editable, 
  focus, 
  value = '', 
  onChangeText = () => {}, 
  onSubmitEditing = () => {},
  clearKeyword = () => {}
}) => {
  
  const {theme} = useTheme(); 
  const inputRef = useRef<TextInput>(null); 
  

  return (
    <View style={[Styles.search, {borderColor:COLORS.gray}]}>
        <FontAwesomeIcon icon={faSearch} size={16} color={theme.colorDefault}/>
        <TextInput 
            style={[Styles.textInput, {color:theme.colorDefault}]}
            placeholder={placeholder}
            placeholderTextColor={COLORS.gray}
            editable={editable}
            autoFocus={focus}
            ref={inputRef}
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            returnKeyType="search"
        />
        { 
          value!=='' ? (
            <TouchableOpacity
              onPress={clearKeyword}
            >
              <FontAwesomeIcon icon={faCircleXmark} size={16} color={theme.colorDefault} />
            </TouchableOpacity>
          ) : null
        }
    </View>
  )
}

export default SearchBar