import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useRef, useState } from 'react';

const KEY = 'roade_highScore';

const isWeb = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const storage = {
  async getItem(key: string) {
    if (isWeb) {
      return Promise.resolve(window.localStorage.getItem(key));
    }
    try {
      return await AsyncStorage.getItem(key);
    } catch {
      return null;
    }
  },
  async setItem(key: string, value: string) {
    if (isWeb) {
      window.localStorage.setItem(key, value);
      return;
    }
    try {
      await AsyncStorage.setItem(key, value);
    } catch {
      // ignore write errors in environments without AsyncStorage
    }
  },
};

export function useHighScore() {
  const [highScore, setHighScore] = useState(0);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const value = await storage.getItem(KEY);
      if (!mounted) return;
      if (value) setHighScore(parseInt(value, 10));
      loaded.current = true;
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const checkAndSave = useCallback(async (score: number) => {
    const value = await storage.getItem(KEY);
    const previous = value ? parseInt(value, 10) : 0;
    if (score > previous) {
      setHighScore(score);
      setIsNewRecord(true);
      await storage.setItem(KEY, score.toString());
    } else {
      setHighScore(previous);
      setIsNewRecord(false);
    }
  }, []);

  return { highScore, isNewRecord, checkAndSave, loaded: loaded.current };
}
