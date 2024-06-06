import { Dimensions, ScaledSize, StyleSheet } from "react-native";
import { COLORS } from "../../themes/variables/colors";
import { FONTS, FONTWEIGHT } from "../../themes/variables/fonts";

const windowSize: ScaledSize = Dimensions.get('window');
const width: number = windowSize.width;

const Styles = StyleSheet.create({
    container: {
       height: "100%"
    },
    image: {
        width: width,
        height: 320
    },
    subContainer: {
        margin: 15
    },
    stickyBottom: {
        position: 'absolute',
        backgroundColor: COLORS.slateDark,
        bottom: 0,
        right: 0,
        left: 0,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    flexBottom: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    totPriceTxt: {
        fontSize: FONTS.xs,
        fontFamily: FONTWEIGHT.bold,
    },
    totPrice: {
        fontSize: FONTS.xxl,
        fontFamily: FONTWEIGHT.bold,
        color: COLORS.white
    },
    cartBtn: {
        backgroundColor: COLORS.amber,
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 30
    },
    flexCartBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cartTxt: {
        fontSize: FONTS.xl,
        fontFamily: FONTWEIGHT.bold,
        marginLeft: 10,
        color: COLORS.white
    }
})

export default Styles