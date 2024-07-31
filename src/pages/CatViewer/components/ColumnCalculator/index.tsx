import {
  threeColumnMediaQuery,
  twoColumnMediaQuery,
} from "@/constants/mediaQueries";
import { getColumnCount } from "@/libs/calculateColumn";
import { useColumnActions } from "@/store/column";
import { useCallback, useLayoutEffect } from "react";

interface ColumnCalculatorProps {
  children: React.ReactNode;
}

export default function ColumnCalculator({ children }: ColumnCalculatorProps) {
  const { setColumnCount } = useColumnActions();

  const updateColumnCount = useCallback(() => {
    const newColumnCount = getColumnCount();
    setColumnCount(newColumnCount);
  }, [setColumnCount]);

  useLayoutEffect(
    function initCalculateColumnCount() {
      twoColumnMediaQuery.addEventListener("change", updateColumnCount);
      threeColumnMediaQuery.addEventListener("change", updateColumnCount);

      return () => {
        twoColumnMediaQuery.removeEventListener("change", updateColumnCount);
        threeColumnMediaQuery.removeEventListener("change", updateColumnCount);
      };
    },
    [updateColumnCount]
  );

  return <>{children}</>;
}
