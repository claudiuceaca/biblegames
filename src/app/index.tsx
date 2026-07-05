import GameCard from '@/components/GameCard';
import { useRouter } from 'expo-router';
import { ImageBackground, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('@/assets/images/roade/BackgroundHome1.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
         
          <View style={styles.gamesGrid}>
            <GameCard
              title="Cules de Roade"
              description="Prinde fructele și evită spini"
              icon={require('@/assets/images/roade/MarCard.png')}
              color="#3d8c40"
              onPress={() => router.push('/cules-roade')}
            />
            <GameCard
              title="Găsește Oaia Pierdută"
              description="În curând..."
              icon={require('@/assets/images/roade/OaieCard.png')}
              color="#1565c0"
              onPress={() => router.push('/gaseste-oaia')}
            />
            <GameCard
              title="Porumbeii Pacii"
              description="În curând..."
              icon={require('@/assets/images/roade/PorumbeiCard.png')}
              color="#ad1457"
              onPress={() => router.push('/porumbeii')}
            />
            <GameCard
              title="Arca lui Noe"
              description="În curând..."
              icon={require('@/assets/images/roade/NoaCard.png')}
              color="#c62828"
              disabled={true}
              onPress={() => {}}
            />
            <GameCard
              title="Urmărește Steaua"
              description="În curând..."
              icon={require('@/assets/images/roade/StarCard.png')}
              color="#e65c00"
              disabled={true}
              onPress={() => {}}
            />
            <GameCard
              title="Prinde Peștele"
              description="În curând..."
              icon={require('@/assets/images/roade/FishCard.png')}
              color="#00695c"
              disabled={true}
              onPress={() => {}}
            />
            {/* <GameCard
              title="Hrănește Mulțimea"
              description="În curând..."
              icon={require('@/assets/images/roade/HranesteCard.png')}
              color="#6a1b9a"
              disabled={true}
              onPress={() => {}}
            /> */}
            {/* <GameCard
              title="Goliat"
              description="În curând..."
              icon={require('@/assets/images/roade/GoliatCard.png')}
              color="#4527a0"
              disabled={true}
              onPress={() => {}}
            /> */}
            {/* <GameCard
              title="Memorie"
              description="În curând..."
              icon={require('@/assets/images/roade/MemoriCard.png')}
              color="#00838f"
              disabled={true}
              onPress={() => {}}
            /> */}
             {/* <GameCard
              title="Moise și Marea Roșie"
              description="În curând..."
              icon={require('@/assets/images/roade/SplitCard.png')}
              color="#00838f"
              disabled={true}
              onPress={() => {}}
            /> */}

          </View>
        </View>
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
  container: {
    flex: 1,
    padding: 20,
    justifyContent:'flex-end',
    paddingBottom: 100
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 20,
  },
  gamesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
