"use client";
import {
  GlobalState,
  type StorePath,
  type StoreValue,
} from "@/lib/GlobalState";
import { useCallback, useEffect, useState } from "react";

export const useGlobalState = <Path extends StorePath>(path: Path) => {
  const [state, setState] = useState<StoreValue<Path> | undefined>(
    GlobalState.get(path)
  );

  useEffect(() => GlobalState.listen(path, setState), [path]);

  const set = useCallback(
    (
      data:
        | StoreValue<Path>
        | ((data: StoreValue<Path> | undefined) => StoreValue<Path>)
    ) => GlobalState.set(path, data),
    [path]
  );

  return [state, set] as const;
};
