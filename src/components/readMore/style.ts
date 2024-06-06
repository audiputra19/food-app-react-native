import { StyleSheet } from "react-native"
import { FONTS, FONTWEIGHT } from "../../themes/variables/fonts"

const Styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    desc: {
        fontSize: FONTS.md,
        fontFamily: FONTWEIGHT.regular,
        lineHeight: 23,
        
    },
    readMore: {
        marginTop: 3,
        fontFamily: FONTWEIGHT.bold,
        fontSize: FONTS.md
    }
})

export default Styles