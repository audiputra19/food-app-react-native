import { StyleSheet } from "react-native";
import { COLORS } from "../../../themes/variables/colors";
import { FONTS, FONTWEIGHT } from "../../../themes/variables/fonts";

const Styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.grayLight,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 18
    },
    placeholder: {
        marginLeft: 15,
        color: COLORS.slateDark,
        fontFamily: FONTWEIGHT.semibold,
        fontSize: FONTS.md
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    cartWrap: {
        position: 'absolute',
        backgroundColor: COLORS.red,
        alignSelf: 'flex-end',
        marginTop: -9,
        zIndex: 999,
        paddingHorizontal: 5,
        borderRadius: 6
    },
    cartTxt: {
        color: COLORS.white,
        fontSize: 11,
        fontFamily: FONTWEIGHT.bold    
    }
})

export default Styles;