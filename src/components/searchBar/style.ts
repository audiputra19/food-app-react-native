import { StyleSheet } from "react-native";
import { COLORS } from "../../themes/variables/colors";
import { FONTS, FONTWEIGHT } from "../../themes/variables/fonts";

const Styles = StyleSheet.create({
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        paddingHorizontal: 12,
        borderRadius: 18
    },
    textInput: {
        flex: 1,
        marginLeft: 15,
        height: 40
    },
})

export default Styles