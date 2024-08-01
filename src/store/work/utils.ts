import { ITimeRange } from ".";
import { getNextTimeOption } from "@/libs/workTimeUtils";

export const getAvailableStartTimesUpdatedDayWorkTime = (
  workTimeList: ITimeRange[]
): ITimeRange[] => {
  let newWorkTime: ITimeRange[] = [];

  if (workTimeList.length === 0) return workTimeList;
  if (workTimeList.length === 1 && workTimeList[0].availableStartTime) {
    delete workTimeList[0].availableStartTime;
  } else {
    for (let i = 1; i < workTimeList.length; i++) {
      workTimeList[i] = {
        ...workTimeList[i],
        availableStartTime: getNextTimeOption(workTimeList[i - 1].endTime),
      };
    }
  }

  newWorkTime = [...workTimeList];
  return newWorkTime;
};
