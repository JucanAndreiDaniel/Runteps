import React from "react";
import { Navigate } from "react-router-dom";


import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { makeStyles } from "@mui/styles";

import useResetPassword from "../hooks/useResetPass";
import { UserContext } from "../hooks/UserContext";
import Header from "../sections/Header";
import useForm from "../hooks/useForm";

const useStyles = makeStyles(theme => ({
}));

function ResetModal(props) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const { open, setOpen } = props;


    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Instructions for resetting your password have been sent to your email.
                </Typography>
            </Box>
        </Modal>
    );
}


export default function ResetPassword() {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const { passwordReset } = useResetPassword();
    const { user } = React.useContext(UserContext);

    const {values, handleChange} = useForm({
        initialValues: {
            email: "",
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await passwordReset(values.email);
        setOpen(true);
    }

    if (!user) {
        return (
            <>
                <ResetModal open={open} setOpen={setOpen} />
                <Header />
                <Container maxWidth="sm">
                    <CssBaseline />
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h4" gutterBottom>
                                        Reset Password
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Enter your email address and we'll send you a link to reset your password.
                                    </Typography>
                                    <Grid container spacing={3} direction="column">
                                        <Grid item>
                                            <TextField
                                                id="email"
                                                label="Email"
                                                type="email"
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                onClick={handleSubmit}
                                                className={classes.submit}
                                            >
                                                Send
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </>

        );
    } else {
        return <Navigate to="/home" />;
    }
}