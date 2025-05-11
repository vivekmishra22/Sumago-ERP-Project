import React, { useState, useEffect } from 'react';
import { Container, Form, Nav, Navbar, Image, Badge, OverlayTrigger, Tooltip, Modal, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import image1 from "../Assets/Images/SUMAGO Logo.png";
import { FaCircleUser, FaHourglassHalf } from 'react-icons/fa6';
import { FaBell } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { FaUser, FaEnvelope, FaBook, FaCalendarAlt, FaClock, FaToggleOn } from 'react-icons/fa';

const Home = () => {

  const [isRinging, setIsRinging] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [studentData, setStudentData] = useState({
    email: "",
    student_name: "",
    name: "",
    date: "",
    duration: "",
    status: ""
  });

  // const [userEmail, setUserEmail] = useState("");
  // const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const rawDate = localStorage.getItem("joining_date") || "";
    let formattedDate = "";

    if (rawDate) {
      const dateObj = new Date(rawDate);
      const day = String(dateObj.getDate()).padStart(2, '0');
      const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const year = dateObj.getFullYear();
      formattedDate = `${day}/${month}/${year}`;
    }

    setStudentData({
      email: localStorage.getItem("student_email") || "",
      student_name: localStorage.getItem("student_name") || "",
      name: localStorage.getItem("course_name") || "",
      date: formattedDate,
      duration: localStorage.getItem("course_duration") || "",
      status: localStorage.getItem("student_status") || "",
    });
  }, []);


  // useEffect(() => {
  //   setStudentData({
  //     email: localStorage.getItem("student_email") || "",
  //     student_name: localStorage.getItem("student_name") || "",
  //     name: localStorage.getItem("course_name") || "",
  //     date: localStorage.getItem("joining_date") || "",
  //     duration: localStorage.getItem("course_duration") || "",
  //     status: localStorage.getItem("student_status") || "",

  //   });
  // }, []);
  // useEffect(() => {
  //   const storedEmail = localStorage.getItem("student_email");
  //   if (storedEmail) {
  //     setUserEmail(storedEmail);
  //   }
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRinging(true);
      setTimeout(() => setIsRinging(false), 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // const ringBell = () => {
  //   setIsRinging(true);
  //   setTimeout(() => setIsRinging(false), 500);
  // };

  // useEffect(() => {
  //   const interval = setInterval(ringBell, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  const renderBellTooltip = (props) => (
    <Tooltip id="bell-tooltip" {...props}>
      You have new notifications
    </Tooltip>
  );

  // const renderBellTooltip = (props) => (
  //   <Tooltip id="bell-tooltip" {...props}>
  //     You have new notifications
  //   </Tooltip>
  // );

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  // Function to trigger the bell animation
  // const ringBell = () => {
  //   setIsRinging(true);

  // Stop the animation after 0.5 seconds
  //   setTimeout(() => {
  //     setIsRinging(false);
  //   }, 500);
  // };

  // Automatically trigger the bell animation every 5 seconds
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // setNotificationCount();
  //     ringBell(); // Trigger the animation
  //   }, 5000); // 5000 milliseconds = 5 seconds

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <>
      <Navbar expand="lg" fixed="top" className="bg-body-secondary">
        {/* bg="light" */}
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
          </Navbar.Brand>
          <Image src={image1} alt="Sumago Infotech Logo" className="w-25 h-25" />
          {/* <Image src={image1} alt="Sumago Infotech Logo" fluid style={{ maxHeight: '50px' }} /> */}
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto"></Nav>

            <Form className="d-flex align-items-center">

              <OverlayTrigger placement="bottom" overlay={renderBellTooltip}>
                <Nav.Link
                  className={`bell-icon position-relative me-3 ${isRinging ? 'ring' : ''}`}
                  style={{
                    cursor: 'pointer',
                    transform: isRinging ? 'rotate(15deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease-in-out',
                  }}
                >
                  <FaBell className="fs-4 text-secondary" />
                  <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                    99+
                  </Badge>
                </Nav.Link>
              </OverlayTrigger>

              <div
                onClick={handleShow}
                role="button"
                className="d-flex align-items-center gap-2 text-primary ms-4 me-2"
                style={{ cursor: 'pointer' }}
              >
                <FaCircleUser className="fs-4" />
                <h6 className="m-0 fw-semibold">My Profile</h6>
              </div>
              {/* <Link className="text-decoration-none ps-3 py-2">
                <div
                  className={`bell-icon ${isRinging ? "ring" : ""}`}
                  style={{
                    transform: isRinging ? 'rotate(15deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease-in-out',
                  }}
                >
                  <FaBell className="me-3 fs-3 text-secondary position-relative" />
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{
                      fontSize: '0.7rem', // Smaller font size
                      padding: '0.25rem 0.4rem', // Smaller padding
                      marginLeft: "-15px"
                    }}
                  >
                    99+
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </div>
              </Link> */}

            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal for Student Profile */}
      <Modal show={showModal} onHide={handleClose} centered className="fade">
        <Modal.Header className="bg-light">
          <Modal.Title className="fw-semibold text-info text-center w-100">My Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 py-3 bg-white">
          <Row className="mb-2">
            <Col xs={5} className="d-flex align-items-center"><FaUser className="me-2 text-primary" /><strong>Name :</strong></Col>
            <Col xs={7} className="d-flex align-items-center">{studentData.student_name || "N/A"}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={5} className="d-flex align-items-center"><FaEnvelope className="me-2 text-primary" /><strong>Email :</strong></Col>
            <Col xs={7} className="d-flex align-items-center">{studentData.email || "N/A"}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={5} className="d-flex align-items-center"><FaBook className="me-2 text-primary" /><strong>Course Name :</strong></Col>
            <Col xs={7} className="d-flex align-items-center">{studentData.name || "N/A"}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={5} className="d-flex align-items-center"><FaCalendarAlt className="me-2 text-primary" /><strong>Joining Date :</strong></Col>
            <Col xs={7} className="d-flex align-items-center">{studentData.date || "N/A"}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={5} className="d-flex align-items-center"><FaHourglassHalf className="me-2 text-primary" /><strong>Duration :</strong></Col>
            <Col xs={7} className="d-flex align-items-center">{studentData.duration || "N/A"}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={5} className="d-flex align-items-center"><FaToggleOn className="me-2 text-primary" /><strong>Status :</strong></Col>
            <Col xs={7} className="d-flex align-items-center">
              <Badge bg={studentData.status === "Active" ? "success" : "secondary"}>
                {studentData.status || "N/A"}
              </Badge>
            </Col>
          </Row>
        </Modal.Body>

        {/* <Modal.Body className="px-4 py-3">
          <Row className="mb-2">
            <Col xs={5}><strong>Name :</strong></Col>
            <Col xs={7}>{studentData.student_name || "N/A"}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={5}><strong>Email :</strong></Col>
            <Col xs={7}>{studentData.email || "N/A"}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={5}><strong>Course Name :</strong></Col>
            <Col xs={7}>{studentData.name || "N/A"}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={5}><strong>Joining Date :</strong></Col>
            <Col xs={7}>{studentData.date || "N/A"}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={5}><strong>Duration :</strong></Col>
            <Col xs={7}>{studentData.duration || "N/A"}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={5}><strong>Status :</strong></Col>
            <Col xs={7}>
              <Badge bg={studentData.status === "Active" ? "success" : "secondary"}>
                {studentData.status || "N/A"}
              </Badge>
            </Col>
          </Row>
        </Modal.Body> */}
        {/* <Col xs={7}><Badge bg="info" text="dark">{studentData.name || "N/A"}</Badge></Col> */}
        {/* <p><strong>Name:</strong> {studentData.student_name || "N/A"}</p>
          <p><strong>Email:</strong> {studentData.email || "N/A"}</p>
          <p><strong>Course Name:</strong> {studentData.name || "N/A"}</p>
          <p><strong>Joining Date:</strong> {studentData.date || "N/A"}</p>
          <p><strong>Course Duration:</strong> {studentData.duration || "N/A"}</p>
          <p><strong>Status:</strong> {studentData.status || "N/A"}</p> */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (window.confirm("Are you sure you want to logout?")) {
                localStorage.clear();
                navigate("/");
              }
            }}
          >
            <BiLogOut className="me-2" />
            Logout
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default Home;

{/* <Dropdown className="mx-2 border-0" align="end">

                <Dropdown.Toggle
                  variant=""
                  id="dropdown-basic"
                  className="border-0 d-flex align-items-center gap-2 text-primary-emphasis  no-caret"
                  style={{ whiteSpace: "nowrap" }}
                >
                  <span className='d-flex align-items-center gap-2'>
                    <FaCircleUser className="fs-4" />
                    <h6>My Profile</h6>
                  </span>

                </Dropdown.Toggle>

                <Dropdown.Menu align="end">
                  <Dropdown.Header className="text-info">
                    Student Information
                  </Dropdown.Header>

                  <Dropdown.ItemText className="d-flex align-items-center">
                    <IoIosMail className="fs-5 me-2" />
                    <span>
                      <strong>Email:</strong> {studentData.email || "N/A"}
                    </span>
                  </Dropdown.ItemText>

                  <Dropdown.ItemText className="d-flex align-items-center">
                    <FaCircleUser className="fs-5 me-2" />
                    <span>
                      <strong>Student Name:</strong> {studentData.student_name || "N/A"}
                    </span>
                  </Dropdown.ItemText>

                  <Dropdown.ItemText className="d-flex align-items-center">
                    <FaCircleUser className="fs-5 me-2" />
                    <span>
                      <strong>Name:</strong> {studentData.name || "N/A"}
                    </span>
                  </Dropdown.ItemText>

                  <Dropdown.ItemText className="d-flex align-items-center">
                    <FaCalendar className="fs-5 me-2" /> 
                    <span>
                      <strong>Date:</strong> {studentData.date || "N/A"}
                    </span>
                  </Dropdown.ItemText>

                  <Dropdown.ItemText className="d-flex align-items-center">
                    <FaClock className="fs-5 me-2" /> 
                    <span>
                      <strong>Duration:</strong> {studentData.duration || "N/A"}
                    </span>
                  </Dropdown.ItemText>

                  <Dropdown.ItemText className="d-flex align-items-center">
                    <FaInfoCircle className="fs-5 me-2" /> 
                    <span>
                      <strong>Status:</strong> {studentData.status || "N/A"}
                    </span>
                  </Dropdown.ItemText> */}
{/* <Dropdown.Menu align="end">
                  <Dropdown.Item href="#/profile" className='text-info d-flex align-items-center'>

                    <span className="d-flex align-items-center me-1"><IoIosMail className="fs-3 me-1" /> Email : </span>
                    <span className="text-truncate fs-6" style={{ maxWidth: '150px' }}>
                      {userEmail ? userEmail : <span className="text-muted">Loading...</span>}
                      // {userName ? userName : <span className="text-muted">Loading...</span>}
                    </span>

                  </Dropdown.Item> */}
{/* <Dropdown.Divider />
                  <Dropdown.Item
                    as="button"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to logout?")) {
                        localStorage.removeItem("token");
                        localStorage.removeItem("student_email");
                        localStorage.removeItem("student_name");
                        localStorage.removeItem("name");
                        localStorage.removeItem("date");
                        localStorage.removeItem("duration");
                        localStorage.removeItem("status");
                        navigate("/");
                      }
                    }}
                    className='text-danger d-flex align-items-center'
                  >
                    <BiLogOut className='me-2 fs-5' />
                    <span>Logout</span>
                  </Dropdown.Item> */}
{/* <Link to="/" className="text-decoration-none ps-3 py-2 text-danger d-flex align-items-center"
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("student_email");
                    }}
                    // localStorage.removeItem("student_name");

                  >
                    <BiLogOut className='me-2 fs-5' />
                    <span>Logout</span>
                  </Link> */}
{/* </Dropdown.Menu>
              </Dropdown> */}