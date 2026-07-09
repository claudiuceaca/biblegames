import { useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { LevelConfig } from '../_data/levels';

type Props = {
  visible: boolean;
  onResume: () => void;
  score: number;      // 💡 ADĂUGAT: Scor curent
  lives: number;      // 💡 ADĂUGAT: Vieți rămase
  config: LevelConfig; // 💡 ADĂUGAT: Informații nivel (id, nume)
};

export default function PauseOverlay({ visible, onResume, score, lives, config }: Props) {
  useEffect(() => {
    if (visible) {
      console.log("⏸️ --- JOC SUSPENDAT (PAUZĂ) ---");
      console.log(`Nivel curent: ID ${config.id} - ${config.name}`);
      console.log(`Puncte acumulate: ${score}`);
      console.log(`Vieți rămase: ${lives} / 3`);
      console.log("-------------------------------");
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.pausedOverlay}>
      <View style={styles.container}>
        {/* Imaginea de fundal pentru ecranul de pauză generată de AI */}
        <Image 
          source={require('../assets/Pauza.png')} 
          style={styles.fullScreenBanner} 
        />

        {/* Butonul de continuat poziționat sub imagine */}
        <TouchableOpacity style={styles.actionButton} onPress={onResume}>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pausedOverlay: {
    // Înlocuit cu absoluteFillObject pentru a scăpa de erorile TypeScript de spread
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)', // Fundal întunecat la fel ca la GameOver
    zIndex: 250,
  },
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreenBanner: {
    width: '100%',
    height: 500, // Înălțime fixă pentru a lăsa loc butonului dedesubt
    resizeMode: 'contain',
    position:'relative'
  },
  actionButton: {
    position:'absolute',
    width:'50%',
    height:41,
    bottom:'38%',
    backgroundColor:'transparent'
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
    textAlign: 'center',
  },
});
