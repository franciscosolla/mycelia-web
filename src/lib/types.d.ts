type Primitive = string | number | boolean | bigint | symbol | null | undefined;

type Join<K, P> = K extends string
  ? P extends string
    ? `${K}.${P}`
    : never
  : never;

type PathImpl<T> = T extends Primitive
  ? never
  : {
      [K in keyof T]: T[K] extends Primitive // if the value is primitive, just return the key
        ? K & string
        : // if it's an array, and the items are objects, recurse
        T[K] extends Array<infer U>
        ? U extends Primitive
          ? K & string
          :
              | (K & string)
              | `${K & string}.[${string}]`
              | Join<`${K & string}.[${string}]`, PathImpl<U>>
        : // if it's an object, recurse
          (K & string) | Join<K & string, PathImpl<T[K]>>;
    }[keyof T];

export type Paths<T> = PathImpl<T>;

export type Get<T, P> =
  // Stop on empty path
  P extends ""
    ? T
    : // Match array index pattern: key.[index].rest
    P extends `${infer K}.[${string}].${infer R}`
    ? K extends keyof T
      ? T[K] extends Array<infer U>
        ? Get<U, R>
        : never
      : never
    : // Match array access: key.[index]
    P extends `${infer K}.[${string}]`
    ? K extends keyof T
      ? T[K] extends Array<infer U>
        ? U
        : never
      : never
    : // Match object property: key.rest
    P extends `${infer K}.${infer R}`
    ? K extends keyof T
      ? Get<T[K], R>
      : never
    : // Match terminal key
    P extends keyof T
    ? T[P]
    : never;
