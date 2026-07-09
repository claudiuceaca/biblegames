import { memo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

function CollectPanel() {
  return (
    <View style={styles.container}>
      <Text style={styles.panelHeading}>COLECTEAZĂ</Text>
      <View style={styles.collectRow}>
        <Image source={require('../assets/Mar.png')} style={styles.collectIcon} />
        <Text style={styles.collectText}>+1</Text>
      </View>
      <View style={styles.collectRow}>
        <Image source={require('../assets/Strugure.png')} style={styles.collectIcon} />
        <Text style={styles.collectText}>+2</Text>
      </View>
      <View style={styles.collectRow}>
        <Image source={require('../assets/Grau.png')} style={styles.collectIcon} />
        <Text style={styles.collectText}>+3</Text>
      </View>
      <View style={styles.collectRow}>
        <Image source={require('../assets/Para.png')} style={styles.collectIcon} />
        <Text style={styles.collectText}>+2</Text>
      </View>
            <View style={styles.collectRow}>
        <Image source={require('../assets/Ananas.png')} style={styles.collectIcon} />
        <Text style={styles.collectText}>+2</Text>
      </View>
    </View>
  );
}

export default memo(CollectPanel);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 12,
    top: 72,
    width: 85,
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: 10,
    borderRadius: 12,
    zIndex: 50,
  },
  panelHeading: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 11,
    marginHorizontal: -3
  },
  collectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
});
