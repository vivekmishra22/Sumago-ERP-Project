import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card, CardBody } from "react-bootstrap";
import { FaLock, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };

    axios.post("http://localhost:8000/adminLogin", userData)
      .then((res) => {
        localStorage.setItem("token", res.data.token);  // Store token
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
    <div className="signup-container">
      <Container fluid>
        <Row className="justify-content-start align-items-center min-vh-100">
          <Col md={8} lg={6}>
            <Card className="custom-card shadow border-0 bg-transparent h-100 text-white fs-5 w-75">
              <CardBody>
                <h2 className="text-center mb-4 text-white">SIGN IN</h2>
                {error && <p className="text-danger text-center">{error}</p>}
                <Form onSubmit={handleSubmit}>
                  <Row className="mt-3">
                    <Col md={12}>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <div className="input-group">
                          <Form.Control
                            className="bg-transparent text-white rounded-5 fs-5"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <span className="input-group-text bg-transparent border-0">
                            <FaEnvelope className="bg-transparent fs-1" />
                          </span>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col md={12}>
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <div className="input-group">
                          <Form.Control
                            className="bg-transparent text-white rounded-5 fs-5"
                            type="password"
                            placeholder="Enter your Password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <span className="input-group-text bg-transparent border-0">
                            <FaLock className="bg-transparent fs-1" />
                          </span>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    <Col md={12} className="text-center">
                      <Button
                        className="w-50 bg-transparent text-white border-1 rounded-5 fs-5"
                        variant="success"
                        type="submit"
                      >
                        Sign In
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signin;
