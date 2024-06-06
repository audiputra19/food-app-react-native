import { StyleSheet } from "react-native";
import { COLORS } from "../../../themes/variables/colors";
import { FONTS, FONTWEIGHT } from "../../../themes/variables/fonts";

const Styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingHorizontal: 10,
      marginTop: 80,
      marginBottom: 15
    },
    button: {
      paddingLeft: 5,
      paddingRight: 20,
      paddingVertical: 5,
      borderRadius: 30,
      backgroundColor: COLORS.grayLight,
      margin: 5,
    },
    selectedButton: {
        backgroundColor: COLORS.amber,
    },
    buttonText: {
      paddingLeft: 10,
      color: COLORS.slateDark,
      fontFamily: FONTWEIGHT.bold
    },
    selectedButtonText: {
        color: COLORS.slateDark,
        fontFamily: FONTWEIGHT.bold
    },
    iconWrap: {
        padding: 10,
        backgroundColor: COLORS.white,
        borderRadius: 20
    },
    customBtn: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default Styles;