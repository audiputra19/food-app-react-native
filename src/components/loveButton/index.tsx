import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { COLORS } from "../../themes/variables/colors";
import { useTheme } from "../../hooks/themeContext";

const LoveButton = () => {
    const [loved, setLoved] = useState(false);
    const {theme} = useTheme();

    const toggleLove = () => {
        setLoved(!loved);
    }

    return (
        <View>
            <FontAwesomeIcon
              icon={loved ? faHeart : faHeartRegular}
              size={20}
              color={loved ? COLORS.red : COLORS.slateDark}
            />
        </View>
    );
}

export default LoveButton;