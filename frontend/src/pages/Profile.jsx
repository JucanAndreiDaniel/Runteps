import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Header from "../sections/Header";
import useForm from "../hooks/useForm";
import useResetPassword from "../hooks/useResetPass";
import { Avatar, Button, TextField } from "@mui/material";

export default function Profile() {

  const { values, handleChange } = useForm({
    old_password: "",
    new_password1: "",
    new_password2: "",
  });

  const { passwordChange } = useResetPassword();

  const handleSubmit = (event) => {
    event.preventDefault();
    passwordChange(values.old_password, values.new_password1, values.new_password2);
  };

  return (
    <React.Fragment>
      <Header />
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <Container disableGutters component="main" className="container">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Account Settings
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={2}>
            <Card
              sx={{
                backgroundColor: "background.darkBlue",
                border: "1px solid",
                borderRadius: "borderRadius.default",
                boxShadow: "card.default",
                color: "text.primary",
                width: "100%",
              }}
            >
              <CardContent>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom >
                      Profile
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={10}>
            <Card
              sx={{
                backgroundColor: "background.darkBlue",
                border: "1px solid",
                borderRadius: "borderRadius.default",
                boxShadow: "card.default",
                color: "text.primary",
                width: "100%",
              }}
            >
              <CardContent>
                <Grid container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={3}
                >
                  <Grid item xs={12}>
                    <Card
                      sx={{
                        backgroundColor: "background.darkBlue",
                        border: "1px solid",
                        borderRadius: "borderRadius.default",
                        boxShadow: "card.default",
                        color: "text.primary",
                        width: "100%",
                      }}
                    >
                      <CardContent>
                        <Grid container
                          spacing={3}
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="center"
                        >
                          <Grid item xs={4}>
                            <Avatar
                              src="https://picsum.photos/200"
                              sx={{
                                width: "10vw",
                                height: "10vw",
                                borderRadius: "borderRadius.default",
                                boxShadow: "card.default",
                                color: "text.primary",
                              }}
                            />
                          </Grid>
                          <Grid item xs={8}>
                            <Button variant="contained" color="primary">
                              Upload New Photo
                            </Button>
                            <Button variant="outlined" color="error"
                              sx={{
                                ml: 3,
                              }}
                            >
                              Remove Photo
                            </Button>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card
                      sx={{
                        backgroundColor: "background.darkBlue",
                        border: "1px solid",
                        borderRadius: "borderRadius.default",
                        boxShadow: "card.default",
                        color: "text.primary",
                        width: "100%",
                      }}
                    >
                      <CardContent>
                        <Grid container
                          spacing={3}
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="center"
                        >
                          <Grid item xs={12}>
                            <Typography variant="h5" gutterBottom >
                              Change Password
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="body1" gutterBottom >
                              Current Password
                            </Typography>
                            <TextField
                              variant="outlined"
                              type="password"
                              placeholder="Current Password"
                              name="old_password"
                              id="currentPassword"
                              value={values.old_password}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="body1" gutterBottom >
                              New Password
                            </Typography>
                            <TextField
                              variant="outlined"
                              type="password"
                              placeholder="New Password"
                              name="new_password1"
                              id="newPassword"
                              value={values.new_password1}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="body1" gutterBottom >
                              Confirm New Password
                            </Typography>
                            <TextField
                              variant="outlined"
                              type="password"
                              placeholder="Confirm New Password"
                              name="new_password2"
                              id="confirmNewPassword"
                              value={values.new_password2}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Button variant="contained" color="primary"
                              onClick={handleSubmit}
                            >
                              Change Password
                            </Button>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
