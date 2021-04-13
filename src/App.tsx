import "./App.css";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SystemDataPage from "./pages/SystemData";
import SystemDiagnosticsPage from "./pages/SystemDiagnostics";
import SystemStatePage from "./pages/SystemState";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  return (
    <Router>
      {/* <ThemeProvider theme={darkTheme}> */}
      <div className="App">
        <Navbar>
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
        </Navbar>
      </div>
      {/* </ThemeProvider> */}
    </Router>
  );
}

export default App;
