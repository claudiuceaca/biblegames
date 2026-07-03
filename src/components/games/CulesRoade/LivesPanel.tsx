import { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';

type Props = { lives: number };

function LivesPanel({ lives }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.livesRow}>
        <View style={{alignItems:'center'}}>
          <View style={{height:8}} />
          <View style={styles.heartsRow}>
            {[0,1,2].map((i)=> (
              <Image key={i} source={require('@/assets/images/roade/Inima.png')} style={[styles.heartIcon, {opacity: i < lives ? 1 : 0.25}]} />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

export default memo(LivesPanel);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 12,
    top: 12,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'flex-end',
    zIndex: 50,
  },
  livesRow: {
    alignItems: 'center',
  },
  heartsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartIcon: {
    width: 28,
    height: 28,
    marginLeft: 6,
  },
});
