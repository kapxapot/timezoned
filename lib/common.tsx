export function cast<T>(obj: any): T {
  return obj as unknown as T;
}

export function merge(obj1: any, obj2: any): any {
  return { ...obj1, ...obj2 };
}
