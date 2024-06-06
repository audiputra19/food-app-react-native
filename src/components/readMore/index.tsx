import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Styles from "./style";
import { useTheme } from "../../hooks/themeContext";

interface props {
    text: string;
    maxLength: number;
}

const ReadMoreComponent: React.FC<props> = ({ text, maxLength }) => {
    const [isReadMore, setIsReadMore] = useState(true);
    const {theme} = useTheme();
  
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
  
    const renderText = () => {
      if (!text || typeof text !== 'string') {
        return '';
      }  

      if (isReadMore) {
        return text.length > maxLength ? text.substring(0, maxLength) : text;
      } else {
        return text;
      }
    };
  
    return (
      <View style={Styles.container}>
        <Text style={[Styles.desc, {color:theme.colorTxt}]}>{renderText()}</Text>
        {text && text.length > maxLength && (
          <TouchableOpacity onPress={toggleReadMore}>
            <Text style={[Styles.readMore, {color:theme.colorTxt}]}>{isReadMore ? 'Read More' : 'Read Less'}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  
  export default ReadMoreComponent;