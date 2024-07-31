import { DAY } from "@/constants/dayForm";
import DayRow from "./dayRow";
import { Button } from "@mui/material";

const DAYS = Object.entries(DAY).map(([key, value]) => value);

export default function WeekScheduleForm() {
  return (
    <form className="week-form" onSubmit={(e) => e.preventDefault()}>
      <div className="form-body">
        {DAYS.map((day) => (
          <DayRow key={day} day={day} />
        ))}
      </div>
      <div className="form-footer">
        <Button size="small" type="button">
          Cancel
        </Button>
        <Button size="small">Update</Button>
      </div>
    </form>
  );
}
