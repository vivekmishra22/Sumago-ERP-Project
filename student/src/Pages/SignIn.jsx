import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap';
import { FaLock, FaUser } from 'react-icons/fa';
// import loginImage from '../Assets/Images/image.png';
import loginImage from '../Assets/Images/s3.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import './SignIn.css';

const SignIn = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { email, password };

        axios.post("http://localhost:8000/studentlogin", userData)
            .then((res) => {
                localStorage.setItem("token", res.data.token);  // Store token
                localStorage.setItem('student_email', res.data.student.email);
                // localStorage.setItem('student_name', res.data.student.student_name);
                // localStorage.setItem("userName", res.data.name); // Store name
                setEmail("");
                setPassword("");
                setError(null);
                navigate("/Head"); // Redirect to Home page after successful sign-in
            })
            .catch(() => {
                setError("Something went wrong. Please try again.");
            });
    };

    return (
        <div className="login-page vh-100">
            {/* style={{ background: 'linear-gradient(135deg, #3f51b5, #5c6bc0, #e3f2fd)', minHeight: '100vh'}} */}
            <Container fluid className="login-container">
                {/* <h2 className='d-flex justify-content-center'>Welcome to Student Dashboard</h2> */}
                <Row className="login-row d-flex align-items-center justify-content-center">
                    <Container className='content' >
                        <Row className='m-5' style={{ height: '85vh' }}>



                            <Col md={6} className='right-section m-0 p-0 h-100 d-flex align-items-center justify-content-center bg-light shadow-lg'
                            // style={{ background: 'linear-gradient(135deg, #ffffff, #e3f2fd)' }}
                            >
                                <Card className="login-card p-4 shadow-sm rounded-4 bg-secondary-subtle">
                                    {/* // p-4 shadow-sm rounded-4 w-75 */}
                                    <h4 className="mb-4 text-center m-5">STUDENT LOGIN</h4>
                                    {error && <p className="text-danger text-center">{error}</p>}
                                    <Form className='m-5' onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3">
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <FaUser />
                                                </InputGroup.Text>
                                                <Form.Control type="email" placeholder="Enter your email"
                                                    value={email}
                                                    required
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </InputGroup>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <FaLock />
                                                </InputGroup.Text>
                                                <Form.Control type="password" placeholder="Enter your password"
                                                    value={password}
                                                    required
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </InputGroup>
                                        </Form.Group>

                                        <Row className="mb-3">
                                            <Col xs={5}>
                                                {/* <Form.Check
                                                    type="checkbox"
                                                    label="Remember Me"
                                                    className="text-muted"
                                                /> */}
                                            </Col>
                                            <Col xs={7} className="text-end">
                                                <a
                                                    href="/"
                                                    style={{
                                                        textDecoration: 'none',
                                                        color: '#0d6efd',
                                                        fontSize: '0.9rem'
                                                    }}
                                                >
                                                    Forgot Password?
                                                </a>
                                            </Col>
                                        </Row>

                                        <div className="d-grid mb-4">
                                            <Button variant="primary" type="submit">
                                                LOGIN
                                            </Button>
                                        </div>
                                    </Form>
                                </Card>
                            </Col>

                            <Col md={6} className='left-section m-0 p-0 h-100 bg-light'>
                                <Card className='w-100 h-100 border-0'>
                                    <Image src={loginImage} fluid
                                        className="w-100 h-100 object-fit-cover"
                                    />
                                </Card>
                            </Col>

                        </Row>
                    </Container>
                </Row>
            </Container>
        </div>
    );
};

export default SignIn;