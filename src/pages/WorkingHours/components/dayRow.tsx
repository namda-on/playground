import { DAY } from "@/constants/dayForm";
import { useWorkTimeAt, useWorkTimeStoreActions } from "@/store/work";
import TimeRange from "./timeRange";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import { memo, useCallback } from "react";

interface DayRowProps {
  day: DAY;
}

function DayRow({ day }: DayRowProps) {
  const { addNewTimeRangeTo } = useWorkTimeStoreActions();
  const timeRanges = useWorkTimeAt(day);
  const addTimeRange = useCallback(() => {
    addNewTimeRangeTo(day);
  }, [day, addNewTimeRangeTo]);

  return (
    <div className="day-row">
      <div className="day-row-left">
        <p>{day}</p>
      </div>
      <div className="day-row-right">
        {timeRanges.length ? (
          timeRanges.map((timeRange, idx) => (
            <TimeRange
              key={timeRange.id}
              day={day}
              timeRange={timeRange}
              isLast={idx === timeRanges.length - 1}
            />
          ))
        ) : (
          <IconButton
            onClick={addTimeRange}
            sx={{ width: "30px", height: "30px" }}
          >
            <AddIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
}

export default memo(DayRow);
