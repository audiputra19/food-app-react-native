import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
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
})

export default Styles;