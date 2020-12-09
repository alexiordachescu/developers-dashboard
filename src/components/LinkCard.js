import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";
import { onLinkDelete } from "../store/links/actions";
import ClipBoard from "./ClipBoard";
import { Grid } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles({
  root: {
    width: "20rem",
    height: "10rem",
    backgroundColor: "#333333",
  },
  media: {
    height: 140,
    color: "#FFFFFF",
    textDecoration: "none",
  },
  linkName: {
    color: "#58A6FF",
  },
});

const LinkCard = (props) => {
  const dispatch = useDispatch();

  const onDelete = (id) => {
    dispatch(onLinkDelete(id));
  };

  const classes = useStyles();
  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Grid item container justify="space-between">
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.linkName}
            >
              {props.name}
            </Typography>
            <ClipBoard code={props.content} />
          </Grid>
          <Typography variant="body2" color="textSecondary" component="span">
            <a href={props.content} className={classes.media}>
              {props.content}
            </a>
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="secondary"
            variant="contained"
            disableElevation
            onClick={() => onDelete(props.id)}
            endIcon={<DeleteForeverIcon />}
          >
            Remove Link
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default LinkCard;
