import { useState } from "react";
import { Button, Col, Dropdown,  Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import {  FaUniversity } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { MdLocationCity, MdOutlineCastForEducation, MdSpaceDashboard } from "react-icons/md";
import Offcanvas from "react-bootstrap/Offcanvas";
import { IoPersonAddSharp } from "react-icons/io5";
import { GrDocumentStore, GrTechnology } from "react-icons/gr";
import { LiaUniversitySolid } from "react-icons/lia";
import { SiCoursera } from "react-icons/si";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { FaMountainCity } from "react-icons/fa6";
// import "../Assets/Css/Sidebar.css"
// import image from "../Assets/Images/Group 6.png";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isMastersOpen, setIsMastersOpen] = useState(false); // State for Masters dropdown

  const toggleMastersMenu = () => {
    setIsMastersOpen(!isMastersOpen); // Toggle Masters dropdown
  };

  return (
    <>
      {/* <style>
        {`
          .sidebar{
          position: fixed;
          background-color:rgb(86, 133, 141);
          // background-color:rgb(232, 233, 233);
        //   background-color:rgb(252, 214, 233);
          height: 100%;
          width: 250px;
          // z-index: 1045;
          overflow-y:auto;
          overflow-x:hidden;
          }

          .sidebar1{
          background-color:rgb(86, 133, 141);
          }

          .link{
          color: black;
          font-size: 20px;
          }

           .link:hover{
          color: #007bff; 
          // color:rgb(53, 151, 255); 
        //   background-color:rgb(250, 250, 250); 
         background-color:rgb(140, 175, 212);
        //   background-color:rgb(204, 229, 255); 
          }

        .link2{
          color: black;
           background-color:rgb(250, 250, 250);
          font-size: 20px;
          }

            .link2:hover{
          // color: #007bff; 
          color: black; 
          // color:rgb(53, 151, 255); 
          // background-color:rgb(250, 250, 250); 
         background-color:rgb(140, 175, 212);
          }
        
         .links {
           background-color: rgb(232, 233, 233);
           overflow-y:auto;
          overflow-x:hidden;
         }
        `}
      </style> */}

      <Button
        variant="dark"
        className="d-md-none"
        onClick={handleShow}
        style={{ position: "fixed", top: "8px", zIndex: "1050" }}
      >
        ☰
      </Button>
      <div className="sidebar d-none d-md-block">
        <Row>
          <Col className="">
            <br />
            <br />
            <br />
            {/* <Image src={image} style={{height:"100px"}} className=" w-100 mt-2"/> */}
            <h2 className="text-white ps-3">Administrator</h2>

            
            <Nav defaultActiveKey="/User" className="flex-column  link-unstyled">
              <Link
                to="/Head/dashboard"
                className="text-decoration-none link ps-3 py-2"
              >
                <MdSpaceDashboard size={25} className="me-2" /> Dashboard
              </Link>

              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
      {/* Masters Dropdown */}
      <li className={`nav-item ${isMastersOpen ? "menu-is-opening menu-open" : ""}`}>
        <Link
          // to="#"
          className=" d-flex text-decoration-none link ps-3 py-2"
          onClick={toggleMastersMenu} // Toggle Masters dropdown on click
        >
            <GrDocumentStore size={23} className="me-3"/>
            Masters
            <i className="fas fa-angle-left right" />
        </Link>
        <ul className="nav nav-treeview" style={{ display: isMastersOpen ? "block" : "none" }}>
         
          <li className="nav-item">
            <Link to="/Head/university" className=" d-flex text-decoration-none link ps-3 py-2">
                <FaUniversity size={23} className="me-3"/> University
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Head/college" className=" d-flex text-decoration-none link ps-3 py-2">
                <LiaUniversitySolid size={23} className="me-3"/> College
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Head/city" className=" d-flex text-decoration-none link ps-3 py-2">
                <FaMountainCity size={23} className="me-3"/> City
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Head/officecity" className=" d-flex text-decoration-none link ps-3 py-2">
              <MdLocationCity size={23} className="me-3"/> Office City
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Head/office" className=" d-flex text-decoration-none link ps-3 py-2">
              <HiMiniBuildingOffice2 size={23} className="me-3"/> Office
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Head/education" className=" d-flex text-decoration-none link ps-3 py-2">
              <MdOutlineCastForEducation size={23} className="me-3"/> Education
            </Link>
          </li>
           <li className="nav-item">
            <Link to="/Head/technology" className=" d-flex text-decoration-none link ps-3 py-2">
                <GrTechnology size={23} className="me-3"/> Technology
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Head/Courses" className=" d-flex text-decoration-none link ps-3 py-2">
              <SiCoursera size={23} className="me-3"/> Courses
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Head/GuestLecturer" className=" d-flex text-decoration-none link ps-3 py-2">
              <IoPersonAddSharp size={23} className="me-3"/>  Guest Lecturer
            </Link>
          </li>
        </ul>
      </li>
    </ul>

              <Link to="/" className="text-decoration-none link ps-3 py-2 ">
                <LuLogIn size={25} className="me-2" /> Logout
              </Link>

            </Nav>
          </Col>
        </Row>
      </div>

      <div>
        <Offcanvas
          show={show}
          onHide={handleClose}
          className="d-md-none links bg-white"
        >
          <Offcanvas.Header closeButton className="links">
            <div
              className="mt-3 mb-4"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Offcanvas.Title>
                <h4 className="px-4 py-3 text-secondary">Sumago Infotech</h4>
              </Offcanvas.Title>
            </div>
          </Offcanvas.Header>
          <Offcanvas.Body className="links">
            <div className="sidebar d-block d-md-none links">
              <br />
              <br />
              <Nav defaultActiveKey="/User" className="flex-column link-unstyled">
              <Link
                to="/Head/dashboard"
                className="text-decoration-none link ps-3 py-2"
              >
                <MdSpaceDashboard size={25} className="me-2" /> Dashboard
              </Link>

              <Link
                // to="/Head/dashboard"
                className="text-decoration-none link ps-3 py-2 d-flex"
              >
                 {/* Masters */}
              <Dropdown >
              <GrDocumentStore size={25} className="me-2" /> Masters
                <Dropdown.Toggle variant="sidebar1" id="dropdown-basic" className="border-0 btn-none  " />
                  {/* Masters */}
                {/* </Dropdown.Toggle> */}

                <Dropdown.Menu className="link2 text-dark">
                  <Dropdown.Item href="#/action-1">
                    <Link
                      to="/Head/technology"
                      className="text-decoration-none  ps-3 py-2"
                    >
                      <GrTechnology size={25} className="me-2" /> Technology
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    <Link
                      to="/Head/university"
                      className="text-decoration-none  ps-3 py-2"
                    >
                      <FaUniversity  size={25} className="me-2" /> University
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link
                      to="/Head/college"
                      className="text-decoration-none  ps-3 py-2"
                    >
                      <LiaUniversitySolid size={25} className="me-2" /> College
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item>
                    <Link
                      to="/Head/city"
                      className="text-decoration-none  ps-3 py-2"
                    >
                      <FaMountainCity  size={25} className="me-2" /> City
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item>
                    <Link
                      to="/Head/Courses"
                      className="text-decoration-none  ps-3 py-2"
                    >
                      <SiCoursera size={25} className="me-2" /> Courses
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item>
                    <Link
                      to="/Head/education"
                      className="text-decoration-none  ps-3 py-2"
                    >
                      <MdOutlineCastForEducation  size={25} className="me-2" /> Education
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item>
                    <Link
                      to="/Head/officecity"
                      className="text-decoration-none  ps-3 py-2"
                    >
                      <MdLocationCity  size={25} className="me-2" /> Office
                      City
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item>
                    <Link
                      to="/Head/office"
                      className="text-decoration-none  ps-3 py-2"
                    >
                      <HiMiniBuildingOffice2  size={25} className="me-2" /> Office
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item>
                   
                    <Link
                      to="/Head/GuestLecturer"
                      className="text-decoration-none  ps-3 py-2"
                    >
                      <IoPersonAddSharp size={25} className="me-2" /> Guest
                      Lecturer          
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </Link>

              {/* <Link
                to="/Head/technology"
                className="text-decoration-none link ps-3 py-2"
              >
                <FaAddressCard size={25} className="me-2" /> Technology
              </Link>

              <Link
                to="/Head/university"
                className="text-decoration-none link ps-3 py-2"
              >
                <FaUserTie size={25} className="me-2" /> University
              </Link>

              <Link
                to="/Head/college"
                className="text-decoration-none link ps-3 py-2"
              >
                <IoPersonAddSharp size={25} className="me-2" /> College
              </Link>

              <Link
                to="/Head/city"
                className="text-decoration-none link ps-3 py-2"
              >
                <IoPersonAddSharp size={25} className="me-2" /> City
              </Link>

              <Link
                to="/Head/Courses"
                className="text-decoration-none link ps-3 py-2"
              >
                <IoPersonAddSharp size={25} className="me-2" /> Courses
              </Link>

              <Link
                to="/Head/education"
                className="text-decoration-none link ps-3 py-2"
              >
                <IoPersonAddSharp size={25} className="me-2" /> Education
              </Link>

              <Link
                to="/Head/officecity"
                className="text-decoration-none link ps-3 py-2"
              >
                <IoPersonAddSharp size={25} className="me-2" /> Office City
              </Link>

              <Link
                to="/Head/office"
                className="text-decoration-none link ps-3 py-2"
              >
                <IoPersonAddSharp size={25} className="me-2" /> Office
              </Link>

              <Link
                to="/Head/GuestLecturer"
                className="text-decoration-none link ps-3 py-2"
              >
                <IoPersonAddSharp size={25} className="me-2" /> Guest Lecturer
                         
              </Link> */}

              <Link to="/" className="text-decoration-none link ps-3 py-2">
                <LuLogIn size={25} className="me-2" /> Logout
              </Link>
            </Nav>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
};

export default Sidebar;