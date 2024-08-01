import { HOURS, MINUTES } from "@/constants/dayForm";

const getNumberHourAndMinutes = (stringTime: string) => {
  const [hour, minute] = stringTime.split(":");
  if (!hour || !minute) throw Error("invalid time parameter");

  const numberHour = Number(hour);
  const numberMinute = Number(minute);
  return [numberHour, numberMinute];
};

const formatTimeToString = (hour: number, minute: number) => {
  let stringHour = hour.toString();
  let stringMinute = minute.toString();

  if (hour.toString().length === 1) stringHour = `0${hour}`;
  if (minute === 0) stringMinute = "00";

  return `${stringHour}:${stringMinute}`;
};

export const getNextTimeOption = (time: string) => {
  const [numberHour, numberMinute] = getNumberHourAndMinutes(time);

  let numberNextHour = numberHour;
  let numberNextMinute: number;

  if (numberMinute === 45) {
    if (numberHour !== 23) numberNextHour = numberHour + 1;
    else numberNextHour = 0;

    numberNextMinute = 0;
  } else {
    numberNextMinute = numberMinute + 15;
  }

  return formatTimeToString(numberNextHour, numberNextMinute);
};

export const getAvailableTimeOptions = (availableStartTime?: string) => {
  const [startHour, startMinute] = availableStartTime
    ? getNumberHourAndMinutes(availableStartTime)
    : [0, 0];

  return HOURS.reduce((acc, hour) => {
    if (Number(hour) < startHour) return acc;
    if (Number(hour) === startHour) {
      MINUTES.forEach((minute) => {
        if (Number(minute) >= startMinute) acc.push(`${hour}:${minute}`);
      });
      return acc;
    }
    MINUTES.forEach((minute) => {
      acc.push(`${hour}:${minute}`);
    });

    return acc;
  }, [] as string[]);
};

export const isEarlierThan = (startTime: string, endTime: string) => {
  const [startHour, startMinute] = getNumberHourAndMinutes(startTime);
  const [endHour, endMinute] = getNumberHourAndMinutes(endTime);

  if (startHour < endHour) return true;
  if (startHour === endHour) return startMinute < endMinute;
  return false;
};
