import React from 'react';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import CssBaseline from "@mui/material/CssBaseline";
import LinearProgress from '@mui/material/LinearProgress';
import GlobalStyles from "@mui/material/GlobalStyles";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Header from '../sections/Header';
import { getClasses } from '../hooks/useClasses';
import { styled } from '@mui/material/styles';


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

                    <Box sx={{ width: '100%' }}>
                        <Typography variant="body2" component="p">
                            {progress}%
                        </Typography>
                        <LinearProgress variant="determinate" value={progress} />
                    </Box>
                </Stack>
            </CardContent>
            <CardActions>
                <Button size="small">Begin Course</Button>
            </CardActions>
        </Card>
    );
}

export default function Class(props) {

    const [classes, setClasses] = React.useState([]);
    React.useEffect(() => {
        getClasses().then(res => {
            setClasses(res.data);
        });
    }, []);

    return (<>
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
            <Grid container spacing={3}>
                {
                    classes.map(classObj => {
                        return <Grid item>
                            <ClassCard className={classObj.name} classId={classObj.id} description={classObj.description} />
                        </Grid>
                    })
                }
            </Grid>
        </Container>
    </>);
}