import React from "react";
import { Circle, CircleMarker } from "react-leaflet";

class LocationMarker extends React.Component {
  render() {
    const position = [
      this.props.location.coords.latitude,
      this.props.location.coords.longitude
    ];
    const { accuracy, cached } = this.props.location.coords;
    return (
      <React.Fragment>
        {accuracy && !cached ? (
          <Circle
            center={position}
            radius={accuracy}
            interactive={false}
            opacity={0.5}
            weight={1}
          />
        ) : null}
        <CircleMarker
          center={position}
          color="white"
          fillColor={cached ? "grey" : "rgb(61, 146, 255)"}
          fillOpacity={1}
          radius={6}
          weight={1.5}
          interactive={false}
        />
      </React.Fragment>
    );
  }
}

export default LocationMarker;
