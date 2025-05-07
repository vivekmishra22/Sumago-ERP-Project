import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { FaArrowRightLong, FaComputer } from "react-icons/fa6";
import { HiMiniDocumentCheck } from "react-icons/hi2";
import { PiStudentFill } from "react-icons/pi";
import { RiIdCardFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [user_name, setUserCount] = useState(0);
  const [projectTitle, setProjectCount] = useState(0);

  useEffect(() => {
    // Fetch Feedback Count
    axios.get("http://localhost:8000/getFeedback")
      .then((res) => {
        const Feedbackcount = res.data.data.filter((item) => item.user_name); // Add your filter logic here
        setUserCount(Feedbackcount.length);
        console.log("Feedback records fetched:", Feedbackcount.length);
      })
      .catch((err) => {
        console.error("Error fetching feedback data:", err);
      });

    // Fetch Project Count
    axios.get("http://localhost:8000/getProject")
      .then((res) => {
        const Projectcount = res.data.data.filter((item) => item.projectTitle); // Add your filter logic here
        setProjectCount(Projectcount.length);
        console.log("Project records fetched:", Projectcount.length);
      })
      .catch((err) => {
        console.error("Error fetching project data:", err);
      });
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <>
      <Container className="mt-5 pt-3">
        <Row className="g-4">
          {/* Card 1: Feedback */}
          <Col md={6} lg={3} xs={12}>
            <Link to="/Head/studentlogin" className="text-decoration-none">
              <Card className="h-100 shadow p-0" style={{ borderLeft: "5px solid rgb(61, 152, 250)" }}>
                <Card.Body>
                  <Row>
                    <Col md={8}>
                      <Card.Title className="fs-5 fw-bold">{user_name}</Card.Title>
                    </Col>
                    <Col md={4}>
                      <PiStudentFill className="fs-1 ms-0 p-0 me-3 dashboarde-color" />
                    </Col>
                    <Card.Text style={{ color: "rgb(61, 152, 250)" }} className="fs-6 fw-bold d-flex gap-2">
                      Admitted Student List <FaArrowRightLong className="my-1" />
                    </Card.Text>
                  </Row>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          {/* Card 2: Project */}
          <Col md={6} lg={3} xs={12}>
            <Link to="/Head/studentlogin" className="text-decoration-none">
              <Card className="h-100 shadow p-0" style={{ borderLeft: "5px solid rgb(32, 190, 79)" }}>
                <Card.Body>
                  <Row>
                    <Col md={8}>
                      <Card.Title className="fs-5 fw-bold">{projectTitle}</Card.Title>
                    </Col>
                    <Col md={4}>
                      <FaComputer className="fs-1 ms-0 p-0 me-3 dashboarde-color" />
                    </Col>
                    <Card.Text style={{ color: "rgb(32, 190, 79)" }} className="fs-6 fw-bold d-flex gap-2">
                      Pc / Laptop Ownned List <FaArrowRightLong className="my-1" />
                    </Card.Text>
                  </Row>
                </Card.Body>
              </Card>
            </Link>
          </Col>


          {/* Card 3: Project */}
          <Col md={6} lg={3} xs={12}>
            <Link to="/Head/studentlogin" className="text-decoration-none">
              <Card className="h-100 shadow p-0" style={{ borderLeft: "5px solid rgb(6, 194, 178)" }}>
                <Card.Body>
                  <Row>
                    <Col md={8}>
                      <Card.Title className="fs-5 fw-bold">{projectTitle}</Card.Title>
                    </Col>
                    <Col md={4}>
                      <RiIdCardFill className="fs-1 ms-0 p-0 me-3 dashboarde-color" />
                    </Col>
                    <Card.Text style={{ color: "rgb(6, 194, 178)" }} className="fs-6 fw-bold d-flex gap-2">
                      New Admitted ID Card List <FaArrowRightLong className="my-1" />
                    </Card.Text>
                  </Row>
                </Card.Body>
              </Card>
            </Link>
          </Col>


          {/* Card 4: Project */}
          <Col md={6} lg={3} xs={12}>
            <Link to="/Head/studentlogin" className="text-decoration-none">
              <Card className="h-100 shadow p-0" style={{ borderLeft: "5px solid rgb(206, 187, 20)" }}>
                <Card.Body>
                  <Row>
                    <Col md={8}>
                      <Card.Title className="fs-5 fw-bold">{projectTitle}</Card.Title>
                    </Col>
                    <Col md={4}>
                      <HiMiniDocumentCheck className="fs-1 ms-0 p-0 me-3 dashboarde-color" />
                    </Col>
                    <Card.Text style={{ color: "rgb(206, 187, 20)" }} className="fs-6 fw-bold d-flex gap-2">
                      Document Approved List <FaArrowRightLong className="my-1" />
                    </Card.Text>
                  </Row>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;