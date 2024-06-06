import { StyleSheet } from "react-native";
import { COLORS } from "../../../themes/variables/colors";
import { FONTS, FONTWEIGHT } from "../../../themes/variables/fonts";

const Styles = StyleSheet.create({
    card: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginRight: 15,
        backgroundColor: COLORS.white,
        shadowColor: COLORS.gray,
        elevation: 4,
        marginBottom:20
    },
    image: {
        width: 170,
        height: 120,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    mainCard: {
        padding: 15,
        width: 170
    },
    textPop: {
        color: COLORS.slateDark,
        paddingHorizontal: 15,
        fontSize: FONTS.xl,
        paddingBottom: 15,
        fontFamily: FONTWEIGHT.bold
    },
    title: {
        color:COLORS.slateDark,
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
        alignItems: 'center'
    }
})

export default Styles;