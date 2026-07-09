import { useEffect } from 'react'; // ADĂUGAT: useEffect pentru console.log
import { Image, StyleSheet, View } from 'react-native';
import { Difficulty, SessionStats } from '../_reducers/gameReducer';

type Props = {
  visible: boolean;
  score: number;
  highScore: number;
  isNewRecord: boolean;
  stats: SessionStats;
  onStart: (difficulty: Difficulty) => void;
  isVictory: boolean;
};

export default function GameOverOverlay({ visible, score, highScore, isNewRecord, stats, onStart, isVictory }: Props) {
  
  // Printează automat toate datele în consolă când apare ecranul de final
  useEffect(() => {
    if (visible) {
      console.log("--- STATISTICI RUNDĂ TERMINATĂ ---");
      console.log(`Rezultat: ${isVictory ? "VICTORIE" : "ÎNFRÂNGERE"}`);
      console.log(`Scor curent: ${score}`);
      console.log(`Cel mai bun scor (Highscore): ${highScore}`);
      console.log(`Este record nou?: ${isNewRecord ? "DA" : "NU"}`);
      console.log(`Fructe prinse: ${stats.fruitsCaught}`);
      console.log(`Spini (cactuși) prinși: ${stats.thornsHit}`);
      console.log(`Cel mai lung streak: ${stats.maxStreak}`);
      console.log("---------------------------------");
    }
  }, [visible]);

  if (!visible) return null;

  // Selectează imaginea potrivită
  const bannerImage = isVictory 
    ? require('../assets/FinishGame.png') 
    : require('../assets/GameOver.png');

  return (
    <View style={styles.overlay}>
      {/* Containerul afișează acum strict doar imaginea ta de final */}
      <Image source={bannerImage} style={styles.fullScreenBanner} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.65)', // Fundal întunecat pentru a scoate imaginea în evidență
    zIndex: 200,
    elevation: 2,
  },
  // Stilizat pentru ca imaginea generată să se vadă mare și clară pe mijlocul ecranului
  fullScreenBanner: {
    width: '85%',
    height: '60%',
    resizeMode: 'contain',
  },
});
