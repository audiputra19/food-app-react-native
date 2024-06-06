import { FC } from "react";
import { Text, View } from "react-native";
import { FONTS, FONTWEIGHT } from "../../themes/variables/fonts";
import { COLORS } from "../../themes/variables/colors";

interface NameInitialsProps {
    name: string
}

const NameInitials: FC<NameInitialsProps> = ({ name }) => {
    const getInitials = (name: string): string => {
        const words = name.split(' ');
        const firstTwoWords = words.slice(0, 2);
        const initials = firstTwoWords.map(word => word[0]).join('');

        return initials;
    };

    return (
        <View>
            <Text 
                style={{ 
                    fontSize:FONTS.xxxl, 
                    fontFamily:FONTWEIGHT.bold, 
                    color:COLORS.white 
                }}>
                {getInitials(name)}
            </Text>
        </View>
    );
}

export default NameInitials;