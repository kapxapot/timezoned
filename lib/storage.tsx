export function save(key: string, data: unknown) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function load<T>(key: string, def?: T): T | undefined {
  const rawData = localStorage.getItem(key);

  return rawData
    ? JSON.parse(rawData) as T
    : def;
}
