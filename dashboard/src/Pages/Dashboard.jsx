import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { BsFillLaptopFill } from "react-icons/bs";
import { FaListAlt, FaUniversity } from "react-icons/fa";
import { FaDiagramProject, FaIndianRupeeSign, FaMountainCity,  FaUserGraduate, FaUserPlus, FaUserTie } from "react-icons/fa6";
import { IoBagCheckSharp } from "react-icons/io5";
import { LiaUniversitySolid } from "react-icons/lia";
import { MdFeedback, MdLibraryBooks } from "react-icons/md";
import { TbBulbFilled } from "react-icons/tb";

const Dashboard = () => {
  return (
    <>
      <Container className="mt-5 pt-3">
        <Row className="g-4">
          <Col md={3}>
            <Card className="h-100 shadow p-0 "  style={{ borderLeft: '5px solid #007bff' }}>
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <Card.Text className="text-dark fs-6 fw-bold ">
                      Pending Fees List
                    </Card.Text>
                    <Card.Title className="fs-5 fw-bold ">
                      {/* {totalUpcomingvisitsCount} */}
                      23
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                  <FaIndianRupeeSign size={50} className="text-secondary mt-4 "/>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="h-100 shadow p-0"  style={{ borderLeft: '5px solid #007bff' }}>
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <Card.Text className="text-dark fs-6 fw-bold ">
                      Enquiry Follow Up List
                    </Card.Text>
                    <Card.Title className="fs-5 fw-bold ">
                      {/* {totalUpcomingvisitsCount} */}
                      23
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                  <FaListAlt size={50} className="text-secondary mt-4 "/></Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="h-100  shadow p-0 "  style={{ borderLeft: '5px solid #007bff' }}>
              <Card.Body>
                <Row className=" ">
                  <Col md={8}>
                    <Card.Text className="text-dark fs-6 fw-bold ">
                      College List
                    </Card.Text>
                    <Card.Title className="fs-5 fw-bold">
                      {/* {totalUpcomingvisitsCount} */}
                      56
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                    <LiaUniversitySolid size={50} className="text-secondary " />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="h-100 shadow p-0"  style={{ borderLeft: '5px solid #007bff' }}>
              <Card.Body>
              <Row>
                  <Col md={8}>
                    <Card.Text className="text-dark fs-6 fw-bold ">
                    City List
                    </Card.Text>
                    <Card.Title className="fs-5 fw-bold ">
                      {/* {totalUpcomingvisitsCount} */}
                      23
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                 <FaMountainCity size={50} className="text-secondary mt-4 "/></Col>
                </Row>
                </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="h-100 shadow p-0 " style={{ borderLeft: '5px solid #007bff' }}>
              <Card.Body>
              <Row>
                  <Col md={8}>
                    <Card.Text className="text-dark fs-6 fw-bold ">
                    Education List
                    </Card.Text>
                    <Card.Title className="fs-5 fw-bold ">
                      {/* {totalUpcomingvisitsCount} */}
                      23
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                  <FaUserGraduate   size={50} className="text-secondary mt-4 "/></Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="h-100 shadow p-0 " style={{ borderLeft: '5px solid #007bff' }}>
              <Card.Body>
              <Row>
                  <Col md={8}>
                    <Card.Text className="text-dark fs-6 fw-bold ">
                    New Admission List for Trainer
                    </Card.Text>
                    <Card.Title className="fs-5 fw-bold ">
                      {/* {totalUpcomingvisitsCount} */}
                      23
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                  <FaUserPlus size={50} className="text-secondary mt-4 "/></Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="h-100 shadow p-0"  style={{ borderLeft: '5px solid #007bff' }}>
              <Card.Body>
              <Row>
                  <Col md={8}>
                    <Card.Text className="text-dark fs-6 fw-bold ">
                    Mock Exam List Trainer
                    </Card.Text>
                    <Card.Title className="fs-5 fw-bold ">
                      {/* {totalUpcomingvisitsCount} */}
                      23
                    </Card.Title>
                  </Col>
                  <Col md={4} className="text-secondary mt-4 fa-brands fa-teamspeak fs-1">
                   
                   </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="h-100 shadow p-0"  style={{ borderLeft: '5px solid #007bff' }}>
              <Card.Body>
              <Row>
                  <Col md={8}>
                    <Card.Text className="text-dark fs-6 fw-bold ">
                    Course Completion List
                    </Card.Text>
                    <Card.Title className="fs-5 fw-bold ">
                      {/* {totalUpcomingvisitsCount} */}
                      23
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                 <MdLibraryBooks size={50} className="text-secondary mt-4 "/></Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="h-100 shadow p-0"  style={{ borderLeft: '5px solid #007bff' }}>
              <Card.Body>
              <Row>
                  <Col md={8}>
                    <Card.Text className="text-dark fs-6 fw-bold ">
                    Technology List
                    </Card.Text>
                    <Card.Title className="fs-5 fw-bold ">
                      {/* {totalUpcomingvisitsCount} */}
                      23
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                  <TbBulbFilled size={50} className="text-secondary mt-4 "/></Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="h-100 shadow p-0"  style={{ borderLeft: '5px solid #007bff' }}>
              <Card.Body>
              <Row>
                  <Col md={8}>
                    <Card.Text className="text-dark fs-6 fw-bold ">
                    University List
                    </Card.Text>
                    <Card.Title className="fs-5 fw-bold ">
                      {/* {totalUpcomingvisitsCount} */}
                      23
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                  <FaUniversity  size={50} className="text-secondary mt-4 "/></Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="h-100 shadow p-0"  style={{ borderLeft: '5px solid #007bff' }}>
              <Card.Body>
              <Row>
                  <Col md={8}>
                    <Card.Text className="text-dark fs-6 fw-bold ">
                    Welcome Kit List
                    </Card.Text>
                    <Card.Title className="fs-5 fw-bold ">
                      {/* {totalUpcomingvisitsCount} */}
                      23
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                  <IoBagCheckSharp  size={50} className="text-secondary mt-4 "/></Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="h-100 shadow p-0"  style={{ borderLeft: '5px solid #007bff' }}>
              <Card.Body>
              <Row>
                  <Col md={8}>
                    <Card.Text className="text-dark fs-6 fw-bold ">
                    Project Assign to Student
                    </Card.Text>
                    <Card.Title className="fs-5 fw-bold ">
                      {/* {totalUpcomingvisitsCount} */}
                      23
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                  <FaDiagramProject  size={50} className="text-secondary mt-4 "/></Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="h-100 shadow p-0"  style={{ borderLeft: '5px solid #007bff' }}>
              <Card.Body>
              <Row>
                  <Col md={8}>
                    <Card.Text className="text-dark fs-6 fw-bold ">
                    PC / Laptop Owned List
                    </Card.Text>
                    <Card.Title className="fs-5 fw-bold ">
                      {/* {totalUpcomingvisitsCount} */}
                      23
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                  <BsFillLaptopFill  size={50} className="text-secondary mt-4 "/></Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="h-100 shadow p-0"  style={{ borderLeft: '5px solid #007bff' }}>
              <Card.Body>
              <Row>
                  <Col md={8}>
                    <Card.Text className="text-dark fs-6 fw-bold ">
                    Trainer List
                    </Card.Text>
                    <Card.Title className="fs-5 fw-bold ">
                      {/* {totalUpcomingvisitsCount} */}
                      23
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                  <FaUserTie  size={50} className="text-secondary mt-4 "/></Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="h-100 shadow p-0"  style={{ borderLeft: '5px solid #007bff' }}>
              <Card.Body>
              <Row>
                  <Col md={8}>
                    <Card.Text className="text-dark fs-6 fw-bold ">
                    Batch Allocation
                    </Card.Text>
                    <Card.Title className="fs-5 fw-bold ">
                      {/* {totalUpcomingvisitsCount} */}
                      23
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                  <i class="text-secondary mt-4 fs-1 fa-solid fa-location-dot"></i>
                  {/* <FaRupeeSign  size={50} className="text-secondary mt-4 "/> */}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="h-100 shadow p-0 " style={{ borderLeft: '5px solid #007bff' }}>
              <Card.Body>
              <Row>
                  <Col md={8}>
                    <Card.Text className="text-dark fs-6 fw-bold ">
                    FeedBack
                    </Card.Text>
                    <Card.Title className="fs-5 fw-bold ">
                      {/* {totalUpcomingvisitsCount} */}
                      23
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                  <MdFeedback  size={50} className="text-secondary mt-4 "/></Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
