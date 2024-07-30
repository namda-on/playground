import { Cat } from "@/types/cat";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import { useColumnCount } from "./column";

type CatStoreState = {
  cats: Cat[];
};

const initialCatStore: CatStoreState = {
  cats: [],
};

export const useCatStore = create(
  immer(
    combine(initialCatStore, (set) => ({
      actions: {
        addCats: (cats: Cat[]) =>
          set((state) => {
            state.cats = [...state.cats, ...cats];
          }),
      },
    }))
  )
);

export const useCatsByColumns = () => {
  const cats = useCatStore((state) => state.cats);
  const columnCount = useColumnCount();
  // TODO : 랜더링 최적화를 위한 data 구조로 변경
  const catsByColumns: Cat[][] = Array(columnCount)
    .fill(undefined)
    .map(() => []);

  cats.forEach((cat, idx) => {
    catsByColumns[idx % columnCount].push(cat);
  });

  return catsByColumns;
};

export const useCatStoreActions = () => useCatStore((state) => state.actions);
