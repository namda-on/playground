import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { combine } from "zustand/middleware";
import { getColumnCount, getColumnWidth } from "@/libs/calculateRow";

type ColumnStoreState = {
  columnCount: number;
  columnWidth: number;
};

const initialColumnCount = getColumnCount();

const initialColumnStore: ColumnStoreState = {
  columnCount: initialColumnCount,
  columnWidth: getColumnWidth(initialColumnCount),
};

export const useColumnStore = create(
  immer(
    combine(initialColumnStore, (set) => ({
      actions: {
        setColumnCount: (columnCount: number) =>
          set((state) => {
            state.columnCount = columnCount;
          }),
        setColumnWidth: (columnWidth: number) =>
          set((state) => {
            state.columnWidth = columnWidth;
          }),
      },
    }))
  )
);

export const useColumnCount = () =>
  useColumnStore((state) => state.columnCount);
export const useColumnWidth = () =>
  useColumnStore((state) => state.columnWidth);
export const useColumnActions = () => useColumnStore((state) => state.actions);
