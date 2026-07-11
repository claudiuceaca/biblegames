import { ImageBackground } from "expo-image";
import { useState } from "react";
import { Image, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";

import { router } from "expo-router";
import { levels } from "@/components/games/GasesteOaia/levels";
import GameHUD from "./_components/GameHud";
import StartOverlayOaie from "./_components/StartOverlayOaie";
import PauseOverlay from "./_components/PauseOverlay";
import WinOverlay from "./_components/WinOverlay";
import LevelSelectOverlay from "./_components/LevelSelectOverlay";


type OverlayType = "start" | "pause" | "win" | "levels" | null;

export default function Game() {
  const [level, setLevel] = useState(0);
  const [overlay, setOverlay] = useState<OverlayType>("start");
  
  // 1. Am adăugat starea corectă pentru coordonatele oii găsite
  const [foundCoordinates, setFoundCoordinates] = useState<{ x: number; y: number } | null>(null);

  const currentLevel = levels[level];

  const nextLevel = () => {
    setFoundCoordinates(null); // Resetăm cercul galben pentru următorul nivel
    if (level < levels.length - 1) {
      setLevel(level + 1);
      setOverlay(null);
    } else {
      setLevel(0);
      setOverlay("start");
    }
  };

const handleBackgroundPress = (event: any) => {
  if (overlay !== null || foundCoordinates !== null) return;

  const { pageX, pageY } = event.nativeEvent;
  const clickX = Math.round(pageX);
  const clickY = Math.round(pageY);

  console.log(`Click detectat la -> X: ${clickX}, Y: ${clickY}`);

  // Luăm doar punctul central (x, y) din obiectul oii
  const { x, y } = currentLevel.sheep;
  
  // Definim toleranța dorită de tine (+/- 100 pixeli)
  const TOLERANTA = 100;

  // Verificăm dacă click-ul este în interiorul careului de toleranță
  const aNimeritOaia =
    clickX >= x - TOLERANTA &&
    clickX <= x + TOLERANTA &&
    clickY >= y - TOLERANTA &&
    clickY <= y + TOLERANTA;

  if (aNimeritOaia) {
    console.log("Felicitări! Ai găsit oaia!");
    
    // Punem cercul galben fix pe ecran unde a dat utilizatorul click
    setFoundCoordinates({ x: clickX, y: clickY });

    // Afișăm popup-ul de felicitări după 1 secundă
    setTimeout(() => {
      setOverlay("win");
    }, 1000);
  } else {
    console.log("Nu ai nimerit, ești în afara razei de 50px!");
  }
};

const handleBackButton = () => {
    router.back(); 
  };

  return (
    <View style={styles.container}>

    <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
      <Image source={require("@/assets/images/oaie/BackOaie.png")} style={styles.back} />
    </TouchableOpacity>
      
      <Pressable style={styles.pressableArea} onPress={handleBackgroundPress}>
        <ImageBackground
          source={currentLevel.image}
          style={styles.background}
          contentFit="cover"
        />

        {/* 2. Randăm cercul galben doar dacă oaia a fost găsită */}
        {foundCoordinates && (
          <View 
            style={[
              styles.markerGalben, 
              { 
                top: foundCoordinates.y - 30, // Aliniem centrul (înălțime / 2)
                left: foundCoordinates.x - 30 // Aliniem centrul (lățime / 2)
              }
            ]} 
          />
        )}
      </Pressable>

      {/* Bara de sus */}
     <GameHUD
        level={level + 1}
        totalLevels={levels.length}
        onPause={() => setOverlay(overlay === "pause" ? null : "pause")} // Se închide la al doilea click
        onLevels={() => setOverlay(overlay === "levels" ? null : "levels")} // Se închide la al doilea click
      />

      {/* Overlay-uri */}
      {overlay === "start" && (
        <StartOverlayOaie show onHide={() => setOverlay(null)} />
      )}
      {overlay === "pause" && (
        <PauseOverlay onResume={() => setOverlay(null)} onLevels={() => setOverlay("levels")} />
      )}
      {overlay === "win" && (
        <WinOverlay onNext={nextLevel} />
      )}
      {overlay === "levels" && (
        <LevelSelectOverlay
          currentLevel={level}
          totalLevels={levels.length}
          onClose={() => setOverlay(null)}
          onSelect={(selectedLevel: number) => {
            setFoundCoordinates(null); // Resetăm cercul dacă schimbăm nivelul
            setLevel(selectedLevel);
            setOverlay(null);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pressableArea: {
    ...StyleSheet.absoluteFillObject,
  },
  background: {
    flex: 1,
  },
  // 3. Stilul pentru cercul galben de marcaj
  markerGalben: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#f1c40f',
    backgroundColor: 'rgba(241, 196, 15, 0.2)',
  },
  backButton:{
    position: 'absolute',
    top: 100,
    left: 30,
    width: 50,
    height: 50,
    zIndex: 1000,
  },
  back: {
    width: 50,
    height: 50,
  },
});
