import { useState } from 'react';
import { Dimensions, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';

const basketImage = require('../../assets/images/roade/Cos.png');
const basketWidth = 220;
const basketHeight = 220;
const moveDelta = 30;
const screenPadding = 10;
const screenWidth = Dimensions.get('window').width;

interface Fruit {
  id: string;
  x: number;
  y: number;
  type: 'apple' | 'grape';
  vY: number;
}

export default function Basket() {
  const [basketX, setBasketX] = useState((screenWidth - basketWidth) / 2);

  const moveBasket = (direction: 'left' | 'right') => {
    setBasketX((currentX) => {
      const nextX = currentX + (direction === 'left' ? -moveDelta : moveDelta);
      const maxX = screenWidth - basketWidth - screenPadding;
      return Math.max(0, Math.min(nextX, maxX));
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mută coșul de jos</Text>
      <View style={styles.gameArea}>
        <View style={[styles.basket, { left: basketX }]}> 
          <ImageBackground source={basketImage} style={styles.basketImage} resizeMode="contain" />
        </View>
        <View style={styles.controls}>
          <Pressable style={styles.controlButton} onPress={() => moveBasket('left')}>
            <Text style={styles.controlText}>◀</Text>
          </Pressable>
          <Pressable style={styles.controlButton} onPress={() => moveBasket('right')}>
            <Text style={styles.controlText}>▶</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    margin: 20,
  },
  gameArea: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  basket: {
    position: 'absolute',
    bottom: 40,
    width: basketWidth,
    height: basketHeight,
  },
  basketImage: {
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  controlButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
  },
});
