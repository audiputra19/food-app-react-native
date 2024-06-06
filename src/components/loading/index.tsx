import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Animated, Easing, View } from "react-native";
import { COLORS } from "../../themes/variables/colors";
import { useEffect, useRef } from "react";
import Styles from "./style";
import { useTheme } from "../../hooks/themeContext";

const Loading = () => {

    const spinValue = useRef(new Animated.Value(0)).current;
    const {theme} = useTheme();

    useEffect(() => {
        const spin = () => {
        spinValue.setValue(0);
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => spin());
        };
        spin();
    }, [spinValue]);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={[Styles.loading,{backgroundColor:theme.backgroundColor}]}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <FontAwesomeIcon icon={faSpinner} size={40} color={COLORS.amber} />
            </Animated.View>  
        </View>
    )
}

export default Loading;