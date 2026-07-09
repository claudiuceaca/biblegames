import { useRouter } from 'expo-router';
import { Dimensions, Image, ImageBackground, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Calculăm dinamic lățimea pentru 3 imagini pe rând
const { width } = Dimensions.get('window');
// Scădem marginile laterale (20 stânga + 20 dreapta = 40) și spațiile dintre carduri (aprox. 16)
const CARD_WIDTH = (width - 56) / 3; 

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('@/assets/images/BackgroundHome1.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
         
          <View style={styles.gamesGrid}>
            
            {/* --- RÂNDUL 1 --- */}
            {/* 1. Cules de Roade */}
           <TouchableOpacity 
            style={styles.imageButton}
            // MODIFICAT: Calea completă către folderul jocului
            onPress={() => router.push('/games/cules-de-roade')} 
            activeOpacity={0.8}
          >
            <Image 
              source={require('@/assets/images/homescreen/roade.png')} 
              style={styles.gameImage}
              resizeMode="contain"
            />
          </TouchableOpacity>

            {/* 2. Găsește Oaia Pierdută */}
            <TouchableOpacity 
            style={styles.imageButton}
            // MODIFICAT: Calea completă către folderul jocului respectiv
            onPress={() => router.push('/games/cules-de-roade')} 
            activeOpacity={0.8}
          >
            <Image 
              source={require('@/assets/images/homescreen/oaia.png')} 
              style={styles.gameImage}
              resizeMode="contain"
            />
          </TouchableOpacity>


            {/* 3. Porumbeii Păcii */}
            <TouchableOpacity 
            style={styles.imageButton}
            // MODIFICAT: Calea completă către folderul jocului respectiv
            onPress={() => router.push('/games/cules-de-roade')} 
            activeOpacity={0.8}
          >
            <Image 
              source={require('@/assets/images/homescreen/porumbeii.png')} 
              style={styles.gameImage}
              resizeMode="contain"
            />
            </TouchableOpacity>

            {/* --- RÂNDUL 2 --- */}
            {/* 4. Arca lui Noe (Dezactivat) */}
            <TouchableOpacity 
              style={[styles.imageButton, styles.disabledButton]}
              disabled={true}
            >
              <Image 
                source={require('@/assets/images/homescreen/noe.png')} 
                style={styles.gameImage}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* 5. Urmărește Steaua (Dezactivat) */}
            <TouchableOpacity 
              style={[styles.imageButton, styles.disabledButton]}
              disabled={true}
            >
              <Image 
                source={require('@/assets/images/homescreen/steaua.png')} 
                style={styles.gameImage}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* 6. Prinde Peștele (Dezactivat) */}
            <TouchableOpacity 
              style={[styles.imageButton, styles.disabledButton]}
              disabled={true}
            >
              <Image 
                source={require('@/assets/images/homescreen/peste.png')} 
                style={styles.gameImage}
                resizeMode="contain"
              />
            </TouchableOpacity>

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
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    paddingBottom: '25%', // Menținem spațiul de siguranță pentru navbar-ul custom
  },
  gamesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageButton: {
    width: CARD_WIDTH,
    height: CARD_WIDTH, // Format pătrat perfect (1:1)
    marginBottom: 7,   // Spațiu mic între cele două rânduri
    overflow: 'hidden',
  },
  gameImage: {
    width: '100%',
    height: '100%',
  },
  disabledButton: {
    opacity: 0.5, // Efect vizual de opacitate scăzută pentru jocurile viitoare
  },
});
