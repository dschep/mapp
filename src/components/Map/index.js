import React from "react";
import "leaflet/dist/leaflet.css";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import LocationMarker from "./LocationMarker";
import LocationButton from "./LocationButton";
import { actions, connect } from "../../store";
import ZoomControl from "./ZoomControl";

//const tilelayerURL = "https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}{r}?access_token=ADD ME HERE";
const tilelayerURL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

class MapComponent extends React.Component {
  render() {
    const { location, center, following } = this.props;
    return (
      <LeafletMap
        center={center}
        zoom={this.props.zoomLevel}
        maxZoom={20}
        zoomControl={false}
        style={{ height: "100%", width: "100%", marginTop: "-56px" }}
        onZoomEnd={({ target: { _zoom } }) => {
          actions.setZoomLevel(_zoom);
          actions.setFollowing(false);
        }}
        onMoveEnd={(event) => {
          actions.setCenter(event.target.getCenter());
        }}
        onDragEnd={() => actions.setFollowing(false)}
      >
        <TileLayer
          url={tilelayerURL}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationButton
          following={following}
          onClick={() => actions.setFollowing(true)}
        />
        <LocationMarker location={location} />
        <ZoomControl />
      </LeafletMap>
    );
  }
}

const mapStateToProps = ({ center, following, location, zoomLevel }) => ({ center, following, location, zoomLevel });
export default connect(mapStateToProps)(MapComponent);
