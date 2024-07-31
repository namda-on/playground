import {
  threeColumnMediaQuery,
  twoColumnMediaQuery,
} from "@/constants/mediaQueries";

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
