import { memo } from "react";
import { HOURS, MINUTES } from "@/constants/dayForm";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const options = HOURS.reduce((acc, hour) => {
  MINUTES.forEach((minute) => {
    acc.push(`${hour}:${minute}`);
  });

  return acc;
}, [] as string[]);

interface TimeSelectProps {
  value: string;
}

function TimeSelect({ value }: TimeSelectProps) {
  return (
    <Select
      size="small"
      value={value}
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
