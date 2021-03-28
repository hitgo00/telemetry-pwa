import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SystemDataPage from "./pages/SystemData";
import SystemDiagnosticsPage from "./pages/SystemDiagnostics";
import SystemStatePage from "./pages/SystemState";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/diagnostics">
            <SystemDiagnosticsPage />
          </Route>
          <Route path="/state">
            <SystemStatePage />
          </Route>
          <Route path="/">
            <SystemDataPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
