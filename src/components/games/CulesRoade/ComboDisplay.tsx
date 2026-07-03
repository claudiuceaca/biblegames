import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

type Props = {
  multiplier: number;
  streak: number;
};

export default function ComboDisplay({ multiplier, streak }: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const prevMult = useRef(0);

  useEffect(() => {
    if (multiplier > 1) {
      if (multiplier !== prevMult.current) {
        Animated.sequence([
          Animated.timing(scale, { toValue: 1.5, duration: 120, useNativeDriver: true }),
          Animated.timing(scale, { toValue: 1, duration: 200, useNativeDriver: true }),
        ]).start();
      }
      Animated.timing(opacity, { toValue: 1, duration: 150, useNativeDriver: true }).start();
    } else {
      Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }).start();
    }
    prevMult.current = multiplier;
  }, [multiplier, opacity, scale]);

  if (multiplier <= 1 && prevMult.current <= 1) return null;

  return (
    <Animated.View style={[styles.wrap, { opacity, transform: [{ scale }] }]}> 
      <Text style={styles.mult}>x{multiplier}</Text>
      <Text style={styles.label}>COMBO • {streak} la rând</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: 85,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 200, 0, 0.92)',
    borderRadius: 16,
    paddingHorizontal: 22,
    paddingVertical: 7,
    alignItems: 'center',
    zIndex: 100,
    elevation: 10,
  },
  mult: {
    fontSize: 34,
    fontWeight: '900',
    color: '#2a1800',
    lineHeight: 40,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#5a3a00',
    letterSpacing: 1,
  },
});
