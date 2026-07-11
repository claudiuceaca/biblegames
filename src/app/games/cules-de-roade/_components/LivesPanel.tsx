import { memo } from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';

type Props = { lives: number };

function LivesPanel({ lives }: Props) {
  return (
    <ImageBackground 
    style={styles.container} 
    source={require('../assets/bannerSimple.png')} 
    resizeMode="cover">
     <View style={styles.heartsRow}>
            {[0,1,2].map((i)=> (
              <Image key={i} source={require('../assets/Inima.png')} style={[styles.heartIcon, {opacity: i < lives ? 1 : 0.25}]} />
            ))}
          </View>
    </ImageBackground>
  );
}

export default memo(LivesPanel);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 12,
    top: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    zIndex: 50,
    width:'auto',
    height: 50,
  },
  livesRow: {
    alignItems: 'center',
  },
  heartsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight:12
  },
  heartIcon: {
    width: 28,
    height: 28,
    marginLeft: 6,
    marginTop: 5
  },
});
