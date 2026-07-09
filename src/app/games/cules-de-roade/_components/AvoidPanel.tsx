import { memo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

function AvoidPanel() {
  return (
    <View style={styles.container}>
      <Text style={styles.panelHeading}>EVITĂ</Text>
      <View style={styles.collectRow}>
        <Image source={require('../assets/Spin.png')} style={styles.collectIcon} />
        <Text style={styles.collectText}>-2</Text>
      </View>
      <View style={styles.collectRow}>
        <Text style={styles.rockEmoji}>🪨</Text>
        <Text style={styles.collectText}>-1</Text>
      </View>
    </View>
  );
}

export default memo(AvoidPanel);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 12,
    top: 285,
    width: 85,
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: 12,
    borderRadius: 12,
    zIndex: 50,

  },
  panelHeading: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  collectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  collectIcon: {
    width: 26,
    height: 26,
  },
  collectText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '800',
    fontSize: 18,
  },
  rockEmoji: {
    fontSize: 16,
  },
});
