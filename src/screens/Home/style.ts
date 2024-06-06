import { StyleSheet } from "react-native";
import { COLORS } from "../../themes/variables/colors";

const Styles = StyleSheet.create({
    container: {
        paddingTop:30,
        backgroundColor: COLORS.background,
        height: "100%",
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stickyContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        paddingTop: 30,
    }
})

export default Styles