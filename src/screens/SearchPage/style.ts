import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
    container: {
       height: "100%"
    },
    subContainer: {
        paddingTop: 45,
        paddingHorizontal: 15
    },
    searchWrap: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    backWrap: {
        marginRight: 15
    },
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