import { OrbitProgress } from "react-loading-indicators";

export default function LoadingIndicator() {
  return (
    <div className="indicator-container">
      <OrbitProgress size="small" color="#5d685d" />
    </div>
  );
}
