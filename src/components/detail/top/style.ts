import { StyleSheet } from "react-native";
import { FONTS, FONTWEIGHT } from "../../../themes/variables/fonts";
import { COLORS } from "../../../themes/variables/colors";

const Styles = StyleSheet.create({
    title: {
        fontSize:FONTS.xxxl,
        fontFamily: FONTWEIGHT.bold,
    },
    flexTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    flexBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.amber,
        borderRadius: 30
    },
    decreases: {
        borderRadius: 30,
        padding: 15,
    },
    increase: {
        padding: 15,
    },
    number: {
        width: 35,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    numTxt: {
        fontSize: FONTS.xxl,
        color: COLORS.slateDark,
        fontFamily: FONTWEIGHT.semibold
    },
    flexRate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    flexDisc: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    discWrap: {
        paddingHorizontal: 6,
        paddingVertical: 3,
        backgroundColor: COLORS.redLight,
        borderRadius: 10,
        marginRight: 10
    },
    discTxt: {
        color: COLORS.redDark,
        fontFamily: FONTWEIGHT.bold
    },
    priceBeforeDisc: {
        color: COLORS.gray,
        fontFamily: FONTWEIGHT.semibold,
        textDecorationLine: 'line-through'
    },
    priceAfterDisc: {
        color: COLORS.slateDark,
        fontFamily: FONTWEIGHT.bold,
        fontSize: FONTS.xl,
        alignSelf: 'flex-end'
    },
    priceNotDisc: {
        color: COLORS.slateDark,
        fontFamily: FONTWEIGHT.bold,
        fontSize: FONTS.xl
    },
    rate: {
        fontFamily: FONTWEIGHT.semibold,
        marginLeft: 10,
        fontSize: FONTS.lg
    },
    flexStar: {
        flexDirection: 'row'
    },
    descTxt: {
        fontFamily: FONTWEIGHT.bold,
        fontSize: FONTS.xl,
        marginTop: 25,
    },
    reviewLength: {
        paddingTop: 1,
        marginLeft: 5,
        fontFamily: FONTWEIGHT.semibold
    }
})

export default Styles;