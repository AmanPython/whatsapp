import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";
// import { createStore } from 'redux';
// import reducer from './reducers/reducer'
import { createStore } from "redux";
import { Reducer } from "redux";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  //   paper: {
  //     marginTop: theme.spacing(8),
  //     display: "flex",
  //     flexDirection: "column",
  //     alignItems: "center",
  //   },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const [mail, setMail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [token, setToken] = React.useState("");
  // const store = createStore(reducer);
  //   const token =
  //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Ik5pdGRmaW4iLCJlbWFpbCI6ImR1cmdlc3Roc2lzZG5nQGdtYWlsLmNvbSIsImV4cCI6MTY0ODcxNjQxMn0.e7_W3Fu_435CzVTXgC_7F1Jv-8AG9Iz69wiMpGpSfOQ";
  const [result, setResult] = React.useState("");

  const loginData = () => {
    axios
      .post(`http://127.0.0.1:8000/api/auth/login`, {
        // email: "durgesthsisdng@gmail.com",
        // password: "ThisisfdfsorAjay@56",
        email: mail,
        password: password,
      })
      .then((response) => {
        console.log("error ", response);
        if (response.status === 200) {
          // console.log(response.data.token);
          setToken(response.data.token);
          let state = { token: response.data.token };

          let state_string = JSON.stringify(state);

          localStorage.setItem("my_saved_token", state_string);
          handleClick(response.data.token);
        } else {
          alert("Invalid Credentials");
        }
      });
  };
  const getData = () => {
    axios
      .get(`http://127.0.0.1:8000/chat/room_name/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  const handleClick = (val) => {
    // history.push("/user");
    history.push({
      pathname: `/user`,
      state: {
        auth_token: val,
      },
    });
  };

  const handleClickAccount = () => {
    history.push("/create-account");
  };

  return (
    <div className={classes.root}>
      <Grid container style={{ marginTop: "200px" }}>
        <Grid item xs={12}>
          <Grid
            container
            spacing={3}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Email Address"
                variant="outlined"
                style={{ width: "400px" }}
                onChange={(e) => setMail(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Password"
                type="Password"
                variant="outlined"
                style={{ width: "400px" }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={4} style={{ marginRight: "245px" }}>
              {" "}
              <FormControlLabel
                control={
                  <Checkbox
                    // checked={state.checkedB}
                    // onChange={handleChange}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Remember Me"
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                style={{ width: "400px" }}
                color="primary"
                onClick={loginData}
              >
                Sign In
              </Button>
            </Grid>
            <Grid item xs={9}>
              <span>Forgot Password ?</span>
              <span
                style={{ marginLeft: "45px", cursor: "pointer" }}
                onClick={handleClickAccount}
              >
                Don't have an account? Sign up
              </span>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
