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
    },
    headerBar: {
        position: 'absolute',
        zIndex: 1,
        width: "100%",
        paddingTop: 45,
        paddingHorizontal: 15,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btnBack: {
        backgroundColor: COLORS.white,
        padding: 14,
        borderRadius: 15
    },
    btnCart: {
        padding: 12,
        borderRadius: 15 
    },
    cartWrap: {
        position: 'absolute',
        backgroundColor: COLORS.red,
        alignSelf: 'flex-end',
        marginTop: -9,
        zIndex: 1,
        paddingHorizontal: 5,
        borderRadius: 6,
    },
    cartLengthTxt: {
        color: COLORS.white,
        fontSize: 11,
        fontFamily: FONTWEIGHT.bold    
    },
    btnRightWrap: {
        flexDirection: 'row',
    },
})

export default Styles