import { useWorkTimeStoreActions } from "@/store/work";
import { Button } from "@mui/material";

export default function WeekScheduleFormFooter() {
  const { resetWorkTimeToSavedVersion } = useWorkTimeStoreActions();

  return (
    <div className="form-footer">
      <Button
        onClick={() => resetWorkTimeToSavedVersion()}
        size="small"
        type="button"
      >
        Cancel
      </Button>
      <Button size="small">Update</Button>
    </div>
  );
}
