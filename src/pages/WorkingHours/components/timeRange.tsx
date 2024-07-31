import { ITimeRange, useWorkTimeStoreActions } from "@/store/work";
import TimeSelect from "./timeSelect";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import { DAY } from "@/constants/dayForm";
import { memo, useCallback } from "react";

interface TimeRangeProps {
  day: DAY;
  timeRange: ITimeRange;
  isLast?: boolean;
}

function TimeRange({ day, timeRange, isLast = false }: TimeRangeProps) {
  const { deleteTimeRangeByIdAt, addNewTimeRangeTo } =
    useWorkTimeStoreActions();

  const onClickDelete = useCallback(() => {
    deleteTimeRangeByIdAt(timeRange.id, day);
  }, [day, timeRange.id, deleteTimeRangeByIdAt]);

  const onClickAdd = useCallback(() => {
    addNewTimeRangeTo(day);
  }, [day, addNewTimeRangeTo]);

  return (
    <div className="time-range">
      <TimeSelect
        timeRangeId={timeRange.id}
        day={day}
        type="start"
        value={timeRange.startTime}
      />
      <p>&nbsp;-&nbsp;</p>
      <TimeSelect
        timeRangeId={timeRange.id}
        day={day}
        type="end"
        value={timeRange.endTime}
      />
      <IconButton
        onClick={onClickDelete}
        sx={{ width: "30px", height: "30px" }}
      >
        <DeleteOutlineIcon />
      </IconButton>
      {isLast && (
        <IconButton onClick={onClickAdd} sx={{ width: "30px", height: "30px" }}>
          <AddIcon />
        </IconButton>
      )}
    </div>
  );
}

export default memo(TimeRange);
