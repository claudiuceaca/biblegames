import { useEffect } from 'react';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';
import Svg, {
    Defs,
    Ellipse,
    LinearGradient,
    Path,
    RadialGradient,
    Stop,
} from 'react-native-svg';

type AppleProps = {
  size?: number;
  animated?: boolean;
};

export default function Apple({ size = 140, animated = true }: AppleProps) {
  // Shared values pentru cele două animații CSS distincte
  const fallValue = useSharedValue(0);
  const spinValue = useSharedValue(0);

  useEffect(() => {
    if (animated) {
      // Animația 1: apple-fall (translație verticală pe axa Y)
      fallValue.value = withRepeat(
        withTiming(1, {
          duration: 1200, // Jumătate din ciclul de 2.4s (sus-jos)
          easing: Easing.inOut(Easing.ease),
        }),
        -1, // Infinit
        true // Inversare sens automatică
      );

      // Animația 2: apple-spin (oscilație unghiulară la 3s liniar)
      spinValue.value = withRepeat(
        withTiming(1, {
          duration: 1500, // Jumătate din ciclul de 3s
          easing: Easing.linear,
        }),
        -1,
        true
      );
    } else {
      fallValue.value = 0;
      spinValue.value = 0;
    }
  }, [animated, fallValue, spinValue]);

  // Stilul animat extern (apple-fall -> translateY)
  const animatedFallStyle = useAnimatedStyle(() => {
    // Mapăm valoarea 0->1 în intervalul CSS de la -8px la 8px
    const translateY = fallValue.value * 16 - 8;
    return {
      transform: [{ translateY }],
    };
  });

  // Stilul animat intern (apple-spin -> rotate)
  const animatedSpinStyle = useAnimatedStyle(() => {
    // Mapăm valoarea 0->1 în intervalul de rotație de la -8deg la 8deg
    const rotate = `${spinValue.value * 16 - 8}deg`;
    return {
      transform: [
        { rotate },
      ],
    };
  });

  return (
    // Containerul principal care aplică animația de cădere/plutire
    <Animated.View
      style={[
        {
          width: size,
          height: size,
        },
        animatedFallStyle,
      ]}
    >
      {/* 
        Containerul secundar care aplică rotația din centrul mărului.
        transformOrigin pe web folosea 50% 55%, transformat aici în pixeli absoluți.
      */}
      <Animated.View
        style={[
          {
            width: '100%',
            height: '100%',
            transformOrigin: [size * 0.5, size * 0.55, 0],
          },
          animatedSpinStyle,
        ]}
      >
        <Svg viewBox="0 0 200 200" width="100%" height="100%">
          <Defs>
            {/* Gradient corp măr — roșu bogat */}
            <RadialGradient id="appleBody" cx="38%" cy="35%" r="75%">
              <Stop offset="0%" stopColor="#ff6b5b" />
              <Stop offset="45%" stopColor="#e53935" />
              <Stop offset="100%" stopColor="#8b1a1a" />
            </RadialGradient>

            {/* Gradient frunză */}
            <LinearGradient id="appleLeaf" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0%" stopColor="#66bb3a" />
              <Stop offset="100%" stopColor="#2e7d32" />
            </LinearGradient>

            {/* Highlight strălucire */}
            <RadialGradient id="appleShine" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#ffffff" stopOpacity={0.85} />
              <Stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
            </RadialGradient>
          </Defs>

          {/* Umbră jos */}
          <Ellipse cx="100" cy="185" rx="45" ry="6" fill="#000" opacity={0.2} />

          {/* CORP MĂR — formă clasică cu adâncitură sus */}
          <Path
            d="M 100 55 C 60 55, 30 85, 30 125 C 30 165, 60 180, 85 178 C 95 177, 105 177, 115 178 C 140 180, 170 165, 170 125 C 170 85, 140 55, 100 55 Z"
            fill="url(#appleBody)"
          />

          {/* Adâncitură sus (unde intră codița) */}
          <Path
            d="M 88 58 Q 100 68, 112 58"
            fill="none"
            stroke="#5a1010"
            strokeWidth="2.5"
            opacity={0.5}
            strokeLinecap="round"
          />

          {/* Codiță */}
          <Path
            d="M 100 60 Q 105 45, 112 35"
            fill="none"
            stroke="#4a2c1a"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Frunză */}
          <Path
            d="M 112 35 Q 135 25, 145 45 Q 130 55, 115 45 Z"
            fill="url(#appleLeaf)"
          />
          {/* Nervura frunzei */}
          <Path
            d="M 115 42 Q 128 40, 142 44"
            stroke="#1b5e20"
            strokeWidth="1.2"
            fill="none"
            opacity={0.6}
          />

          {/* Highlight strălucire stânga-sus */}
          <Ellipse
            cx="72"
            cy="90"
            rx="18"
            ry="26"
            fill="url(#appleShine)"
            transform="rotate(-25 72 90)"
          />

          {/* Reflex mic secundar */}
          <Ellipse
            cx="62"
            cy="130"
            rx="6"
            ry="10"
            fill="#ffffff"
            opacity={0.35}
            transform="rotate(-20 62 130)"
          />

          {/* Contur subtil pentru definire */}
          <Path
            d="M 100 55 C 60 55, 30 85, 30 125 C 30 165, 60 180, 85 178 C 95 177, 105 177, 115 178 C 140 180, 170 165, 170 125 C 170 85, 140 55, 100 55 Z"
            fill="none"
            stroke="#5a1010"
            strokeWidth="1.5"
            opacity={0.4}
          />
        </Svg>
      </Animated.View>
    </Animated.View>
  );
}