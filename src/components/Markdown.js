import React from "react";
import ReactMarkdown from "markdown-to-jsx";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  listItem: {
    marginTop: theme.spacing(1)
  },
  padding: {
    padding: "20px"
  }
});

const options = {
  overrides: {
    h1: {
      component: props => <Typography gutterBottom variant="h4" {...props} />
    },
    h2: {
      component: props => <Typography gutterBottom variant="h6" {...props} />
    },
    h3: {
      component: props => (
        <Typography gutterBottom variant="subtitle1" {...props} />
      )
    },
    h4: {
      component: props => (
        <Typography gutterBottom variant="caption" paragraph {...props} />
      )
    },
    p: { component: props => <Typography paragraph {...props} /> },
    li: {
      component: withStyles(styles)(({ classes, ...props }) => (
        <li className={classes.listItem}>
          <Typography component="span" {...props} />
        </li>
      ))
    }
  }
};

function Markdown(props) {
  return (
    <div className={props.classes.padding}>
      <ReactMarkdown options={options} {...props} />
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(Markdown);
