import { Image, StyleSheet, View } from 'react-native';
import BasketAnimated from './BasketAnimated';
import { basketBottomOffset, basketHeight, basketWidth } from './gameReducer';

const basketImage = require('@/assets/images/roade/Cos.png');

type Fruit = {
  id: string;
  type: string;
  x: number;
  y: number;
};

type Props = {
  fruits: Fruit[];
  basketX: number;
  onLayout: (event: any) => void;
};

const fruitImages: Record<string, any> = {
  apple: require('@/assets/images/roade/Mar.png'),
  grape: require('@/assets/images/roade/Strugure.png'),
  wheat: require('@/assets/images/roade/Grau.png'),
  para: require('@/assets/images/roade/Para.png'),
  thorn: require('@/assets/images/roade/Spin.png'),
};

export default function GameArea({ fruits, basketX, onLayout }: Props) {
  return (
    <View style={styles.gameArea} onLayout={onLayout}>
      {fruits.map((fruit) => (
        <Image
          key={fruit.id}
          source={fruitImages[fruit.type]}
          style={[styles.fruit, { left: fruit.x, top: fruit.y }]}
        />
      ))}
      <View style={[styles.basket, { left: basketX }]}> 
          <BasketAnimated />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gameArea: {
    flex: 1,
    position: 'relative',
  },
  fruit: {
    position: 'absolute',
    width: 56,
    height: 56,
  },
  basket: {
    position: 'absolute',
    bottom: basketBottomOffset,
    width: basketWidth,
    height: basketHeight,
  },
  basketImage: {
    flex: 1,
  },
});
