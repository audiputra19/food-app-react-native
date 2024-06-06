import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect, useState } from "react";
import { TouchableOpacity } from 'react-native';
import { COLORS } from '../../themes/variables/colors';
import { faThumbsUp as faThumbUpRegular } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../hooks/themeContext";

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [animate, setAnimate] = useState(false);
  const {theme} = useTheme();

  const handleClick = () => {
    setIsLiked(!isLiked);
    setAnimate(true);
  };

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setAnimate(false), 600); // Duration of the animation
      return () => clearTimeout(timer);
    }
  }, [animate]);

  return (
    <TouchableOpacity
      onPress={handleClick}
    >
      <FontAwesomeIcon
        icon={isLiked ? faThumbsUp : faThumbUpRegular}
        color={isLiked ? COLORS.blue : theme.colorDefault}
        size={23}
      />
    </TouchableOpacity>
  );
};

export default LikeButton;
