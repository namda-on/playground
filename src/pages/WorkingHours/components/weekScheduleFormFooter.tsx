import { useIsWorkTimeValid, useWorkTimeStoreActions } from "@/store/work";
import { Button } from "@mui/material";

export default function WeekScheduleFormFooter() {
  const isValidWorkTime = useIsWorkTimeValid();
  const { resetWorkTimeToSavedVersion, saveCurrentWorkTime } =
    useWorkTimeStoreActions();

  return (
    <div className="form-footer">
      <Button
        onClick={resetWorkTimeToSavedVersion}
        size="small"
        type="button"
        sx={{ height: "40px" }}
      >
        Cancel
      </Button>
      <Button
        onClick={saveCurrentWorkTime}
        variant="contained"
        size="small"
        sx={{ height: "40px" }}
        disabled={!isValidWorkTime}
      >
        Update
      </Button>
    </div>
  );
}
