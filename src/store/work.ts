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

export type TimeSelectType = "start" | "end";

type WorkTimeStoreState = {
  workTime: Record<DAY, ITimeRange[]>;
  savedWorkTime: Record<DAY, ITimeRange[]>;
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
  savedWorkTime: {
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
        updateTimeRangeValue: (payload: {
          timeRangeId: string;
          day: DAY;
          value: string;
          type: TimeSelectType;
        }) =>
          set((state) => {
            const { timeRangeId, day, type, value } = payload;
            state.workTime[day] = state.workTime[day].map((row) => {
              if (row.id !== timeRangeId) return row;
              type === "start"
                ? (row.startTime = value)
                : (row.endTime = value);
              return row;
            });
          }),
      },
    }))
  )
);

export const useWorkTimeAt = (day: DAY) =>
  useWorkTimeStore((state) => state.workTime[day]);
export const useWorkTimeStoreActions = () =>
  useWorkTimeStore((state) => state.actions);

export const useWorkTimeHasDiff = () => {
  const { workTime, savedWorkTime } = useWorkTimeStore();

  for (const [day, range] of Object.entries(workTime)) {
    const savedRange = savedWorkTime[day as DAY];
    if (range.length !== savedRange.length) return true;

    for (let i = 0; i < range.length; i++) {
      if (
        range[i].startTime !== savedRange[i].startTime ||
        range[i].endTime !== savedRange[i].endTime
      ) {
        return true;
      }
    }
  }
  return false;
};
