import Game from '@/components/games/CulesRoade/Game';
import { useRouter } from 'expo-router';
import { ImageBackground, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CulesRoadeScreen() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <ImageBackground
      source={require('@/assets/images/roade/Background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <Game onBack={handleBack} />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});
