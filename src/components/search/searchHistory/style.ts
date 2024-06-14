import { StyleSheet } from "react-native";
import { COLORS } from "../../../themes/variables/colors";

const Styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 5
    },
    suggestionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 13,
    },
    suggestionContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    suggestionText: {
        marginLeft: 15,
        fontWeight: 'bold',
    },
    btnClearHist: {
        marginTop: 15,
        padding: 15,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    clearHistTxt: {
        color: COLORS.white,
    }
})

export default Styles;