import { Image, StyleSheet, View } from 'react-native';
import { basketBottomOffset, basketHeight, basketWidth, FruitType } from '../_reducers/gameReducer';
import BasketAnimated from './BasketAnimated';

type Fruit = {
  id: string;
  type: string;
  x: number;
  y: number;
};

type Props = {
  fruits: Fruit[];
  basketX: number;
  basketContents: FruitType[];
  onLayout: (event: any) => void;
};

const fruitImages: Record<string, any> = {
  apple: require('../assets/Mar.png'),
  grape: require('../assets/Strugure.png'),
  wheat: require('../assets/Grau.png'),
  para: require('../assets/Para.png'),
  thorn: require('../assets/Spin.png'),
  ananas: require('../assets/Ananas.png'),
};

export default function GameArea({
  fruits,
  basketX,
  basketContents,
  onLayout,
}: Props) {
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
          <BasketAnimated
            basketContents={basketContents}
          />
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
