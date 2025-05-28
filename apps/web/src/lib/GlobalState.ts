import type { Account } from "@/features/accounts/types";
import type { Wallet } from "@/features/wallet/types";
import get from "lodash/get";
import set from "lodash/set";
import unset from "lodash/unset";
import type { Get, Paths } from "./types";

type Store = {
  account: Account[];
  wallet: Wallet[];
};

export type StorePath = Paths<Store>;

export type StoreValue<Path> = Get<Store, Path>;

export class GlobalState {
  private static store: Store = {
    account: [],
    wallet: [],
  };

  private static listeners: Map<
    StorePath,
    Set<(value: StoreValue<StorePath>) => void>
  > = new Map();

  private static persist() {
    const serializedStore = JSON.stringify(this.store);
    localStorage.setItem("store", serializedStore);
  }

  static hydrate() {
    if (typeof window === "undefined") return;

    const serializedStore = window?.localStorage.getItem("store");
    if (serializedStore) {
      this.store = JSON.parse(serializedStore);
    }
  }

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
    GlobalState.persist();

    return value;
  }

  static get<Path extends StorePath>(path: Path): StoreValue<Path> | undefined {
    return get(this.store, path) as StoreValue<Path> | undefined;
  }

  static clear(path: StorePath) {
    const result = unset(this.store, path);
    GlobalState.persist();
    return result;
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

GlobalState.hydrate();
