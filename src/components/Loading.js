import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = () => (
  <CircularProgress
    style={{
      position: "fixed",
      top: "calc(50% - 10px)",
      left: "calc(50% - 10px)"
    }}
  />
);

export default Loading;
