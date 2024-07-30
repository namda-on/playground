import {
  threeColumnMediaQuery,
  twoColumnMediaQuery,
} from "@/constants/mediaQueries";
import { WIDTH } from "@/constants/screen";

export const getColumnCount = () => {
  switch (true) {
    case threeColumnMediaQuery.matches:
      return 3;
    case twoColumnMediaQuery.matches:
      return 2;
    default:
      return 1;
  }
};

export const getColumnWidth = (columnCount: number) => {
  const contentWidth = Math.min(WIDTH.CONTENT_MAX, window.innerWidth);
  const columnWidth =
    (contentWidth - columnCount * WIDTH.COLUMN_GAP) / columnCount;

  return columnWidth;
};
