import React from 'react';
import { Button, Card, Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap';
import { FaLock, FaUser } from 'react-icons/fa';
import loginImage from '../Assets/Images/image.png';
// import './SignIn.css';

const SignIn = () => {
    return (
        <div className="login-page vh-100 bg-primary" style={{ background: 'linear-gradient(135deg, #3f51b5, #5c6bc0, #e3f2fd))'}}>
            {/* style={{ background: 'linear-gradient(135deg, #3f51b5, #5c6bc0, #e3f2fd)'}} */}
            <Container fluid className="login-container">
                <Row className="login-row d-flex align-items-center justify-content-center">
                    <Container className='content' >
                        <Row className='m-5' style={{ height: '85vh' }}>
                            <Col md={6} className='left-section m-0 p-0 h-100 bg-light'>
                                <Image src={loginImage} fluid
                                    className="w-100 h-100 object-fit-cover"
                                />
                            </Col>
                            <Col md={6} className='right-section m-0 p-0 h-100 d-flex align-items-center justify-content-center bg-light' 
                            // style={{ background: 'linear-gradient(135deg, #ffffff, #e3f2fd)' }}
                            >
                                <Card className="login-card p-4 shadow-sm rounded-4">   
                                    {/* // p-4 shadow-sm rounded-4 w-75 */}
                                    <h4 className="mb-4 text-center m-5">STUDENT LOGIN</h4>
                                    <Form className='m-5'>
                                        <Form.Group className="mb-3">
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <FaUser />
                                                </InputGroup.Text>
                                                <Form.Control type="text" placeholder="Username" />
                                            </InputGroup>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <FaLock />
                                                </InputGroup.Text>
                                                <Form.Control type="password" placeholder="Password" />
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
                                            <Button variant="primary" type="submit" href='/Head'>
                                                LOGIN
                                            </Button>
                                        </div>
                                    </Form>
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