import { useEffect } from 'react';
import { View } from 'react-native';
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
    Stop,
} from 'react-native-svg';

type BasketProps = {
  size?: number;
  animated?: boolean;
};

export default function BasketAnimated({ size = 220, animated = true }: BasketProps) {
  // Valoare partajată pentru rotație
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (animated) {
      // Inițiază o oscilație continuă între -3 și 3 grade
      rotation.value = withRepeat(
        withTiming(1, {
          duration: 1500, // Jumătate de ciclu (de la stânga la dreapta)
          easing: Easing.inOut(Easing.ease),
        }),
        -1, // Repetare infinită
        true // Inversare sens (înapoi și înainte)
      );
    } else {
      rotation.value = 0;
    }
  }, [animated, rotation]);

  // Stilul animat aplicat containerului
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          // Mapăm valoarea 0->1 în intervalul de rotație definit de CSS
          rotate: `${rotation.value * 6 - 3}deg`,
        },
      ],
    };
  });

  return (
    <View
      style={{
        width: size,
        height: size,
      }}
    >
      {/* 
        Containerul animat primește transformOrigin pe axa X: 50% și Y: 20%.
        În React Native, transformOrigin acceptă valori absolute în pixeli.
      */}
      <Animated.View
        style={[
          {
            width: '100%',
            height: '100%',
            transformOrigin: [size * 0.5, size * 0.2, 0],
          },
          animatedStyle,
        ]}
      >
        <Svg viewBox="0 0 200 200" width="100%" height="100%">
          <Defs>
            {/* Gradient corp coș — nuanțe de răchită */}
            <LinearGradient id="basketBody" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#c98a4b" />
              <Stop offset="50%" stopColor="#a86b2f" />
              <Stop offset="100%" stopColor="#6d4320" />
            </LinearGradient>

            {/* Gradient buză (rim) coș */}
            <LinearGradient id="basketRim" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#d89658" />
              <Stop offset="100%" stopColor="#8b5a2b" />
            </LinearGradient>

            {/* Gradient mâner */}
            <LinearGradient id="basketHandle" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0%" stopColor="#8b5a2b" />
              <Stop offset="50%" stopColor="#c98a4b" />
              <Stop offset="100%" stopColor="#8b5a2b" />
            </LinearGradient>

            {/* Interior coș (umbră) */}
            <LinearGradient id="basketInside" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#4a2d15" />
              <Stop offset="100%" stopColor="#2a1808" />
            </LinearGradient>
          </Defs>

          {/* MÂNER — arc peste coș */}
          <Path
            d="M 45 90 Q 100 20, 155 90"
            fill="none"
            stroke="url(#basketHandle)"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* Umbră mâner */}
          <Path
            d="M 48 92 Q 100 26, 152 92"
            fill="none"
            stroke="#5a3818"
            strokeWidth="3"
            strokeLinecap="round"
            opacity={0.5}
          />

          {/* CORP COȘ — trapezoidal cu bază rotunjită */}
          <Path
            d="M 30 95 Q 30 92, 34 90 L 166 90 Q 170 92, 170 95 L 158 170 Q 156 178, 148 180 L 52 180 Q 44 178, 42 170 Z"
            fill="url(#basketBody)"
          />

          {/* Interior coș (elipsă întunecată sus) */}
          <Ellipse cx="100" cy="92" rx="68" ry="10" fill="url(#basketInside)" />

          {/* BUZĂ COȘ (rim) */}
          <Ellipse
            cx="100"
            cy="90"
            rx="72"
            ry="12"
            fill="none"
            stroke="url(#basketRim)"
            strokeWidth="6"
          />

          {/* ȚESĂTURĂ RĂCHITĂ — linii verticale */}
          {Array.from({ length: 11 }).map((_, i) => {
            const x = 42 + i * 12;
            const topOffset = (i - 5) * 0.4;
            const bottomOffset = (i - 5) * 1.2;
            return (
              <Path
                key={`v-${i}`}
                d={`M ${x + topOffset} 100 L ${x + bottomOffset} 175`}
                stroke="#5a3818"
                strokeWidth="1.5"
                opacity={0.55}
                fill="none"
              />
            );
          })}

          {/* ȚESĂTURĂ RĂCHITĂ — linii orizontale curbate */}
          {Array.from({ length: 6 }).map((_, i) => {
            const y = 105 + i * 13;
            const inset = i * 1.8;
            return (
              <Path
                key={`h-${i}`}
                d={`M ${38 + inset} ${y} Q 100 ${y + 5}, ${162 - inset} ${y}`}
                stroke="#7a4a20"
                strokeWidth="2"
                opacity={0.65}
                fill="none"
              />
            );
          })}

          {/* Highlight lateral stânga */}
          <Path
            d="M 38 100 Q 34 140, 48 175"
            stroke="#e0a56a"
            strokeWidth="2.5"
            fill="none"
            opacity={0.6}
            strokeLinecap="round"
          />

          {/* Umbră lateral dreapta */}
          <Path
            d="M 162 100 Q 166 140, 152 175"
            stroke="#3d2410"
            strokeWidth="3"
            fill="none"
            opacity={0.5}
            strokeLinecap="round"
          />

          {/* Umbră jos pe sol */}
          <Ellipse cx="100" cy="188" rx="60" ry="5" fill="#000" opacity={0.25} />
        </Svg>
      </Animated.View>
    </View>
  );
}
