import { useEffect, useRef } from "react";

export default function useEffectAfterMount(
  callback: () => void,
  dependencies: React.DependencyList
) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    callback();
  }, dependencies);
}
