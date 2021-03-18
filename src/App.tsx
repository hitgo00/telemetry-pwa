import React from "react";
import "./App.css";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SystemData from "./pages/SystemData";
import SystemDiagnostics from "./pages/SystemDiagnostics";
import SystemState from "./pages/SystemState";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/diagnostics">
            <SystemDiagnostics />
          </Route>
          <Route path="/state">
            <SystemState />
          </Route>
          <Route path="/">
            <SystemData />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
