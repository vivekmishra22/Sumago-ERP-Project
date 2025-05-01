import React, { useState, useEffect } from 'react';
import { Container, Form, Nav, Navbar, Image, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import image1 from "../Assets/Images/SUMAGO Logo.png";
import { FaCircleUser } from 'react-icons/fa6';
import { FaBell } from 'react-icons/fa';

const Home = () => {
  const [isRinging, setIsRinging] = useState(false);
  // const [notificationCount, setNotificationCount] = useState(99);

  // Function to trigger the bell animation
  const ringBell = () => {
    setIsRinging(true);

    // Stop the animation after 0.5 seconds
    setTimeout(() => {
      setIsRinging(false);
    }, 500);
  };

  // Automatically trigger the bell animation every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // setNotificationCount();
      ringBell(); // Trigger the animation
    }, 5000); // 5000 milliseconds = 5 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar expand="lg" fixed="top" className="bg-body-secondary">
        <Container fluid>

          {/* <h2>Administrator</h2> */}
          
          {/* <div className="d-flex justify-content-center align-items-center w-100">
            <Image src={image1} className="w-25 h-auto" />
          </div> */}

          <Image src={image1} className="w-25 h-25" />
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              {/* Add your Nav.Link items here if needed */}
            </Nav>
            <Form className="d-flex">
              <Link className="text-decoration-none ps-3 py-2">
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
                    {/* {notificationCount > 99 ? "99+" : notificationCount} */}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </div>
              </Link>
              <Dropdown className="me-4 border border-0">
                <Dropdown.Toggle variant="" id="dropdown-basic" className="border border-0 no-caret">
                  <span>
                    <FaCircleUser className="fs-4 text-secondary" />
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu align="end">
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  <Link to="/" className="text-decoration-none ps-3 py-2">
                    Logout
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Home;