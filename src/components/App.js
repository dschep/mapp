import React from "react";
import { actions, connect } from "../store";
import AppBar from "./AppBar";
import AppDrawer from "./AppDrawer";
import Settings from "./Settings";
import Help from "./Help";
import ErrorSnackbar from "./ErrorSnackbar";
import IosPwaPrompt from "./IosPwaPrompt";
import MapComponent from "./Map";
import "./App.css";

class App extends React.Component {
  componentDidMount() {
    actions.watchLocation();
  }
  render() {
    const { path, error } = this.props;
    let viewComponent;
    if (path === "/about") {
      viewComponent = <Help />;
    } else if (path === "/settings") {
      viewComponent = <Settings />;
    } else {
      viewComponent = (
        <React.Fragment>
          <MapComponent />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <IosPwaPrompt />
        <AppBar path={path} />
        <div style={{ height: "56px" }} />
        <AppDrawer path={path} />
        {viewComponent}
        {error ? <ErrorSnackbar /> : null}
      </React.Fragment>
    );
  }
}

export default connect(({ path, error }) => ({ path, error }))(App);
