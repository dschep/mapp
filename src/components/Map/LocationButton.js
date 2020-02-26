import React from "react";
import { withStyles } from "@material-ui/core/styles";
import LocationIcon from "@material-ui/icons/GpsFixed";
import Fab from "@material-ui/core/Fab";

const styles = theme => ({
  fab: {
    zIndex: 1200,
    position: "fixed",
    bottom: theme.spacing(2) + 48 * 2,
    right: theme.spacing(2)
  }
});

const LocationButton = ({ classes, following, onClick }) => (
  <Fab
    size="small"
    className={classes.fab}
    onClick={onClick}
    style={{ background: "white" }}
  >
    <LocationIcon color={following ? "primary" : "inherit"} />
  </Fab>
);
export default withStyles(styles, { withTheme: true })(LocationButton);
