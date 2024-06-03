import { useEffect } from "react";
import { useState } from "react";

export default function useLocalStorage(
  key: "theme",
  defaultValue: "light" | "dark"
) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.error("Error retrieving data from localStorage:", error);
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
