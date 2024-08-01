import { IconButton } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";

interface FetchErrorIndicatorProps {
  refetch: () => void;
}

export default function FetchErrorIndicator({
  refetch,
}: FetchErrorIndicatorProps) {
  return (
    <div className="indicator-container">
      <IconButton size="large" onClick={refetch}>
        <ReplayIcon />
      </IconButton>
    </div>
  );
}
