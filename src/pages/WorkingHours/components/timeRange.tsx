import { ITimeRange, useWorkTimeStoreActions } from "@/store/work";
import TimeSelect from "./timeSelect";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import { DAY, LAST_VALID_END_TIME } from "@/constants/dayForm";
import { memo, useCallback, useMemo } from "react";
import { isEarlierThan } from "@/libs/workTimeUtils";

interface TimeRangeProps {
  day: DAY;
  timeRange: ITimeRange;
  isLast?: boolean;
}

function TimeRange({ day, timeRange, isLast = false }: TimeRangeProps) {
  const { deleteTimeRangeByIdAt, addNewTimeRangeTo } =
    useWorkTimeStoreActions();

  const isValidRange = useMemo(
    () => isEarlierThan(timeRange.startTime, timeRange.endTime),
    [timeRange.startTime, timeRange.endTime]
  );

  const canAddRow = useMemo(
    () => timeRange.endTime !== LAST_VALID_END_TIME,
    [timeRange.endTime]
  );

  const onClickDelete = useCallback(() => {
    deleteTimeRangeByIdAt(timeRange.id, day);
  }, [day, timeRange.id, deleteTimeRangeByIdAt]);

  const onClickAdd = useCallback(() => {
    addNewTimeRangeTo(day);
  }, [day, addNewTimeRangeTo]);

  return (
    <div className="time-range-container">
      <div className={`time-range ${!isValidRange ? "error" : ""} `}>
        <TimeSelect
          timeRangeId={timeRange.id}
          day={day}
          type="start"
          value={timeRange.startTime}
          availableStartTime={timeRange.availableStartTime}
        />
        <p>&nbsp;-&nbsp;</p>
        <TimeSelect
          timeRangeId={timeRange.id}
          day={day}
          type="end"
          value={timeRange.endTime}
          availableStartTime={timeRange.availableStartTime}
        />
      </div>

      <IconButton
        onClick={onClickDelete}
        sx={{ width: "30px", height: "30px" }}
      >
        <DeleteOutlineIcon />
      </IconButton>
      {isLast && canAddRow && (
        <IconButton onClick={onClickAdd} sx={{ width: "30px", height: "30px" }}>
          <AddIcon />
        </IconButton>
      )}
    </div>
  );
}

export default memo(TimeRange);
