import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  DimensionValue,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View
} from "react-native";

import { LEVELS } from "./_data/levels";

export default function LevelMapScreen() {
  const [unlockedLevel, setUnlockedLevel] = useState<number>(1);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Încarcă dinamic progresul din stocarea locală a telefonului
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const savedLevel = await AsyncStorage.getItem("maxUnlockedLevel");
        if (savedLevel !== null) {
          setUnlockedLevel(parseInt(savedLevel, 10));
        } else {
          await AsyncStorage.setItem("maxUnlockedLevel", "1");
        }
      } catch (error) {
        console.log("Eroare la încărcarea progresului local:", error);
      }
    };

    loadProgress();
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleLevelPress = (levelId: number) => {
    if (levelId > unlockedLevel) return;

    // Trimite către joc tot obiectul de configurare al acelui nivel selectat
    router.push({
      pathname: "/games/cules-de-roade/play",
      params: { level: levelId },
    });
  };

  const handleMapPress = (event: any) => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const { locationX, locationY } = event.nativeEvent;
    const pctX = ((locationX / dimensions.width) * 100).toFixed(1);
    const pctY = ((locationY / dimensions.height) * 100).toFixed(1);

    console.log(`position: { x: "${pctX}%", y: "${pctY}%" },`);
  };

  return (
    <View 
      style={styles.container} 
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        setDimensions({ width, height });
      }}
    >
      <Pressable 
        onPress={handleMapPress} 
        style={StyleSheet.absoluteFillObject}
      >
        <ImageBackground
          source={require("./assets/LevelsMap.png")}
          resizeMode="cover"
          style={styles.container}
        >
          {/* Back */}
          <Pressable style={styles.backButton} onPress={handleBack} />

          {/* Randează automat toate cele 12 nivele */}
          {LEVELS.map((level) => {
            const isUnlocked = level.id <= unlockedLevel;

            return (
              <Pressable
                key={level.id}
                onPress={() => handleLevelPress(level.id)}
                style={[
                  styles.levelButton,
                  {
                    left: level.position.x as DimensionValue,
                    top: level.position.y as DimensionValue,
                    transform: [{ translateX: -50 }, { translateY: -50 }]
                  },
                ]}
              >
                {isUnlocked ? (
                  // Citește automat calea de deblocare specifică din obiectul level
                  <Image 
                    source={level.iconUnlocked} 
                    style={styles.baseImage} 
                  />
                ) : (
                  // Citește automat calea de lăcat specifică din obiectul level
                  <Image 
                    source={level.iconLocked} 
                    style={styles.baseImage} 
                  />
                )}
              </Pressable>
            );
          })}
        </ImageBackground>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backButton: {
    position: "absolute",
    top: 25,
    left: 5,
    width: 60,
    height: 60,
    borderRadius: 30,
    zIndex: 100,
  },
  levelButton: {
    position: "absolute",
    width: 100,   
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  // Ajustat stilul imaginii compacte pentru a folosi înălțimi proporționale corecte (pătrat 80x80 sau cerc)
  baseImage: {
    position: "absolute",
    width: 80,         
    height: 80,        
    resizeMode: "contain",
  },
});
