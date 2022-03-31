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
  const [name, setName] = React.useState("");
  // const store = createStore(reducer);
  //   const token =
  //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Ik5pdGRmaW4iLCJlbWFpbCI6ImR1cmdlc3Roc2lzZG5nQGdtYWlsLmNvbSIsImV4cCI6MTY0ODcxNjQxMn0.e7_W3Fu_435CzVTXgC_7F1Jv-8AG9Iz69wiMpGpSfOQ";
  const [result, setResult] = React.useState("");

  const loginData = () => {
    axios
      .post(`http://127.0.0.1:8000/api/auth/register`, {
        // email: "durgesthsisdng@gmail.com",
        // password: "ThisisfdfsorAjay@56",
        email: mail,
        username: name,
        password: password,
      })
      .then((response) => {
        if (result.status_code === 201) {
          alert("Account Created Successfully");
        } else {
          alert("Something went wrong");
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

  const handleClick = () => {
    history.push("/user");
  };

  const handleClickAccount = () => {
    history.push("/login");
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
                label="User Name"
                variant="outlined"
                style={{ width: "400px" }}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
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
                variant="outlined"
                style={{ width: "400px" }}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                style={{ width: "400px" }}
                color="primary"
                onClick={loginData}
              >
                Create Account
              </Button>
            </Grid>
            <Grid item xs={9}>
              <span style={{ marginLeft: "25px", cursor: 'pointer' }} onClick={handleClickAccount}>
                Have an account. Sign In
              </span>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
