import React from 'react'
import { Container, Form, Nav, Navbar, Image, Dropdown } from 'react-bootstrap';
// import { AiOutlineLogout } from 'react-icons/ai';
import { TbBellRingingFilled } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import image1 from "../Assets/Images/SUMAGO Logo (1).png";
import { FaCircleUser } from "react-icons/fa6";
// import "../App.css";

// style={{ backgroundColor:"rgb(12, 36, 100)"}}

const Home = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-primary" fixed='top' 
      // style={{ backgroundColor: "rgb(77, 88, 117)" }}
      >
        <Container fluid>
          {/* <Navbar.Brand href="#" className='text-white fw-bold fs-2 ps-5 ' >Products</Navbar.Brand> */}
          <Image src={image1} className=" w-25 h-25" />
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              {/* <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
             */}
            </Nav>
            <Form className="d-flex">
              <Link className="text-decoration-none ps-3 py-2">
                <TbBellRingingFilled size={29} className="me-3 text-white" />
              </Link>

              <Dropdown className='me-4'>
                <Dropdown.Toggle variant="" id="dropdown-basic" className='border border-0 no-caret'>
                  <span d-flex align-items-center>
                    <FaCircleUser className='fs-4 text-light' />
                    {/* <span className=''>Profile</span> */}
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu align="end">
                  <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  {/* <hr /> */}
                    <Link to='/' className="text-decoration-none ps-3 py-2">
                      Logout
                      {/* <Button className="w-100 mt-3"  >Submit</Button> */}
                    </Link>
                  {/* <Dropdown.Item href="#/action-4">
                  </Dropdown.Item> */}
                </Dropdown.Menu>
              </Dropdown>

              {/* <Link to='/' className="text-decoration-none ps-3 py-2">
          <AiOutlineLogout  size={29} className="me-5 text-white"/> 
              </Link> */}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Home;
