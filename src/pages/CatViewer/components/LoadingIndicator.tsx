import { OrbitProgress } from "react-loading-indicators";

export default function LoadingIndicator() {
  return (
    <div className="loading-indicator">
      <OrbitProgress size="small" color="#5d685d" />
    </div>
  );
}
