import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  dark,
  dracula,
  tomorrow,
  a11yDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";

const useStyles = makeStyles({
  root: {
    maxWidth: 450,
  },
  media: {
    height: 140,
  },
});

const CodeSnippetCard = (props) => {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.name}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="span"
              className={classes.media}
            >
              <SyntaxHighlighter
                language="js"
                style={a11yDark}
                children={props.content}
                showLineNumbers={true}
              />
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              {props.comment}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Add comment
          </Button>
          <Button size="small" color="primary">
            remove Tip
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default CodeSnippetCard;
