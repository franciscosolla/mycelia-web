export class Store<Data extends Record<string, unknown> & { id: string }> {
  private store: Map<string, Data>;
  listeners: Map<string, Set<(data: Data) => void>> = new Map();

  constructor(initialData: Data[]) {
    this.store = new Map(initialData.map((item) => [item.id, item]));
  }

  get(id: string): Data | undefined {
    return this.store.get(id);
  }

  getBy<Key extends string>(key: Key, value: Data[Key]): Data | undefined {
    return this.store.values().find((item) => item[key] === value);
  }

  getId(partialData: Partial<Data>): string | undefined {
    return (
      partialData.id ??
      this.store
        .values()
        .find((item) =>
          Object.entries(partialData).every(
            ([key, value]) => item[key] === value
          )
        )?.id
    );
  }

  set(data: Data): void {
    this.store.set(data.id, data);
  }

  listen(id: string, callback: (data: Data) => void): () => void {
    const listeners = this.listeners.get(id);

    if (!listeners) {
      this.listeners.set(id, new Set([callback]));
    } else {
      listeners.add(callback);
    }

    return () => {
      this.listeners.get(id)?.delete(callback);
    };
  }
}
