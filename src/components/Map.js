import React from "react";
import { actions, connect } from "../store";
import MaterialLeafletMap from "./MaterialLeafletMap";
import ZoomControl from "./ZoomControl";

class MapComponent extends React.Component {
  render() {
    return (
      <MaterialLeafletMap
        location={this.props.location}
        zoom={this.props.zoomLevel}
        maxZoom={20}
        zoomControl={false}
        style={{ height: "100%", width: "100%", marginTop: "-56px" }}
        onZoomEnd={({ target: { _zoom } }) => actions.setZoomLevel(_zoom)}
      >
        <ZoomControl />
      </MaterialLeafletMap>
    );
  }
}

const mapStateToProps = ({ location, zoomLevel }) => ({ location, zoomLevel });
export default connect(mapStateToProps)(MapComponent);
