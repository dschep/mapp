import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PlusIcon from "@material-ui/icons/Add";
import MinusIcon from "@material-ui/icons/Minimize";
import Fab from "@material-ui/core/Fab";
import { actions, connect } from "../../store";

const styles = theme => ({
  fab1: {
    zIndex: 1200,
    position: "fixed",
    bottom: theme.spacing.unit * 2 + 48,
    right: theme.spacing.unit * 2
  },
  fab2: {
    zIndex: 1200,
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  minus: {
    marginTop: "-17px" // because Minimize isn't centered.. such a hack
  }
});

const ZoomControl = ({ classes, zoomLevel }) => (
  <React.Fragment>
    <Fab
      style={{ background: "white" }}
      size="small"
      className={classes.fab1}
      onClick={() => actions.setZoomLevel(zoomLevel + 1)}
      disabled={zoomLevel >= 20}
    >
      <PlusIcon />
    </Fab>
    <Fab
      style={{ background: "white" }}
      size="small"
      className={classes.fab2}
      onClick={() => actions.setZoomLevel(zoomLevel - 1)}
      disabled={zoomLevel <= 0}
    >
      <MinusIcon className={classes.minus} />
    </Fab>
  </React.Fragment>
);

const mapStateToProps = ({ zoomLevel }) => ({ zoomLevel });

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(ZoomControl)
);
