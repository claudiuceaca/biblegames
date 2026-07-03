import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  onLeft: () => void;
  onRight: () => void;
};

function Controls({ onLeft, onRight }: Props) {
  return (
    <View style={styles.controlOverlay}>
      <Pressable style={styles.controlArea} onPress={onLeft}>
        <View style={styles.arrowButton}>
          <Text style={styles.controlText}>◀</Text>
        </View>
      </Pressable>
      <View style={styles.controlSpacer} />
      <Pressable style={styles.controlArea} onPress={onRight}>
        <View style={styles.arrowButton}>
          <Text style={styles.controlText}>▶</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default memo(Controls);

const styles = StyleSheet.create({
  controlOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlArea: {
    width: 96,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlSpacer: {
    flex: 1,
  },
  arrowButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
});
