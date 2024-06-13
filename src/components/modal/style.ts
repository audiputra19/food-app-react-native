import { Dimensions, ScaledSize, StyleSheet } from "react-native";
import { COLORS } from "../../themes/variables/colors";
import { FONTS, FONTWEIGHT } from "../../themes/variables/fonts";

const windowSize: ScaledSize = Dimensions.get('window');
const width: number = windowSize.width;

const Styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: FONTS.xl,
        fontFamily: FONTWEIGHT.bold,
        marginBottom: 10,
        color: COLORS.slateDark
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        fontFamily: FONTWEIGHT.regular,
        color: COLORS.slateDark
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
    },
    cancelBtn: {
        backgroundColor: COLORS.grayMedium,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignSelf: 'center',
        marginRight: 15
    },
    okBtn: {
        backgroundColor: COLORS.amber,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20
    },
    cancelTxt: {
        color: COLORS.gray,
        fontSize: FONTS.lg,
        fontFamily: FONTWEIGHT.semibold
    },
    okTxt: {
        color: COLORS.slateDark,
        fontSize: FONTS.lg,
        fontFamily: FONTWEIGHT.semibold
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
      },
      overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1, 
      },
      modal: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        zIndex: 2,
      },
      closeButton: {
        marginTop: 10,
        alignItems: 'center',
      },
})

export default Styles