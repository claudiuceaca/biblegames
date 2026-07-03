import { memo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type Props = { score: number };

function ScorePanel({ score }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.scoreRow}>
        <Image source={require('@/assets/images/roade/Stea.png')} style={styles.scoreIcon} />
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.topScoreNumber}>{score}</Text>
          <Text style={styles.panelTitleSmall}>PUNCTE</Text>
        </View>
      </View>
    </View>
  );
}

export default memo(ScorePanel);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 12,
    top: 12,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'flex-start',
    zIndex: 50,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scoreIcon: {
    width: 24,
    height: 24,
  },
  topScoreNumber: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
  },
  panelTitleSmall: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
});
