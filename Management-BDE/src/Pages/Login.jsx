import axios from 'axios';
import React, {  useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Change_Password from './Change_Password';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false); // State to toggle between login and forgot password

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = { email, password };

    axios
      .post('http://localhost:8000/loginbde', userData ,{
        headers: {
          Authorization:` Bearer ${localStorage.getItem('token')}`
      }
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);  // Store token
        console.log('Login successful', res.data);
        // alert('Login successful!');
        navigate('/Head'); // Redirect to home page after login
      })
      .catch(() => {
        // console.error('Login error:', error);
        setError(" Please Enter Correct password");
        // alert('Invalid email or password!');
      });
  };

  const handleChangePassword = () => {
    setShowChangePassword(true); // Show the Change password form
  };

  const handleBackToLogin = () => {
    setShowChangePassword(false); // Go back to the login form
  };

  return (
    <>
      <Container fluid className="erp">
        <Container className="d-flex justify-content-center">
          {showChangePassword ? (
            <Change_Password 
            onBackToLogin={handleBackToLogin}
             />
          ) : (
            <Col md={6} sm={12} lg={6} xl={6} xxl={6} className="mt-5 pt-3">
              <h1 className="text-center text-white">LOGIN</h1>
              
              <Card className="login4 py-5 rounded-4 border-0">
                <Card.Body>
                  <Form onSubmit={handleLogin}>
                    <Col md={12} className="my-3 text-white">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        className="rounded-pill login2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Col>

                    {error && <p className="text-danger text-center">{error}</p>}
                    <Col md={12} className="my-3  text-white">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        className="rounded-pill login3"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Col>

                    <Row>
                      <Col md={6} className="d-flex">
                        <Form.Check className="ps-3" 
                        // name="rememberMe" 
                        />
                        <Form.Label className="ps-3  text-white">Remember me</Form.Label>
                      </Col>
                      <Col md={6}>
                        <Nav.Link className="px-2 text-primary" 
                        onClick={handleChangePassword}
                        >
                          Change Password?
                        </Nav.Link>
                      </Col>
                    </Row>

                    <Col md={12} className="d-flex justify-content-center">
                      <Button type="submit" className="mt-4 w-50 rounded-pill btn btn-primary login2"
                      >
                        Submit
                      </Button>
                    </Col>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
           )} 
        </Container>
      </Container>
    </>
  );
};

export default Login;
