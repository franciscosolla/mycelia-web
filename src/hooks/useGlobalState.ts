import type { Account } from "@/features/accounts/types";
import type { Wallet } from "@/features/wallet/types";
import get from "lodash/get";
import set from "lodash/set";
import unset from "lodash/unset";
import { useCallback, useEffect, useState } from "react";

type Store = {
  account: Account[];
  wallet: Wallet[];
};

type StorePath = Paths<Store>;

type StoreValue<Path> = Get<Store, Path>;

export class GlobalState {
  private static store: Store = {
    account: [],
    wallet: [],
  };

  private static listeners: Map<
    StorePath,
    Set<(value: StoreValue<StorePath>) => void>
  > = new Map();

  static set<Path extends StorePath>(
    path: Path,
    value:
      | StoreValue<Path>
      | ((current: StoreValue<Path> | undefined) => StoreValue<Path>)
  ) {
    if (typeof value === "function") {
      const currentValue = this.get(path) as StoreValue<Path> | undefined;
      value = (
        value as (current: StoreValue<Path> | undefined) => StoreValue<Path>
      )(currentValue);
    }

    set(this.store, path, value);

    GlobalState.callListeners(path);

    return value;
  }

  static get<Path extends StorePath>(path: Path): StoreValue<Path> | undefined {
    return get(this.store, path) as StoreValue<Path> | undefined;
  }

  static clear(path: StorePath) {
    return unset(this.store, path);
  }

  static listen<Path extends StorePath>(
    path: Path,
    callback: (value: StoreValue<Path>) => void
  ) {
    const cb = callback as (value: StoreValue<StorePath>) => void;
    const pathListeners = this.listeners.get(path);

    if (!pathListeners) {
      this.listeners.set(path, new Set([cb]));
    } else {
      pathListeners.add(cb);
    }

    return () => {
      const pathListeners = this.listeners.get(path);
      if (pathListeners) {
        pathListeners.delete(cb);
        if (pathListeners.size === 0) {
          this.listeners.delete(path);
        }
      }
    };
  }

  static callListeners(path: StorePath) {
    const value = this.get(path);

    path.split(".").forEach((_, i, parts) => {
      const path = parts.slice(0, i + 1).join(".") as StorePath;

      const pathListeners = this.listeners.get(path);

      if (pathListeners) {
        pathListeners.forEach((callback) => callback(value));
      }
    });
  }
}

export const useGlobalState = <Path extends StorePath>(path: Path) => {
  const [state, setState] = useState<StoreValue<Path> | undefined>(
    GlobalState.get(path)
  );

  useEffect(() => GlobalState.listen(path, setState), [path]);

  const set = useCallback(
    (data: StoreValue<Path>) => GlobalState.set(path, data),
    [path]
  );

  return [state, set] as const;
};

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

type Paths<T> = PathImpl<T>;

type Get<T, P> =
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
