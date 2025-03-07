import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, CardBody } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateCourse = () => {
    const navigate = useNavigate();
    const { _id } = useParams();
    console.log(_id);
    const [course_name, setCourse_Name] = useState("");
    const [course_description, setCourse_Description] = useState("");
    const [course_duration, setCourse_Duration] = useState("");
    const [course_fees, setCourse_Fees] = useState("");
    const [status, setStatus] = useState("active"); // Default status




    //  Fetch user data
    useEffect(() => {
        axios.get(`http://localhost:8000/getbyIdCourse/${_id}`)
            .then(res => {
                console.log("Fetched Data:", res.data);
                const data = res.data.data;

                // Populate state with fetched data
                setCourse_Name(data.course_name || "");
                setCourse_Description(data.course_description || "");
                setCourse_Duration(data.course_duration || "");
                setCourse_Fees(data.course_fees || "");


            })
            .catch(error => {
                console.log(error);
            });

    }, [_id]); // Dependency array ensures this runs only when _id changes


    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            course_name,
            course_description,
            course_duration,
            course_fees,
            status

        };

        axios.put(`http://localhost:8000/UpdateCourse/${_id}`, userData)
            // {
            //     headers: {
            //         Authorization: Bearer ${localStorage.getItem('token')} // Add Authorization header
            //     }
            // }

            .then((res) => {

                console.log(res.data);
                alert("Data updated successfully");
                navigate("/Head");


            })
            .catch((error) => {
                console.error("Error updating :", error);
            });
    };

    console.log("Rendering UpdateCourse");
    return (
        <Container>
            <Row className="d-flex justify-content-center align-items-center view-container">
                <Col md={8}>
                    <Card className="my-4 shadow">
                        <CardBody>
                            <Form onSubmit={handleSubmit}>
                                <h1>Update Course</h1>
                                <Row>
                                    <Col md={12}>
                                        <Form.Label>Course Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter course Name"
                                            value={course_name}
                                            onChange={(e) => setCourse_Name(e.target.value)}
                                            required
                                        />
                                    </Col>
                                    <Col md={12}>
                                        <Form.Label>Course Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Enter course description"
                                            value={course_description}
                                            onChange={(e) => setCourse_Description(e.target.value)}
                                            required
                                        />
                                    </Col>
                                    <Col md={12}>
                                        <Form.Label>Course Duration</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter course duration"
                                            value={course_duration}
                                            onChange={(e) => setCourse_Duration(e.target.value)}
                                            required
                                        />
                                    </Col>
                                    <Col md={12}>
                                        <Form.Label>Course Fees</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter course fees"
                                            value={course_fees}
                                            onChange={(e) => setCourse_Fees(e.target.value)}
                                            required
                                        />
                                    </Col>
                                    <Col md={12} className="d-flex mt-3">
                                        <Form.Label>Status</Form.Label>
                                        <Form.Check
                                            type="radio"
                                            label="Active"
                                            name="status"
                                            value="active"
                                            className="ps-5"
                                            checked={status === "active"}
                                            onChange={(e) => setStatus(e.target.value)}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Inactive"
                                            name="status"
                                            value="inactive"
                                            className="ps-5"
                                            checked={status === "inactive"}
                                            onChange={(e) => setStatus(e.target.value)}
                                        />
                                    </Col></Row>

                                <Button className="align-items-center align-center w-25  border-2 rounded-5 fs-4 mt-4" variant="success" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UpdateCourse;