import { StyleSheet } from "react-native";
import { FONTS, FONTWEIGHT } from "../../themes/variables/fonts";
import { COLORS } from "../../themes/variables/colors";

const Styles = StyleSheet.create({
    container: {
       height: "100%"
    },
    subContainer: {
        marginTop: 90,
        paddingHorizontal: 15,
        marginBottom: 80
    },
    stickySearch: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        paddingTop: 45,
        paddingHorizontal: 15,
        paddingBottom: 15
    },
    titleHist: {
        fontSize: FONTS.xxxl,
        fontFamily: FONTWEIGHT.bold
    },
    titleHistWrap: {
        marginTop: 20,
        marginBottom: 15
    },
    card: {
        padding: 15,
        marginBottom: 15,
        borderRadius: 20,
        shadowColor: COLORS.gray,
    },
    title: {
        fontSize: FONTS.xl,
        fontFamily: FONTWEIGHT.bold
    },
    cardItem: {
        paddingBottom: 5,
        flexDirection: 'row'
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 15
    },
    titleWrap: {
        flex: 1,
        marginHorizontal: 15 
    },
    qty: {
        fontFamily: FONTWEIGHT.regular,
        fontSize: FONTS.sm
    },
    itemMore: {
        fontSize: FONTS.xs
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    totalWrap: {
        marginTop: 15,
    },
    totalTxt: {
        fontSize: 12
    },
    total: {
        fontFamily: FONTWEIGHT.bold
    },
    btnBuyMore: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: COLORS.amber,
    },
    buyMoreTxt: {
        fontFamily: FONTWEIGHT.bold,
        color: COLORS.slateDark
    },
    dateWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },
    dateTxt: {
        color: COLORS.amber,
        marginRight: 5,
        fontFamily: FONTWEIGHT.bold
    },
    date: {
        fontSize: FONTS.sm,
        fontFamily: FONTWEIGHT.regular
    },
    noItemWrap: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    noItemTxt: {
        fontFamily: FONTWEIGHT.semibold,
        fontSize: FONTS.xl
    },
})

export default Styles