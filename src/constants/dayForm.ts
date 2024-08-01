export enum DAY {
  SUNDAY = "Sunday",
  MONDAY = "Monday",
  TUESDAY = "Tuesday",
  WEDNESDAY = "Wednesday",
  THURSDAY = "Thursday",
  FRIDAY = "Friday",
  SATURDAY = "Saturday",
}

export const HOURS = Array(24)
  .fill(undefined)
  .map((_, idx) => {
    if (idx.toString().length === 1) {
      return `0${idx}`;
    }
    return idx;
  });

export const MINUTES = ["00", "15", "30", "45"];

export const LAST_VALID_END_TIME = "23:30";
