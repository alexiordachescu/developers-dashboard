import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useDispatch } from "react-redux";
import {
  editCodeSnippet,
  deleteSnippet,
  editCommentSnippet,
} from "../store/snippets/actions";
import TextField from "@material-ui/core/TextField";
import ClipBoard from "./ClipBoard";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      maxWidth: 450,
    },
  },
  media: {
    height: 140,
  },
}));

const CodeSnippetCard = (props) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [editCommentMode, setEditCommentMode] = useState(false);
  const [editText, setEditText] = useState("");
  const [editCommentText, setEditCommentText] = useState("");

  // console.log("i am edit text,", editText);
  // console.log("i am id,", props.id);

  function editSnippet() {
    // console.log("snippet id", props.id);
    dispatch(editCodeSnippet(editText, props.id));
    setEditMode(false);
  }
  function editSnippetComment() {
    console.log("snippet id", props.id);
    dispatch(editCommentSnippet(editCommentText, props.id));
    setEditCommentMode(false);
  }
  const onDelete = (id) => {
    // console.log("deleting snippet!", id);

    dispatch(deleteSnippet(id));
  };

  const classes = useStyles();
  return (
    <div>
      <Card className={classes.root}>
        {/* <CardActionArea> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          {!editMode ? (
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
              <ClipBoard code={props.content} />
            </Typography>
          ) : (
            <div>
              <Typography
                variant="body2"
                color="textSecondary"
                component="span"
                className={classes.media}
              >
                <TextField
                  id="outlined-basic"
                  label="Snippet"
                  variant="outlined"
                  multiline
                  defaultValue={props.content}
                  onChange={(event) => setEditText(event.target.value)}
                />
              </Typography>
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  editSnippet();
                }}
              >
                save
              </Button>
            </div>
          )}
          {!editCommentMode ? (
            <Typography gutterBottom variant="h5" component="h2">
              {props.comment}
            </Typography>
          ) : (
            <div>
              <Typography gutterBottom variant="h5" component="h2">
                <TextField
                  id="outlined-basic"
                  label="Comment"
                  variant="outlined"
                  defaultValue={props.comment}
                  onChange={(event) => setEditCommentText(event.target.value)}
                />
              </Typography>
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  editSnippetComment();
                }}
              >
                save
              </Button>
            </div>
          )}
        </CardContent>
        {/* </CardActionArea> */}
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              setEditCommentMode(!editCommentMode);
            }}
          >
            edit comment
          </Button>

          <Button
            size="small"
            color="primary"
            onClick={() => {
              onDelete(props.id);
            }}
          >
            remove snippet
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              setEditMode(!editMode);
            }}
          >
            edit snippet
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default CodeSnippetCard;
