import Animated from "react-native-reanimated";

export default function Dove({
    x,
    y,
    image,
    onPress,
}) {

    return (
        <Animated.Image
            source={image}
            onTouchEnd={onPress}
            style={{
                position:"absolute",
                left:x,
                top:y,
                width:70,
                height:70,
            }}
        />
    );

}