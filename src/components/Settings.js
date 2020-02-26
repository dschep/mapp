import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { connect/*, actions*/ } from "../store";

const styles = theme => ({
  container: {
    margin: theme.spacing(2)
  }
});

const Settings = ({ classes }) => (
  <div className={classes.container}>
    <Typography variant="h6">
      Section
    </Typography>
    <div>
      Stuff
    </div>
  </div>
);

const mapStateToProps = () => ({});

export default withStyles(styles)(connect(mapStateToProps)(Settings));
