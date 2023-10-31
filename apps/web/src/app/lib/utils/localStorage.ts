export const writeToLocalStorage = (key: string, value: any) => {
  // write key to local storage
  if (typeof window === "undefined") return;
  localStorage.setItem(key, value);
};

export const readFromLocalStorage = (key: string) => {
  // read key from local storage
  if (typeof window === "undefined") return;
  return localStorage.getItem(key);
};
