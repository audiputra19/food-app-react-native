import { StyleSheet } from "react-native";
import { COLORS } from "../../../themes/variables/colors";
import { FONTS, FONTWEIGHT } from "../../../themes/variables/fonts";

const Styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        marginBottom: 60
    },
    card: {
        borderRadius: 20,
        backgroundColor: COLORS.white,
        shadowColor: COLORS.gray,
        elevation: 4,
        marginBottom: 15,
        marginRight: 13
    },
    image: {
        width: '100%',
        height: 140,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    mainCard: {
        paddingTop: 15,
        width: '100%'
    },
    textDiscover: {
        color: COLORS.slateDark,
        fontSize: FONTS.xl,
        fontFamily: FONTWEIGHT.bold,
        paddingBottom: 15,
    },
    title: {
        color: COLORS.slateDark,
        fontFamily: FONTWEIGHT.bold,
        fontSize: FONTS.lg,
        paddingHorizontal: 15
    },
    category: {
        color: COLORS.gray,
        fontFamily: FONTWEIGHT.bold,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    price: {
        color: COLORS.slateDark,
        fontFamily: FONTWEIGHT.bold,
        fontSize: FONTS.lg,
        marginTop: 5,
        paddingHorizontal: 15
    },
    footCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        marginLeft: 15,
        marginBottom: 5
    },
    priceWrap: {
        flexDirection: 'row',
    },
    customDisc: {
        backgroundColor: COLORS.redLight,
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 3,
        marginLeft: 10
    },
    discTxt: {
        fontSize: FONTS.xs,
        color: COLORS.redDark,
        fontFamily: FONTWEIGHT.bold
    },
    rateWrap: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rateTxt: {
        fontSize: FONTS.xs,
        paddingLeft: 5,
        fontWeight: '900'
    }
})

export default Styles;