import {
  threeColumnMediaQuery,
  twoColumnMediaQuery,
} from "@/constants/mediaQueries";
import { getColumnCount, getColumnWidth } from "@/libs/calculateRow";
import { useColumnActions, useColumnCount } from "@/store/column";
import { useCallback, useLayoutEffect } from "react";

interface ColumnCalculatorProps {
  children: React.ReactNode;
}

export default function ColumnCalculator({ children }: ColumnCalculatorProps) {
  const currentColumnCount = useColumnCount();
  const { setColumnCount, setColumnWidth } = useColumnActions();

  const updateColumnCount = useCallback(() => {
    const newColumnCount = getColumnCount();
    setColumnCount(newColumnCount);
  }, [setColumnCount]);

  // calculate each column's width according to screen width
  const calculateColumnWidth = useCallback(
    () =>
      requestAnimationFrame(() => {
        const columnWidth = getColumnWidth(currentColumnCount);
        setColumnWidth(columnWidth);
      }),
    [currentColumnCount, setColumnWidth]
  );

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

  useLayoutEffect(
    function initCalculateColumnWidth() {
      window.addEventListener("resize", calculateColumnWidth);
      return () => window.removeEventListener("resize", calculateColumnWidth);
    },
    [calculateColumnWidth]
  );

  return <>{children}</>;
}
