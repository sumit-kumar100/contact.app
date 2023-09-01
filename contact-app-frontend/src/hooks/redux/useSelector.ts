"use client";

import { useEffect, useState } from "react";
import { RootState, store } from "@/redux/store";

const useSelector = <T>(selector: (state: RootState) => T): T => {
  const [selectedState, setSelectedState] = useState<T>(() =>
    selector(store.getState())
  );

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const newState = selector(store.getState());
      setSelectedState(newState);
    });

    return unsubscribe;
  }, [selector]);

  return selectedState;
};

export default useSelector;
