import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="App">
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
        }}
      >
        <ul>
          <li>
            <Link to="/cat-viewer">CatViewer</Link>
          </li>
          <li>
            <Link to="/working-hour">WorkingHours</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
