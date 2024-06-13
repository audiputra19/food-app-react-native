import { StyleSheet } from "react-native";
import { FONTS, FONTWEIGHT } from "../../themes/variables/fonts";
import { COLORS } from "../../themes/variables/colors";

const Styles = StyleSheet.create({
    container: {
       height: "100%"
    },
    subContainer: {
        paddingTop: 45,
        marginBottom: 110,
    },
    searchWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 15,
        paddingHorizontal: 15,
    },
    backWrap: {
        marginRight: 15
    },
    itemList: {
        paddingHorizontal: 15,
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
        padding: 15,
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
        fontSize: FONTS.lg
    },
    category: {
        color: COLORS.gray,
        fontFamily: FONTWEIGHT.bold,
        paddingVertical: 5,
    },
    price: {
        color: COLORS.slateDark,
        fontFamily: FONTWEIGHT.bold,
        fontSize: FONTS.lg,
        marginTop: 5
    },
    footCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
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

export default Styles