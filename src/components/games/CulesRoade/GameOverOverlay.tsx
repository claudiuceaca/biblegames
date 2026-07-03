import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Difficulty, SessionStats } from './gameReducer';

type Props = {
  visible: boolean;
  score: number;
  highScore: number;
  isNewRecord: boolean;
  stats: SessionStats;
  onStart: (difficulty: Difficulty) => void;
};

export default function GameOverOverlay({ visible, score, highScore, isNewRecord, stats, onStart }: Props) {
  if (!visible) return null;

  const maxComboLabel =
    stats.maxStreak >= 5 ? `x3 (${stats.maxStreak} la rând)` :
    stats.maxStreak >= 3 ? `x2 (${stats.maxStreak} la rând)` :
    stats.maxStreak > 0 ? `${stats.maxStreak} la rând` : '—';

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        {isNewRecord && (
          <View style={styles.newRecord}>
            <Text style={styles.newRecordText}>NOU RECORD!</Text>
          </View>
        )}

        <Text style={styles.title}>Runda s-a terminat</Text>
        <Text style={styles.score}>{score}</Text>
        <Text style={styles.scoreLabel}>puncte</Text>

        {!isNewRecord && highScore > 0 && (
          <Text style={styles.prevRecord}>Record: {highScore}</Text>
        )}

        <View style={styles.grid}>
          <StatCell label="Fructe prinse" value={String(stats.fruitsCaught)} color="#3d8c40" />
          <StatCell label="Spini prinși" value={String(stats.thornsHit)} color="#c62828" />
          <StatCell label="Combo maxim" value={maxComboLabel} color="#e65c00" />
          <StatCell
            label="Precizie"
            value={
              stats.fruitsCaught + stats.thornsHit > 0
                ? `${Math.round((stats.fruitsCaught / (stats.fruitsCaught + stats.thornsHit)) * 100)}%`
                : '—'
            }
            color="#1565c0"
          />
        </View>

        <Text style={styles.nextLabel}>Alege nivelul pentru următoarea rundă</Text>
        <View style={styles.buttons}>
          {([
            { d: 'easy', label: 'Ușor', color: '#3d8c40' },
            { d: 'medium', label: 'Mediu', color: '#1565c0' },
            { d: 'hard', label: 'Greu', color: '#c62828' },
          ] as const).map(({ d, label, color }) => (
            <TouchableOpacity key={d} style={[styles.btn, { backgroundColor: color }]} onPress={() => onStart(d)}>
              <Text style={styles.btnText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

function StatCell({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <View style={styles.statCell}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
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
    padding: 24,
    width: '85%',
    alignItems: 'center',
  },
  newRecord: {
    backgroundColor: '#ffc107',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 5,
    marginBottom: 10,
  },
  newRecordText: { fontWeight: '900', fontSize: 13, color: '#5a3a00', letterSpacing: 1 },
  title: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 4 },
  score: { fontSize: 52, fontWeight: '900', color: '#1b3a0c', lineHeight: 58 },
  scoreLabel: { fontSize: 14, color: '#666', marginBottom: 6 },
  prevRecord: { fontSize: 13, color: '#888', marginBottom: 16 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    marginVertical: 16,
  },
  statCell: {
    width: '50%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  statValue: { fontSize: 20, fontWeight: '900' },
  statLabel: { fontSize: 12, color: '#888', marginTop: 2, textAlign: 'center' },
  nextLabel: { fontSize: 13, color: '#666', marginBottom: 12, textAlign: 'center' },
  buttons: { flexDirection: 'row', width: '100%' },
  btn: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: '800', fontSize: 15 },
});
