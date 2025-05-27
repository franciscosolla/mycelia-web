export const getValues = <T, K extends keyof T>(arr: T[], key: K): T[K][] =>
  arr.map((item) => item[key]);

export const uniq = <T>(arr: T[]): T[] => Array.from(new Set(arr));

export const sumBy = <T, K extends keyof PickByType<T, number>>(
  arr: T[],
  iteratee: ((item: T) => number) | K
): number =>
  arr.reduce(
    (acc, item) =>
      acc +
      (typeof iteratee === "function"
        ? iteratee(item)
        : (item[iteratee] as number)),
    0
  );

type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

type Index = string | number | symbol;

export const groupBy = <T, K extends keyof PickByType<T, Index>>(
  arr: T[],
  key: K
): Record<Index, T[]> =>
  arr.reduce((acc, item) => {
    const i = item[key] as Index;
    acc[i] = acc[i] ? [...acc[i], item] : [item];
    return acc;
  }, {} as Record<Index, T[]>);

export const omitBy = <T extends object>(
  obj: T,
  predicate: (value: T[keyof T]) => boolean
): Partial<T> =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    if (!predicate(value)) {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);

export const mapValues = <T extends object, V>(
  obj: T,
  iteratee: (value: T[keyof T]) => V
): Record<keyof T, V> =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key as keyof T] = iteratee(value);
    return acc;
  }, {} as Record<keyof T, V>);
