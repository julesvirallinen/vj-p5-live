import * as R from "ramda";

export const useLocalStorage = () => {
  const getItem = <T>(name: string): T | null => {
    const raw = localStorage.getItem(name);

    if (R.isNil(raw)) return null;

    return JSON.parse(raw);
  };

  const setItem = <T>(name: string, content: T) => {
    const stringified = JSON.stringify(content);
    localStorage.setItem(name, stringified);
  };

  return { getItem, setItem };
};
