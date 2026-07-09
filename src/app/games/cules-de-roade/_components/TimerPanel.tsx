import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = { timeLeft: number };

function TimerPanel({ timeLeft }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.timerRow}>
        <Text style={styles.timerIcon}>⏱</Text>
        <Text style={styles.timerText}>{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2,'0')}</Text>
      </View>
    </View>
  );
}

export default memo(TimerPanel);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 12,
    left: '38%',
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
    zIndex: 50,
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerIcon: {
    fontSize: 25,
    marginRight: 8,
    color: '#fff',
  },
  timerText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 18,
  },
});
