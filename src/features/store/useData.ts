import { useEffect, useState } from "react";
import type { Store } from "./Store";

export const useData = <Data extends { id: string; [key: string]: unknown }>(
  store: Store<Data>,
  id: string
) => {
  const [data, setData] = useState<Data | undefined>(store.get(id));

  useEffect(() => {
    return store.listen(id, setData);
  }, [id, store]);

  return [data, store.set] as const;
};
