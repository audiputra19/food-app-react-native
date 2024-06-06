import { StyleSheet } from "react-native";
import { FONTS, FONTWEIGHT } from "../../../themes/variables/fonts";
import { COLORS } from "../../../themes/variables/colors";

const Styles = StyleSheet.create({
    container: {
        padding: 30,
    },
    sticky: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    subTotalWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    subTotalTxt: {
        fontSize: FONTS.lg,
        fontFamily: FONTWEIGHT.bold
    },
    subTotal: {
        fontSize: FONTS.lg,
        fontFamily: FONTWEIGHT.bold
    },
    total: {
        fontSize: FONTS.xl,
        fontFamily: FONTWEIGHT.bold
    },
    totalTxt: {
        fontSize: FONTS.xl,
        fontFamily: FONTWEIGHT.bold
    },
    subContainer: {
        paddingHorizontal: 15,
        paddingBottom: 15
    },
    checkoutBtn: {
        backgroundColor: COLORS.amber,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 20
    },
    checkoutTxt: {
        color: COLORS.slateDark,
        fontSize: FONTS.xl,
        fontFamily: FONTWEIGHT.bold
    }
})

export default Styles;