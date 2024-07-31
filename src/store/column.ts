import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { combine } from "zustand/middleware";
import { getColumnCount } from "@/libs/calculateColumn";

type ColumnStoreState = {
  columnCount: number;
};

const initialColumnCount = getColumnCount();

const initialColumnStore: ColumnStoreState = {
  columnCount: initialColumnCount,
};

export const useColumnStore = create(
  immer(
    combine(initialColumnStore, (set) => ({
      actions: {
        setColumnCount: (columnCount: number) =>
          set((state) => {
            state.columnCount = columnCount;
          }),
      },
    }))
  )
);

export const useColumnCount = () =>
  useColumnStore((state) => state.columnCount);

export const useColumnActions = () => useColumnStore((state) => state.actions);
