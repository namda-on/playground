import { memo, useCallback, useMemo } from "react";
import { DAY } from "@/constants/dayForm";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TimeSelectType, useWorkTimeStoreActions } from "@/store/work";
import {
  getAvailableTimeOptions,
  getNextTimeOption,
} from "@/libs/workTimeUtils";

interface TimeSelectProps {
  timeRangeId: string;
  day: DAY;
  type: TimeSelectType;
  value: string;
  availableStartTime?: string;
}

function TimeSelect({
  value,
  type,
  day,
  timeRangeId,
  availableStartTime,
}: TimeSelectProps) {
  const { updateTimeRangeValue } = useWorkTimeStoreActions();

  const availableTimeOption = useMemo(
    () =>
      !availableStartTime || type === "start"
        ? availableStartTime
        : getNextTimeOption(availableStartTime),
    [availableStartTime, type]
  );

  const options = useMemo(
    () => getAvailableTimeOptions(availableTimeOption),
    [availableTimeOption]
  );

  const onSelect = useCallback(
    (event: SelectChangeEvent<string>) => {
      const newValue = event.target.value;

      updateTimeRangeValue({
        value: newValue,
        type,
        day,
        timeRangeId: timeRangeId,
      });
    },
    [type, day, timeRangeId, updateTimeRangeValue]
  );

  return (
    <Select
      size="small"
      value={value}
      onChange={onSelect}
      MenuProps={{ PaperProps: { sx: { maxHeight: 180 } } }}
    >
      {options.map((time) => (
        <MenuItem key={time} value={time}>
          {time}
        </MenuItem>
      ))}
    </Select>
  );
}

export default memo(TimeSelect);
