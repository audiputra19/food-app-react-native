import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { FC, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { COLORS } from "../../themes/variables/colors";
import { useTheme } from "../../hooks/themeContext";

interface Props {
    color: string
}

const CartButton : FC<Props> = ({color}) => {
    const [loved, setLoved] = useState(false);
    const {theme} = useTheme();

    return (
        <View>
            <FontAwesomeIcon
              icon={faShoppingBag}
              size={18}
              color={color}
            />
        </View>
    );
}

export default CartButton;