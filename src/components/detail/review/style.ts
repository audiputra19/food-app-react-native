import { StyleSheet } from "react-native";
import { FONTS, FONTWEIGHT } from "../../../themes/variables/fonts";
import { COLORS } from "../../../themes/variables/colors";

const Styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        marginBottom: 95
    },
    reviewTxt: {
        fontFamily: FONTWEIGHT.bold,
        fontSize: FONTS.xl,
        marginBottom: 15,
        marginTop: 5
    },
    card: {
        borderWidth: 1,
        borderColor: 'rgb(229 231 235)',
        borderRadius: 20,
    },
    reviewCol: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15
    },
    iconName: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.amber,
        width: 60,
        height: 60,
        borderRadius: 30
    },
    topCard: {
        flex: 1,
        paddingLeft: 15,
    },
    flexName: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: {
        fontSize: FONTS.xl,
        fontFamily: FONTWEIGHT.bold
    },
    rateWrap: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rateTxt: {
        marginLeft: 5,
        fontFamily: FONTWEIGHT.semibold
    },
    reviewSet: {
        marginTop: 20
    },
    review: {
        lineHeight: 18,
        fontSize: FONTS.sm,
        letterSpacing:0.5
    },
    dateWrap: {
        marginTop: 15
    },
    dateTxt: {
        fontSize: FONTS.xs
    },
    noReviewWrap: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    noReviewTxt: {
        fontSize: FONTS.lg,
        fontFamily: FONTWEIGHT.semibold
    }
})

export default Styles;