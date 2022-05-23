import React from "react";
import Header from "../sections/Header";
import { Redirect } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";

export default function Landing() {
  const { user } = React.useContext(UserContext);
  if (user) {
    return <Redirect to="/home" />;
  }

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <Header />
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Runteps
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          A place to run your code and take classes
        </Typography>
      </Container>
    </React.Fragment>
  );
}
