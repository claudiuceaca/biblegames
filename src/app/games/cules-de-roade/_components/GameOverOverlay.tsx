import { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Difficulty, SessionStats } from '../_reducers/gameReducer';

type Props = {
  visible: boolean;
  score: number;
  highScore: number;
  isNewRecord: boolean;
  stats: SessionStats;
  onStart: (difficulty: Difficulty) => void;
  isVictory: boolean;
  onContinue: () => void; // 💡 ADĂUGAT: Funcție pentru a continua sau reîncerca
};

export default function GameOverOverlay({ visible, score, highScore, isNewRecord, stats, onStart, isVictory, onContinue }: Props) {
  
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

  const bannerImage = isVictory 
    ? require('../assets/FinishGame.png') 
    : require('../assets/GameOver.png');

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        {/* Imaginea ta de la AI */}
        <Image source={bannerImage} style={styles.fullScreenBanner} />

        {/* 💡 BUTONUL DINAMIC DE CONTINUARE / REÎNCERCARE */}
        <TouchableOpacity style={styles.actionButton} onPress={onContinue}>
          <Text style={styles.actionButtonText}>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)', 
    zIndex: 200,
    elevation: 2,
  },
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreenBanner: {
    width: '100%',
    height: 450, // Înălțime fixă pentru a lăsa loc butonului dedesubt
    resizeMode: 'contain',
    position:'relative',
  },
  actionButton: {
    paddingHorizontal: 40,
    position:'absolute',
    bottom: 145
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
    textAlign: 'center',
  },
});
