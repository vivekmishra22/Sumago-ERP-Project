import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card, CardBody } from "react-bootstrap";
import { FaLock, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const navigate = useNavigate();
  const [showSignIn, setShowSignIn] = useState(true); // Toggle state
  const [fname, setName] = useState("");
  const [lname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [selectvalues, setAllChecked] = useState(false);
  //   const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!showSignIn && password !== cpassword) {
      setError("Passwords do not match!");
      return;
    }

    const userData = {
     
      email,
      password
    }
    if (!showSignIn) {
      // userData.fname = fname;
      // userData.lname = lname;
      userData.email = email;
      userData.password = password;
      // userData.cpassword = cpassword;
      userData.selectvalues = selectvalues;
      //   userData.append("image", image);
    }

    axios.post(`http://localhost:8000/${showSignIn ? "login" : "add"}`, userData)
      .then((res) => {
        localStorage.setItem("token", res.data.token);  // Store token
        console.log(res.data);
        alert(showSignIn ? "Signed in successfully" : "Signed up successfully");

        // setName("");
        // setLastname("");
        setEmail("");
        setPassword("");
        // setCpassword("");
        setAllChecked(false);
        // setImage(null);
        setError(null);

        if (showSignIn) {
          navigate("/Head"); // Redirect to Home page after successful sign-in
        }

      })
      .catch((error) => {
        console.log(error);
        setError("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="signup-container ">
      <Container fluid className="">
        <Row className="justify-content-start align-items-center min-vh-100">
          <Col md={8} lg={6}>
            <Card className="custom-card shadow border-0 bg-transparent h-100 text-white fs-5 w-75">
              <CardBody>
                <h2 className="text-center mb-4 text-white">{showSignIn ? "SIGN IN" : "SIGN UP"}</h2>

                {error && <p className="text-danger text-center">{error}</p>}

                <Form onSubmit={handleSubmit}>
                  {/* Name Fields for Sign Up */}
                  {!showSignIn && (
                    <Row >
                      <Col md={6}>
                        <Form.Group controlId="formGridFirstName">
                          <Form.Label className="text-center">First Name</Form.Label>
                          <Form.Control className="bg-transparent rounded-5 text-white fs-5"
                            type="text"
                            placeholder="Enter First Name"
                            value={fname}
                            required
                            onChange={(e) => setName(e.target.value)}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group controlId="formGridLastName">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control className="bg-transparent rounded-5 text-whitefs-5"
                            type="text"
                            placeholder="Enter Last Name"
                            value={lname}
                            required
                            onChange={(e) => setLastname(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  )}

                  {/* Email Field */}
                  <Row className="mt-3">
                    <Col md={12}>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <div className="input-group">
                          <Form.Control className="bg-transparent text-white rounded-5 fs-5"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}

                          /><span className="input-group-text bg-transparent border-0">
                            <FaEnvelope className="bg-transparent fs-1" />
                          </span>

                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Password Fields */}
                  <Row className="mt-3">
                    <Col md={12}>
                      <Form.Group controlId="formBasicPassword" >
                        <Form.Label>Password</Form.Label>
                        <div className="input-group">
                          <Form.Control className="bg-transparent text-white rounded-5 fs-5"
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

                  {/* Confirm Password for Sign Up */}
                  {!showSignIn && (
                    <Row className="mt-3">
                      <Col md={12}>
                        <Form.Group controlId="formConfirmPassword">
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control className="bg-transparent text-white rounded-5 fs-5"
                            type="password"
                            placeholder="Confirm Password"
                            value={cpassword}
                            required
                            onChange={(e) => setCpassword(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  )}

                  {/* Image Upload for Sign Up
                  {!showSignIn && (
                    <Row className="mt-3">
                      <Col md={12}>
                        <Form.Group controlId="formFile">
                          <Form.Label>Upload Profile Picture</Form.Label>
                          <Form.Control className="bg-transparent rounded-5 fs-5"
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  )} */}

                  {/* Remember Me Checkbox */}
                  {!showSignIn && (
                    <Row className="mt-3">
                      <Col md={12}>
                        <Form.Group controlId="formBasicCheckbox">
                          <Form.Check className="bg-transparent rounded-5 fs-5"
                            type="checkbox"
                            name="selectvalues"
                            label="Remember Me"
                            onChange={(e) => setAllChecked(e.target.checked)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  )}

                  {/* Submit Button */}
                  <Row className="mt-4">
                    <Col md={12} className="text-center">
                      <Button className="w-50 bg-transparent text-white border-1 rounded-5 fs-5"
                        variant="success"
                        type="submit"
                      >
                        {showSignIn ? "Sign In" : "Sign Up"}
                      </Button>
                    </Col>
                   
                  </Row>
                  <Row className="mt-3">
                  <Col md={12} className="text-center align-items-center">
                    <Button className="w-75 bg-transparent text-white border-1 rounded-5 fs-5"
                      onClick={() =>navigate(`/Changepassword`) }
                    >
                    Change Password
                    </Button>
                  </Col>
                </Row> 
                </Form>

                {/* Toggle Between Sign In & Sign Up */}
                {/* <Row className="mt-3">
                  <Col md={12} className="text-center align-items-center">
                    <Button className="w-75 bg-transparent text-white border-1 rounded-5 fs-5"
                      onClick={() => setShowSignIn(!showSignIn)}
                    >
                      {showSignIn ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                    </Button>
                  </Col>
                </Row> */}

              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AuthForm;
