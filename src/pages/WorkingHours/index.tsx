import WeekScheduleForm from "./components/weekScheduleForm";
import "./working.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function WorkingHours() {
  return (
    <main className="work-page">
      <div className="left-column">
        <p>Working hour</p>
      </div>
      <div className="right-column">
        <div className="right-header">
          <p>Set your weekly hours</p>
          <KeyboardArrowDownIcon />
        </div>
        <WeekScheduleForm />
      </div>
    </main>
  );
}

export default WorkingHours;
