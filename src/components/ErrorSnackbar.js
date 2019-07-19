import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { connect, actions } from "../store";

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

const ErrorSnackbar = ({ classes, error }) => (
  <Snackbar
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left"
    }}
    open={true}
    onClose={() => actions.setError()}
    message={<span id="message-id">{error.toString()}</span>}
    action={[
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        className={classes.close}
        onClick={() => actions.setError()}
      >
        <CloseIcon />
      </IconButton>
    ]}
  />
);

ErrorSnackbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  connect(({ error }) => ({ error }))(ErrorSnackbar)
);
