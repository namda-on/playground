import { DAY } from "@/constants/dayForm";
import DayRow from "./dayRow";
import { useWorkTimeHasDiff } from "@/store/work";
import WeekScheduleFormFooter from "./weekScheduleFormFooter";

const DAYS = Object.entries(DAY).map(([key, value]) => value);

export default function WeekScheduleForm() {
  const hasDiff = useWorkTimeHasDiff();

  return (
    <form className="week-form" onSubmit={(e) => e.preventDefault()}>
      <div className="form-body">
        {DAYS.map((day) => (
          <DayRow key={day} day={day} />
        ))}
      </div>
      {hasDiff && <WeekScheduleFormFooter />}
    </form>
  );
}
