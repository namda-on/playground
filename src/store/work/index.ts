import { DAY } from "@/constants/dayForm";
import { create } from "zustand";
import { combine, createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { v4 as uuidv4 } from "uuid";
import { getAvailableStartTimesUpdatedDayWorkTime } from "./utils";
import { getNextTimeOption } from "@/libs/workTimeUtils";

export interface ITimeRange {
  id: string;
  startTime: string;
  endTime: string;
  availableStartTime?: string;
}

export type TimeSelectType = "start" | "end";

export type WorkTimeStoreState = {
  workTime: Record<DAY, ITimeRange[]>;
  savedWorkTime: Record<DAY, ITimeRange[]>;
};

const DEFAULT_START_TIME = "09:00";
const DEFAULT_END_TIME = "17:00";

const makeNewTimeRange = (payload?: {
  startTime: string;
  endTime: string;
  availableStartTime: string;
}): ITimeRange => ({
  id: uuidv4(),
  startTime: payload ? payload.startTime : DEFAULT_START_TIME,
  endTime: payload ? payload.endTime : DEFAULT_END_TIME,
  availableStartTime: payload?.availableStartTime,
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
  persist(
    immer(
      combine(initialWorkTimeStoreState, (set) => ({
        actions: {
          addNewTimeRangeTo: (day: DAY) =>
            set((state) => {
              const dayWorkTimeList = state.workTime[day];
              let startTime = DEFAULT_START_TIME,
                endTime = DEFAULT_END_TIME;

              if (dayWorkTimeList.length) {
                const previousEndTime =
                  dayWorkTimeList[dayWorkTimeList.length - 1].endTime;

                startTime = getNextTimeOption(previousEndTime);
                endTime = getNextTimeOption(startTime);
              }

              state.workTime[day] = getAvailableStartTimesUpdatedDayWorkTime([
                ...dayWorkTimeList,
                makeNewTimeRange({
                  startTime,
                  endTime,
                  availableStartTime: startTime,
                }),
              ]);
            }),
          deleteTimeRangeByIdAt: (id: string, day: DAY) =>
            set((state) => {
              state.workTime[day] = state.workTime[day].filter(
                (row) => row.id !== id
              );
              state.workTime[day] = getAvailableStartTimesUpdatedDayWorkTime(
                state.workTime[day]
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
              const dayWorkTimeList = state.workTime[day];

              state.workTime[day] = dayWorkTimeList.map((row, idx) => {
                if (row.id !== timeRangeId) return row;

                type === "start"
                  ? (row.startTime = value)
                  : (row.endTime = value);
                return row;
              });
              state.workTime[day] = getAvailableStartTimesUpdatedDayWorkTime(
                state.workTime[day]
              );
            }),
          resetWorkTimeToSavedVersion: () =>
            set((state) => {
              state.workTime = state.savedWorkTime;
            }),
          saveCurrentWorkTime: () =>
            set((state) => {
              state.savedWorkTime = state.workTime;
            }),
        },
      }))
    ),
    {
      name: "workTime-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ savedWorkTime: state.savedWorkTime }),
      merge: (persistedState, currentState) => {
        if (typeof persistedState === "object" && persistedState !== null) {
          // NOTE : override current workTime
          return {
            ...currentState,
            ...persistedState,
            workTime: (
              persistedState as Pick<WorkTimeStoreState, "savedWorkTime">
            ).savedWorkTime,
          };
        }
        return currentState;
      },
    }
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
