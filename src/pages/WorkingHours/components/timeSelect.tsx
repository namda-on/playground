import { memo, useCallback } from "react";
import { DAY, HOURS, MINUTES } from "@/constants/dayForm";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TimeSelectType, useWorkTimeStoreActions } from "@/store/work";

const options = HOURS.reduce((acc, hour) => {
  MINUTES.forEach((minute) => {
    acc.push(`${hour}:${minute}`);
  });

  return acc;
}, [] as string[]);

interface TimeSelectProps {
  timeRangeId: string;
  day: DAY;
  type: TimeSelectType;
  value: string;
}

function TimeSelect({ value, type, day, timeRangeId }: TimeSelectProps) {
  const { updateTimeRangeValue } = useWorkTimeStoreActions();

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
