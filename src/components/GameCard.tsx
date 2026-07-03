import { ImageBackground, Pressable, StyleSheet, Text } from 'react-native';

type GameCardProps = {
  title: string;
  description: string;
  icon: any;
  color: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function GameCard({ title, description, icon, color, onPress, disabled = false }: GameCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress} disabled={disabled}>
      <ImageBackground source={icon} style={[styles.iconContainer, disabled && styles.iconDisabled]} resizeMode="cover">
  
     <Text style={styles.title}>
      {title}
     </Text>
      {/* <Text style={[styles.title, disabled && styles.textDisabled]}>{title}</Text>
      <Text style={[styles.description, disabled && styles.textDisabled]}>{description}</Text> */}
    </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    width: '31%',
    margin: '1%',
    height: 115,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  iconContainer: {
    width: "100%",
    height: "100%",
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: '#ffffff',
    textAlign:'center',
  },
  description: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  cardDisabled: {
    opacity: 0.5,
  },
  iconDisabled: {
    opacity: 0.5,
  },
  textDisabled: {
    opacity: 0.5,
  },
});
