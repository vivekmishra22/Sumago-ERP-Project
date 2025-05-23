import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { BiSolidReceipt } from "react-icons/bi";
import { FaFolderOpen, FaUniversity } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
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
            <Link to="/Head/feedback" className="text-decoration-none">
              <Card className="h-100 shadow p-0" style={{ borderLeft: "5px solid rgb(61, 152, 250)" }}>
                <Card.Body>
                  <Row>
                    <Col md={8}>
                      <Card.Title className="fs-5 fw-bold">{user_name}</Card.Title>
                    </Col>
                    <Col md={4}>
                      <BiSolidReceipt className="fs-1 ms-0 p-0 me-3 dashboarde-color" />
                    </Col>
                    <Card.Text style={{ color: "rgb(61, 152, 250)" }} className="fs-6 fw-bold d-flex gap-2">
                      Fee Receipt <FaArrowRightLong className="my-1" />
                    </Card.Text>
                  </Row>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          {/* Card 2: Project */}
          <Col md={6} lg={3} xs={12}>
            <Link to="/Head/project" className="text-decoration-none">
              <Card className="h-100 shadow p-0" style={{ borderLeft: "5px solid rgb(32, 190, 79)" }}>
                <Card.Body>
                  <Row>
                    <Col md={8}>
                      <Card.Title className="fs-5 fw-bold">{projectTitle}</Card.Title>
                    </Col>
                    <Col md={4}>
                      <FaFolderOpen className="fs-1 ms-0 p-0 me-3 dashboarde-color" />
                    </Col>
                    <Card.Text style={{ color: "rgb(32, 190, 79)" }} className="fs-6 fw-bold d-flex gap-2">
                      Project Allocation <FaArrowRightLong className="my-1" />
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