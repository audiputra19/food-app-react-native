import { Dimensions, ScaledSize, StyleSheet } from "react-native";
import { COLORS } from "../../themes/variables/colors";
import { FONTS, FONTWEIGHT } from "../../themes/variables/fonts";

const windowSize: ScaledSize = Dimensions.get('window');
const width: number = windowSize.width;

const Styles = StyleSheet.create({
    container: {
       height: "100%",
       paddingHorizontal: 15
    },
    subContainer: {
        marginBottom: 245,
        paddingVertical: 15
    },
    titleCart: {
        fontSize: FONTS.xxxl,
        fontFamily: FONTWEIGHT.bold
    },
    img: {
        width: 90,
        height: 90,
        borderRadius: 20
    },
    prodListWrap: {
        marginTop: 20
    },
    gap: {
        marginBottom: 20
    },
    prodList: {
        flexDirection: 'row'
    },
    main: {
        flex:1
    },
    title: {
        fontSize: FONTS.lg,
        fontFamily: FONTWEIGHT.bold
    },
    titleWrap: {
        marginHorizontal: 15,
        marginTop: 10,
    },
    plusBtn: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: COLORS.gray,
        alignSelf: 'center'
    },
    minusBtn: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: COLORS.amber,
        alignSelf: 'center'
    },
    qtyButton: {
        flexDirection: 'row',
    },
    qtyTxt: {
        fontSize: FONTS.xl,
        fontFamily: FONTWEIGHT.semibold
    },
    qtyWrap: {
        padding: 10
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        alignItems: 'center',
    },
    price: {
        fontSize: FONTS.lg,
        fontFamily: FONTWEIGHT.semibold
    },
    priceLine: {
        textDecorationLine: 'line-through',
        fontSize: FONTS.xs 
    },
    delIcon: {
        position: 'absolute',
        zIndex: 1,
        backgroundColor: COLORS.slateDark,
        opacity: 0.4,
        padding: 10,
        marginLeft: 23,
        marginTop: 23,
        borderRadius: 10
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