import { useEffect } from 'react';
import { Image } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const basket = require('../assets/Cos.png');

const fruitImages = {
  apple: require('../assets/Mar.png'),
  grape: require('../assets/Strugure.png'),
  wheat: require('../assets/Grau.png'),
  para: require('../assets/Para.png'),
  ananas: require('../assets/Ananas.png'),
};

const fruitSlots = {
  apple: { left: 80, top: 40 },     // centru
  para: { left: 50, top: 38 },      // stânga
  grape: { left: 105, top: 38 },    // dreapta
  wheat: { left: 30, top: 39 },     // stânga extrem
  ananas: { left: 130, top: 37 },   // dreapta extrem
};

type FruitType = keyof typeof fruitImages;

type Props = {
  basketContents: FruitType[];
};

export default function BasketAnimated({ basketContents }: Props) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(1, {
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${rotation.value * 6 - 3}deg`,
      },
    ],
  }));

  // ✅ AICI se elimină duplicatele
  const uniqueFruits = [...new Set(basketContents)];

  return (
    <Animated.View style={style}>
      <Image
        source={basket}
        style={{
          width: 200,
          height: 200,
          resizeMode: 'contain',
        }}
      />

      {uniqueFruits.map((fruit) => (
        <Image
          key={fruit}
          source={fruitImages[fruit]}
          style={{
            position: 'absolute',
            width: 40,
            height: 40,
            left: fruitSlots[fruit].left,
            top: fruitSlots[fruit].top,
          }}
        />
      ))}
    </Animated.View>
  );
}