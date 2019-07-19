import _ from "lodash";
import React from "react";
import "leaflet/dist/leaflet.css";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import LocationMarker from "./LocationMarker";
import LocationButton from "./LocationButton";

//const tilelayerURL = "https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}{r}?access_token=ADD ME HERE";
const tilelayerURL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

class MaterialLeafletMap extends React.Component {
  constructor() {
    super();
    this.state = { following: true };
  }
  render() {
    const leafletProps = _.omit(this.props, ["children", "location"]);
    const { location, children } = this.props;
    if (this.state.following) {
      leafletProps.center = [
        location.coords.latitude,
        location.coords.longitude
      ];
    }
    return (
      <LeafletMap
        {...leafletProps}
        onDragend={() => this.setState({ following: false })}
      >
        <TileLayer
          url={tilelayerURL}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationButton
          following={this.state.following}
          onClick={() => this.setState({ following: true })}
        />
        <LocationMarker location={location} />
        {children}
      </LeafletMap>
    );
  }
}

export default MaterialLeafletMap;
