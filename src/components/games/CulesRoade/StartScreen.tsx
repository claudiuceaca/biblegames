import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { Difficulty } from './gameReducer';

type Props = {
  highScore: number;
  onStart: (difficulty: Difficulty) => void;
};

export default function StartScreen({ highScore, onStart }: Props) {
  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.title}>Cules de Roade</Text>

        {highScore > 0 && (
          <View style={styles.recordBox}>
            <Text style={styles.recordLabel}>RECORD PERSONAL</Text>
            <Text style={styles.recordValue}>⭐ {highScore} puncte</Text>
          </View>
        )}

        <Text style={styles.chooseLabel}>Alege dificultatea</Text>

        {([
          { d: 'easy', label: 'Ușor', sub: 'Ritm lent, câțiva spini', color: '#3d8c40' },
          { d: 'medium', label: 'Mediu', sub: 'Clasic', color: '#1565c0' },
          { d: 'hard', label: 'Greu', sub: 'Rapid, mulți spini', color: '#c62828' },
        ] as const).map(({ d, label, sub, color }) => (
          <TouchableOpacity
            key={d}
            style={[styles.btn, { backgroundColor: color }]}
            onPress={() => onStart(d)}
            activeOpacity={0.85}
          >
            <Text style={styles.btnLabel}>{label}</Text>
            <Text style={styles.btnSub}>{sub}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.55)',
    zIndex: 200,
    elevation: 2,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 28,
    width: '82%',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#1b3a0c',
    marginBottom: 18,
  },
  recordBox: {
    backgroundColor: '#fffbe6',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#ffc107',
  },
  recordLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9e6c00',
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  recordValue: {
    fontSize: 22,
    fontWeight: '900',
    color: '#c77800',
  },
  chooseLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 14,
  },
  btn: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  btnSub: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginTop: 2,
  },
});
