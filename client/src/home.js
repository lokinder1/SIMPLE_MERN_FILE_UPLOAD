import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SingleFileUpload from "./components/Post/SingleFileUpload";

import MultiFileUpload from "./components/Post/MultiFileUpload";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import HomeIcon from "@material-ui/icons/Home";
import Paper from "@material-ui/core/Paper";

import Button from "@material-ui/core/Button";
import PersonalFooter from "@bit/lokinder1.footers.personal-footer";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    "overflow-x": "hidden",
  },
  main: {
    marginBottom: "-1px",
    minHeight: "87vh",
  },

  uploadFile: {
    padding: " 50px !important",
  },

  button: {
    margin: " 8px !important",
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <div className={classes.main}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<HomeIcon />}
            >
              Home
            </Button>
          </Link>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/">
              <Grid container spacing={2}>
                <Grid className={classes.uploadFile} item xs={12} sm={6}>
                  <Paper elevation={3}>
                    <SingleFileUpload />
                  </Paper>
                </Grid>

                <Grid className={classes.uploadFile} item xs={12} sm={6}>
                  <Paper elevation={3}>
                    <MultiFileUpload />
                  </Paper>
                </Grid>
              </Grid>
            </Route>
          </Switch>
        </div>
        <PersonalFooter />
      </div>
    </Router>
  );
}
