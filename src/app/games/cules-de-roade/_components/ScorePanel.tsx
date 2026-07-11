import { memo } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';

type Props = { score: number };

function ScorePanel({ score }: Props) {
  return (
     <ImageBackground 
        style={styles.container} 
        source={require('../assets/bannerSimple.png')} 
        resizeMode="contain"> 
      <View style={styles.scoreRow}>
        <Image source={require('../assets/Stea.png')} style={styles.scoreIcon} />
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.topScoreNumber}>{score}</Text>
          <Text style={styles.panelTitleSmall}>PUNCTE</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

export default memo(ScorePanel);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 4,
    top: 4,
    paddingLeft: 25,
    paddingVertical: 15,
    alignItems: 'flex-start',
    zIndex: 150,
    height: 60,
    width: 140,
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
