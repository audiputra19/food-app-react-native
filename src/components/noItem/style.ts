import { StyleSheet } from "react-native";
import { FONTS, FONTWEIGHT } from "../../themes/variables/fonts";

const Styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    noItemTxt: {
        fontFamily: FONTWEIGHT.semibold,
        fontSize: FONTS.xl
    },
})

export default Styles