import { COLORS } from "../variables/colors";

export const lightTheme = {
    backgroundColor: COLORS.background,
    backgroundDetail: COLORS.white,
    backgroundTab: COLORS.slateDark,
    backgroundIcon: COLORS.grayLight,
    colorDefault: COLORS.slateDark,
    colorTxt: COLORS.gray,
    priceTxt: COLORS.amber,
    card: COLORS.white,
    cardTxt: COLORS.slateDark,
    shadow: 4,
};

export const darkTheme = {
    backgroundColor: COLORS.slateDark,
    backgroundDetail: COLORS.slateDark,
    backgroundTab: COLORS.slate,
    backgroundIcon: COLORS.white,
    colorDefault: COLORS.white,
    colorTxt: COLORS.white,
    priceTxt: COLORS.gray,
    card: COLORS.slate,
    cardTxt: COLORS.amber,
    shadow: 0,
};

export type Theme = typeof lightTheme;
