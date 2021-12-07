import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import useForm from './../hooks/useForm';
import useAuth from './../hooks/useAuth';
import Error from './../components/Error';
import { UserContext } from './../hooks/UserContext';
import { Col, Row, Container, Form, Button, Image } from 'react-bootstrap';
import loginImage from "../static/loginImage.png"



export default function Login() {

    const { user } = useContext(UserContext);

    const { values, handleChange } = useForm({
        initialValues: {
            username: '',
            password: ''
        }
    });

    const { loginUser, error } = useAuth();

    const handleLogin = async (e) => {
        // console.log(e);
        // console.log(values);
        e.preventDefault();
        await loginUser(values);
    }
    if (!user) {
        return (
            <Container fluid>
                <Row>
                    <Col className="d-flex align-items-center justify-content-center vh-100">
                        <Form onSubmit={handleLogin}>
                            {/* form text Login back to your account */}
                            <Form.Text className="text-muted">
                                Login to your account
                            </Form.Text>

                            <div className="inlineForm__notif">
                                {error && <Error error={error.messages} />}
                            </div>

                            {/* form input username */}
                            <Form.Group controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" value={values.username} onChange={handleChange} name="username" />
                            </Form.Group>

                            {/* form input password */}
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter password" value={values.password} onChange={handleChange} name="password" />
                            </Form.Group>

                            <Row className="align-items-center justify-content-between">
                                <Col xl="auto" className="my-1">
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Remember me" />
                                    </Form.Group>
                                </Col>
                                <Col xl="auto" className="my-1">
                                    <Link to="/forgot-password">Forgot password?</Link>
                                </Col>
                            </Row>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
    else {
        return <Redirect to='/home' />
    }
}