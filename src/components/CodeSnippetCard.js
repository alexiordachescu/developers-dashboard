import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useDispatch } from "react-redux";
import {
  editCodeSnippet,
  deleteSnippet,
  editCommentSnippet,
} from "../store/snippets/actions";
import ClipBoard from "./ClipBoard";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import RateReviewIcon from "@material-ui/icons/RateReview";
import { CssTextField } from "./AddSnippet";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      backgroundColor: "#333333",
      wordBreak: "break-all",
    },
  },
  media: {
    height: 140,
    color: "#5e35b1",
  },
  codeStyle: { overflow: "auto" },
  textColor: { color: "#58A6FF" },
  commentsColor: { color: "#FFFFFF" },
}));

const CodeSnippetCard = (props) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [editCommentMode, setEditCommentMode] = useState(false);
  const [editText, setEditText] = useState(props.content);
  const [editCommentText, setEditCommentText] = useState(props.comment);

  function editSnippet() {
    dispatch(editCodeSnippet(editText, props.id));
    setEditMode(false);
  }
  function editSnippetComment() {
    dispatch(editCommentSnippet(editCommentText, props.id));
    setEditCommentMode(false);
  }
  const onDelete = (id) => {
    dispatch(deleteSnippet(id));
  };

  const classes = useStyles();
  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.textColor}
          >
            {props.name}
          </Typography>
          {!editMode ? (
            <Typography
              variant="body2"
              color="textSecondary"
              component="span"
              className={classes.media}
            >
              <Grid container direction="column" alignItems="center">
                <Grid item container xs={12} justify="flex-end">
                  <ClipBoard code={props.content} />
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  direction="column"
                  justify="center"
                  alignItems="stretch"
                  className={classes.codeStyle}
                >
                  <SyntaxHighlighter
                    language="js"
                    style={dracula}
                    children={props.content}
                    showLineNumbers={true}
                  />
                </Grid>
              </Grid>
            </Typography>
          ) : (
            <Grid item>
              <Typography
                variant="body2"
                color="textSecondary"
                component="span"
                className={classes.media}
              >
                <CssTextField
                  label="Snippet"
                  variant="filled"
                  multiline
                  fullWidth
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
            </Grid>
          )}
          {!editCommentMode ? (
            <Typography
              gutterBottom
              variant="body1"
              component="h2"
              className={classes.commentsColor}
            >
              {props.comment}
            </Typography>
          ) : (
            <div>
              <Typography gutterBottom variant="h5" component="h2">
                <CssTextField
                  label="Comment"
                  variant="filled"
                  fullWidth
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
          )}{" "}
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Button
              size="small"
              color="primary"
              variant="contained"
              disableElevation
              onClick={() => {
                setEditCommentMode(!editCommentMode);
                setEditMode(false);
              }}
              endIcon={<RateReviewIcon />}
            >
              {editCommentMode ? "cancel" : "edit comment"}
            </Button>
            <Button
              size="small"
              color="primary"
              variant="contained"
              disableElevation
              onClick={() => {
                setEditMode(!editMode);
                setEditCommentMode(false);
              }}
              endIcon={<EditIcon />}
            >
              {editMode ? "cancel" : "edit snippet"}
            </Button>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              disableElevation
              onClick={() => {
                onDelete(props.id);
              }}
              endIcon={<DeleteForeverIcon />}
            >
              remove snippet
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default CodeSnippetCard;
