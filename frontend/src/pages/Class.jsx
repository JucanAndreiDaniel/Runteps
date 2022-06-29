import React from "react";
import { useParams } from "react-router";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import LinearProgress from "@mui/material/LinearProgress";
import GlobalStyles from "@mui/material/GlobalStyles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Header from "../sections/Header";
import { getClass } from "../hooks/useClasses";

function ClassCard(props) {
  const { className, classId, description } = props;

  let progress = 10;

  return (
    <Card sx={{ minWidth: 275, maxWidth: 300 }}>
      <CardContent>
        <Stack spacing={2}>
          <Typography gutterBottom variant="h5" component="h2">
            {className}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>

          <Box sx={{ width: "100%" }}>
            <Typography variant="body2" component="p">
              {classId}%
            </Typography>
            <LinearProgress variant="determinate" value={classId} />
          </Box>
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small">Begin Course</Button>
      </CardActions>
    </Card>
  );
}

export default function Class() {
  const [classObj, setClassObj] = React.useState({});

  let params = useParams();
  React.useEffect(() => {
    console.log(params.classId)
    getClass(params.classId).then((res) => {
      setClassObj(res.data);
    });
  }, []);

  return (
    <>
      <Header />
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <Container
        disableGutters
        maxWidth="xl"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <ClassCard
          className={classObj.name}
          classId={classObj.id}
          description={classObj.description}
        />
      </Container>
    </>
  );
}
