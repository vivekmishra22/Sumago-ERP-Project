import React, { useState, useEffect } from 'react';
import { Container, Form, Nav, Navbar, Image, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import image1 from "../Assets/Images/SUMAGO Logo (1).png";
import { FaCircleUser } from 'react-icons/fa6';
import { FaBell } from 'react-icons/fa';
// import "./BellAnimation.css"; // Import CSS for animations

const Home = () => {
  const [isRinging, setIsRinging] = useState(false);

  // Function to trigger the bell animation
  const ringBell = () => {
    setIsRinging(true);

    // Stop the animation after 1 second
    setTimeout(() => {
      setIsRinging(false);
    }, 500);
  };

  // Automatically trigger the bell animation every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      ringBell(); // Trigger the animation
    }, 5000); // 5000 milliseconds = 5 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar expand="lg" fixed="top" className="bg-body-secondary">
        <Container fluid>
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
                <div className={`bell-icon ${isRinging ? "ring" : ""}`}>  
                  <FaBell className="me-3 fs-4 text-secondary position-relative" />  
                </div>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  99+
                </span>
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

// import React, {  useState } from 'react'
// import {  Container, Form, Nav, Navbar, Image, Dropdown } from 'react-bootstrap';
// // import { TbBellRingingFilled } from 'react-icons/tb';
// // import BellIcon from "./BellIcon";
// import { Link } from 'react-router-dom';
// import image1 from "../Assets/Images/SUMAGO Logo.png";
// import { FaCircleUser } from 'react-icons/fa6';
// import { FaBell } from 'react-icons/fa';

// // style={{ backgroundColor:"rgb(12, 36, 100)"}}

// const Home = () => {

//   const [isRinging, setIsRinging] = useState(false);

//   // Function to trigger the bell animation
//   const ringBell = () => {
//     setIsRinging(true);

//     // Stop the animation after 1 second
//     setTimeout(() => {
//       setIsRinging(false);
//     }, 1000);
//   };
//   return (
//     <>
//       <Navbar expand="lg"  fixed='top' 
//       className="bg-body-secondary"
//       // style={{ backgroundColor:"rgb(14, 43, 122)"}}
//       // style={{ background: "linear-gradient(90deg, #007BFF,rgb(89, 16, 206))" }}
//       // style={{ backgroundColor:"rgb(105, 105, 105)"}}
//       >
//       <Container fluid>
//         {/* <Navbar.Brand href="#" className='text-white fw-bold fs-2 ps-5 ' >Products</Navbar.Brand> */}
//         <Image src={image1}  className=" w-25 h-25"/>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav
//             className="me-auto my-2 my-lg-0"
//             style={{ maxHeight: '100px' }}
//             navbarScroll
//           >
//             {/* <Nav.Link href="#action1">Home</Nav.Link>
//             <Nav.Link href="#action2">Link</Nav.Link>
//              */}
//           </Nav>
//           <Form className="d-flex">
//           <Link  className="text-decoration-none ps-3 py-2">
//           <div className={`bell-icon ${isRinging ? "ring" : ""}`} onClick={ringBell}>
//         <FaBell size={29} className="me-3 text-secondary  position-relative" />
//       </div>
//           {/* <BellIcon size={29} className="me-3 text-secondary  position-relative"/> */}
//           <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//     99+
//     <span class="visually-hidden">unread messages</span>
//   </span>
//           </Link>
//           <Dropdown className='me-4 border border-0'>
//                 <Dropdown.Toggle variant="" id="dropdown-basic" className='border border-0 no-caret'>
//                   <span d-flex align-items-center>
//                     <FaCircleUser className='fs-4 text-secondary' />
//                     {/* <span className=''>Profile</span> */}
//                   </span>
//                 </Dropdown.Toggle>

//                 <Dropdown.Menu align="end">
//                   <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
//                   <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
//                   <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
//                   {/* <hr /> */}
//                     <Link to='/' className="text-decoration-none ps-3 py-2">
//                       Logout
//                       {/* <Button className="w-100 mt-3"  >Submit</Button> */}
//                     </Link>
//                   {/* <Dropdown.Item href="#/action-4">
//                   </Dropdown.Item> */}
//                 </Dropdown.Menu>
//               </Dropdown>
//           </Form>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
    
//     </>
//   )
// }

// export default Home;

