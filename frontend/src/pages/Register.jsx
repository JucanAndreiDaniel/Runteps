import React from "react";
import { Link, Navigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

import useForm from "../hooks/useForm";
import useAuth from "../hooks/useAuth";
import { UserContext } from "../hooks/UserContext";
import loginImage from "../static/loginImage.png";

export default function Register() {
  const { user } = React.useContext(UserContext);

  const { values, handleChange } = useForm({
    initialValues: {
      email: "",
      username: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const { registerUser } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    await registerUser(values);
  };
  if (!user) {
    return (
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleRegister}
              sx={{ mt: 1, mr: 15, ml: 15 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                inputProps={{
                  "aria-label": "email",
                  form: {
                    autoComplete: "off",
                  },
                }}
                label="Email Address"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                inputProps={{
                  "aria-label": "username",
                  form: {
                    autoComplete: "off",
                  },
                }}
                label="Username"
                name="username"
                value={values.username}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                inputProps={{
                  "aria-label": "password",
                  form: {
                    autoComplete: "off",
                  },
                }}
                id="password"
                value={values.password}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="passwordConfirm"
                label="Password Confirmation"
                type="password"
                inputProps={{
                  minLength: 8,
                  "aria-label": "passwordConfirm",
                  form: {
                    autoComplete: "off",
                  },
                }}
                id="passwordConfirm"
                value={values.passwordConfirm}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/login">{"Already have an account? Sign In"}</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: `url(${loginImage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    );
  } else {
    return <Navigate to="/home" />;
  }
}
