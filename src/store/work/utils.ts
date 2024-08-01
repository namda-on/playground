import { ITimeRange, WorkTimeStoreState } from ".";
import { getNextTimeOption, isEarlierThan } from "@/libs/workTimeUtils";

export const getAvailableStartTimesUpdatedDayWorkTime = (
  workTimeList: ITimeRange[]
): ITimeRange[] => {
  let newWorkTime: ITimeRange[] = [];

  if (workTimeList.length === 0) return workTimeList;
  if (workTimeList.length === 1 && workTimeList[0].availableStartTime) {
    delete workTimeList[0].availableStartTime;
  } else {
    for (let i = 1; i < workTimeList.length; i++) {
      const availableStartTime = getNextTimeOption(workTimeList[i - 1].endTime);
      const availableEndTime = getNextTimeOption(availableStartTime);
      const { startTime: currentStartTime, endTime: currentEndTime } =
        workTimeList[i];

      workTimeList[i] = {
        ...workTimeList[i],
        availableStartTime,
        startTime: isEarlierThan(currentStartTime, availableStartTime)
          ? availableStartTime
          : currentStartTime,
        endTime: isEarlierThan(currentEndTime, availableEndTime)
          ? availableEndTime
          : currentEndTime,
      };
    }
  }

  newWorkTime = [...workTimeList];
  return newWorkTime;
};

export const checkIsValidWorkTime = (
  workTime: WorkTimeStoreState["workTime"]
): Boolean => {
  for (const [day, range] of Object.entries(workTime)) {
    if (range.length === 0) continue;

    for (let i = 0; i < range.length; i++) {
      const { startTime, endTime } = range[i];
      if (!isEarlierThan(startTime, endTime)) return false;
    }
  }

  return true;
};
