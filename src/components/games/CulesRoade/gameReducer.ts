import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenPadding = 10;
const fruitSize = 56;
const leftSidebarWidth = 12 + 140 + 8;

export type FruitType = 'apple' | 'grape' | 'wheat' | 'thorn' | 'para';
export type Phase = 'IDLE' | 'PLAYING' | 'PAUSED' | 'GAME_OVER';
export type Difficulty = 'easy' | 'medium' | 'hard';

export type Fruit = {
  id: string;
  type: FruitType;
  x: number;
  y: number;
  speed: number;
};

export type SessionStats = {
  fruitsCaught: number;
  thornsHit: number;
  maxStreak: number;
};

export type GameState = {
  phase: Phase;
  basketX: number;
  fruits: Fruit[];
  score: number;
  lives: number;
  timeLeftMs: number;
  spawnAccumulator: number;
  gameAreaHeight: number;
  difficulty: Difficulty;
  streak: number;
  comboMultiplier: number;
  hapticGoodCount: number;
  hapticBadCount: number;
  stats: SessionStats;
  isBasketHit: boolean;
  basketHitTime: number;
};

export const roundDurationMs = 30_000;
export const spawnIntervalMs = 1000;
export const basketWidth = 200;
export const basketMoveDelta = 48;
export const basketHeight = 200;
export const basketBottomOffset = 0;

const DIFFICULTY = {
  easy: { speedBase: 240, speedVar: 100, thornBase: 0.10, spawnMin: 1300 },
  medium: { speedBase: 320, speedVar: 135, thornBase: 0.15, spawnMin: 1000 },
  hard: { speedBase: 400, speedVar: 160, thornBase: 0.22, spawnMin: 700 },
};

const INITIAL_STATS: SessionStats = { fruitsCaught: 0, thornsHit: 0, maxStreak: 0 };

export const initialGameState: GameState = {
  phase: 'IDLE',
  basketX: (screenWidth - basketWidth) / 2,
  fruits: [],
  score: 0,
  lives: 3,
  timeLeftMs: roundDurationMs,
  spawnAccumulator: 0,
  gameAreaHeight: 0,
  difficulty: 'medium',
  streak: 0,
  comboMultiplier: 1,
  hapticGoodCount: 0,
  hapticBadCount: 0,
  stats: INITIAL_STATS,
  isBasketHit: false,
  basketHitTime: 0,
};

export type GameAction =
  | { type: 'START'; difficulty: Difficulty }
  | { type: 'MOVE_BASKET'; direction: 'left' | 'right' }
  | { type: 'SET_BASKET_X'; x: number }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'TICK'; delta: number }
  | { type: 'SET_GAME_AREA_HEIGHT'; height: number }
  | { type: 'RESET' };

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

const getMultiplier = (streak: number) => (streak >= 5 ? 3 : streak >= 3 ? 2 : 1);

export const createFruit = (difficulty: Difficulty, timeElapsedMs = 0): Fruit => {
  const cfg = DIFFICULTY[difficulty];
  const progress = Math.min(timeElapsedMs / roundDurationMs, 1);
  const speedMult = 1 + progress * 0.8;
  const thornChance = cfg.thornBase + progress * 0.15;

  const r = Math.random();

  const type: FruitType =
    r < 0.20 ? 'thorn' :  // 20% șansă (0.00 - 0.19)
    r < 0.40 ? 'apple' :  // 20% șansă (0.20 - 0.39)
    r < 0.60 ? 'grape' :  // 20% șansă (0.40 - 0.59)
    r < 0.80 ? 'wheat' : 'para';  // 20% șansă (0.60 - 0.79) și restul până la 1.0 (20%)

  return {
    id: String(Math.random()).slice(2),
    type,
    x: leftSidebarWidth + Math.random() * Math.max(0, screenWidth - fruitSize - screenPadding - leftSidebarWidth),
    y: -fruitSize,
    speed: (cfg.speedBase + Math.random() * cfg.speedVar) * speedMult,
  };
};

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'START':
      return {
        ...initialGameState,
        phase: 'PLAYING',
        difficulty: action.difficulty,
        gameAreaHeight: state.gameAreaHeight,
        basketX: (screenWidth - basketWidth) / 2,
      };

    case 'MOVE_BASKET': {
      const maxX = screenWidth - basketWidth - screenPadding;
      const dx = action.direction === 'left' ? -basketMoveDelta : basketMoveDelta;
      return { ...state, basketX: clamp(state.basketX + dx, 0, maxX) };
    }

    case 'SET_BASKET_X':
      return { ...state, basketX: clamp(action.x, 0, screenWidth - basketWidth - screenPadding) };

    case 'SET_GAME_AREA_HEIGHT':
      return { ...state, gameAreaHeight: action.height };

    case 'PAUSE':
      return state.phase === 'PLAYING' ? { ...state, phase: 'PAUSED' } : state;

    case 'RESUME':
      return state.phase === 'PAUSED' ? { ...state, phase: 'PLAYING' } : state;

    case 'TICK': {
      if (state.phase !== 'PLAYING') return state;

      const delta = Math.min(action.delta, 100);
      const timeLeftMs = Math.max(0, state.timeLeftMs - delta);
      const timeElapsedMs = roundDurationMs - timeLeftMs;
      const progress = Math.min(timeElapsedMs / roundDurationMs, 1);

      const spawnInterval = Math.max(
        DIFFICULTY[state.difficulty].spawnMin,
        spawnIntervalMs - progress * 600,
      );
      let spawnAccumulator = state.spawnAccumulator + delta;

      const h = state.gameAreaHeight || Dimensions.get('window').height;
      const basketY = h - basketHeight + basketBottomOffset;
      const mouthTop = basketY + 110;
      const mouthBottom = basketY + basketHeight - 40;
      const mouthLeft = state.basketX + 24;
      const mouthRight = state.basketX + basketWidth - 24;

      let score = state.score;
      let lives = state.lives;
      let streak = state.streak;
      let hapticGood = state.hapticGoodCount;
      let hapticBad = state.hapticBadCount;
      let stats = { ...state.stats };
      let isBasketHit = false;
      let basketHitTime = 0;

      let fruits = state.fruits.map((fruit) => ({
        ...fruit,
        y: fruit.y + (fruit.speed * delta) / 1000,
      }));

      while (spawnAccumulator >= spawnInterval) {
        spawnAccumulator -= spawnInterval;
        fruits = [...fruits, createFruit(state.difficulty, timeElapsedMs)];
      }

      fruits = fruits.filter((fruit) => {
        const cx = fruit.x + fruitSize / 2;
        const cy = fruit.y + fruitSize / 2;
        const caught = cx >= mouthLeft && cx <= mouthRight && cy >= mouthTop && cy <= mouthBottom;

        if (caught) {
          if (fruit.type === 'thorn') {
            lives = Math.max(0, lives - 1);
            score = Math.max(0, score - 2);
            streak = 0;
            hapticBad++;
            stats = { ...stats, thornsHit: stats.thornsHit + 1 };
            isBasketHit = true;
            basketHitTime = 300;
          } else {
            const base = fruit.type === 'apple' ? 1 : fruit.type === 'grape' ? 2 : 3;
            streak++;
            score += base * getMultiplier(streak);
            hapticGood++;
            stats = {
              ...stats,
              fruitsCaught: stats.fruitsCaught + 1,
              maxStreak: Math.max(stats.maxStreak, streak),
            };
          }
          return false;
        }

        return fruit.y <= h + fruitSize;
      });

      const newBasketHitTime = Math.max(0, state.basketHitTime - delta);
      const newIsBasketHit = newBasketHitTime > 0 || isBasketHit;

      return {
        ...state,
        phase: timeLeftMs <= 0 || lives <= 0 ? 'GAME_OVER' : 'PLAYING',
        timeLeftMs,
        spawnAccumulator,
        fruits,
        score,
        lives,
        streak,
        comboMultiplier: getMultiplier(streak),
        hapticGoodCount: hapticGood,
        hapticBadCount: hapticBad,
        stats,
        isBasketHit: newIsBasketHit,
        basketHitTime: isBasketHit ? 300 : newBasketHitTime,
      };
    }

    case 'RESET':
      return { ...initialGameState, gameAreaHeight: state.gameAreaHeight };

    default:
      return state;
  }
};
