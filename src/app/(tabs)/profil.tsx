import { StyleSheet, Text, View } from 'react-native';

export default function ProfilScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ecran Profilul Meu</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
