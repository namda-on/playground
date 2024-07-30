import { COLUMN_BREAK_POINT } from "./screen";

export const twoColumnMediaQuery = window.matchMedia(
  `(min-width: ${COLUMN_BREAK_POINT.TWO}px)`
);
export const threeColumnMediaQuery = window.matchMedia(
  `(min-width: ${COLUMN_BREAK_POINT.THREE}px)`
);
