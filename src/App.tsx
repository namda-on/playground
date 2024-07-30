import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CatViewer from "./pages/CatViewer";
import WorkingHours from "./pages/WorkingHours";
import "./App.css";
import HomePage from "./pages/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/cat-viewer" component={CatViewer} />
        <Route path="/working-hour" component={WorkingHours} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  );
}

export default App;
