"use client";

export class LocalStorageState<State> {
  key: string;
  state: State;

  listeners: Set<(state: State) => void> = new Set();

  constructor(initialState: State, key: string) {
    this.key = key;
    this.state = initialState;

    if (typeof window !== "undefined") {
      const persisted = window.localStorage.getItem(key);

      if (persisted) {
        try {
          this.state = JSON.parse(persisted);
        } catch (error) {
          console.error("Error parsing local storage data", error);
          this.state = initialState;
        }
      }
    }
  }

  get() {
    return this?.state;
  }

  set(nextState: State) {
    this.state = nextState;

    updateLocalStorageAsync(this.key, this.state);

    this.listeners.forEach((listener) => {
      try {
        listener(this.state);
      } catch (error) {
        console.error("Error notifying listener", error);
      }
    });
  }

  subscribe(callback: (state: State) => void) {
    this?.listeners.add(callback);

    return () => {
      this?.listeners.delete(callback);
    };
  }
}

async function updateLocalStorageAsync<Data>(key: string, value: Data) {
  localStorage.setItem(key, JSON.stringify(value));
}
