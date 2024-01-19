import { useState, useEffect } from "react";
export const useDebounce = <T>(data: T, delay: number) => {
  const [debouncedData, setDebouncedData] = useState<T>(data);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedData(data);
    }, delay);
    return () => clearTimeout(handler);
  }, [data, delay]);
  return { debouncedData };
};
