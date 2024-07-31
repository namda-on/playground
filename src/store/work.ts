import { DAY } from "@/constants/dayForm";
import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { v4 as uuidv4 } from "uuid";

export interface ITimeRange {
  id: string;
  startTime: string;
  endTime: string;
}

type WorkTimeStoreState = {
  workTime: Record<DAY, ITimeRange[]>;
};

const makeNewTimeRange = () => ({
  id: uuidv4(),
  startTime: "09:00",
  endTime: "17:00",
});

const initialWorkTimeStoreState: WorkTimeStoreState = {
  workTime: {
    [DAY.SUNDAY]: [makeNewTimeRange()],
    [DAY.MONDAY]: [makeNewTimeRange()],
    [DAY.TUESDAY]: [makeNewTimeRange()],
    [DAY.WEDNESDAY]: [makeNewTimeRange()],
    [DAY.THURSDAY]: [makeNewTimeRange()],
    [DAY.FRIDAY]: [makeNewTimeRange()],
    [DAY.SATURDAY]: [makeNewTimeRange()],
  },
};

export const useWorkTimeStore = create(
  immer(
    combine(initialWorkTimeStoreState, (set) => ({
      actions: {
        addNewTimeRangeTo: (day: DAY) =>
          set((state) => {
            state.workTime[day] = [...state.workTime[day], makeNewTimeRange()];
          }),
        deleteTimeRangeByIdAt: (id: string, day: DAY) =>
          set((state) => {
            state.workTime[day] = state.workTime[day].filter(
              (row) => row.id !== id
            );
          }),
      },
    }))
  )
);

export const useWorkTimeAt = (day: DAY) =>
  useWorkTimeStore((state) => state.workTime[day]);
export const useWorkTimeStoreActions = () =>
  useWorkTimeStore((state) => state.actions);
