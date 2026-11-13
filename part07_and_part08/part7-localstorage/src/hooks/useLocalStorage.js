import { useEffect, useState } from 'react';

/**
 * Хук для синхронизации состояния React с localStorage.
 * @param {string} key - Ключ в localStorage.
 * @param {any} initialValue - Начальное значение.
 */
export function useLocalStorage(key, initialValue) {
  // Ленивая инициализация состояния
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);

      if (saved !== null) {
        return JSON.parse(saved);
      }

      return typeof initialValue === 'function'
        ? initialValue()
        : initialValue;

    } catch (error) {
      console.warn(`Ошибка чтения "${key}" из localStorage`, error);

      return typeof initialValue === 'function'
        ? initialValue()
        : initialValue;
    }
  });

  // Автоматическое сохранение
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Ошибка сохранения "${key}"`, error);
    }
  }, [key, value]);

  return [value, setValue];
}