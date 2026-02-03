// src/hooks/useLocalStorage.js
import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  // 1. Initialize state from localStorage (or fallback to initialValue)
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(`localStorage ${key} failed to load:`, error);
      return initialValue;
    }
  });

  // 2. Update localStorage whenever the key or value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(`localStorage ${key} failed to save:`, error);
    }
  }, [key, value]);

  // 3. Return value and setter (just like useState)
  return [value, setValue];
}
