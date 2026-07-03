import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  visible: boolean;
  onResume: () => void;
};

export default function PauseOverlay({ visible, onResume }: Props) {
  if (!visible) return null;

  return (
    <View style={styles.pausedOverlay}>
      <Text style={styles.pausedTitle}>Pauză</Text>
      <Text style={styles.pausedSubtitle}>Joc oprit. Apasă pentru a continua.</Text>
      <Pressable style={styles.resumeButton} onPress={onResume}>
        <Text style={styles.resumeText}>Continuă</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  pausedOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(2, 59, 6, 0.38)',
    zIndex: 250,
    paddingHorizontal: 24,
  },
  pausedTitle: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '900',
    marginBottom: 14,
  },
  pausedSubtitle: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.9,
  },
  resumeButton: {
    backgroundColor: '#3d8c40',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
  },
  resumeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
});
