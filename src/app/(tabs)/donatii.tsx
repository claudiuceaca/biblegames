import { StyleSheet, Text, View } from 'react-native';

export default function DonatiiScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ecran Donații</Text>
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
