import { StyleSheet } from "react-native";
import { COLORS } from "../../themes/variables/colors";

const Styles = StyleSheet.create({
    alert: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(64, 64, 64, 0.9)',
        padding: 20,
        borderRadius: 10
    },
    alertTxt: {
        color: COLORS.white,
    },
    messageWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    viewTxt: {
        color: COLORS.white,
    }
})

export default Styles