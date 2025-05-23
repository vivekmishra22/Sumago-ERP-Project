import { useState } from "react";
import { Button, Col, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUniversity, FaUserGraduate } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import {
  // MdCalendarMonth,
  MdLibraryBooks,
  MdLocationCity,
  // MdRealEstateAgent,
  MdSpaceDashboard,
} from "react-icons/md";
import Offcanvas from "react-bootstrap/Offcanvas";
import { IoBagCheckSharp } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { LiaUniversitySolid } from "react-icons/lia";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { FaEarthAmericas, FaMountainCity, FaUserGroup } from "react-icons/fa6";
import { TbBulbFilled } from "react-icons/tb";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { GiTeacher } from "react-icons/gi";

const Sidebar = () => {
  const [show, setShow] = useState(false); // State for Offcanvas
  const [isMastersOpen, setIsMastersOpen] = useState(false); // State for Masters dropdown
  const [isMastersfOpen, setIsMastersFOpen] = useState(false); // State for Masters dropdown

  const handleClose = () => setShow(false); // Close Offcanvas
  const handleShow = () => setShow(true); // Open Offcanvas

  const toggleMastersFMenu = () => {
    setIsMastersFOpen(!isMastersfOpen); // Toggle Masters dropdown
  };

  const toggleMastersMenu = () => {
    setIsMastersOpen(!isMastersOpen); // Toggle Masters dropdown
  };

  return (
    <>
      {/* Toggle Button for Offcanvas (Mobile View) */}
      <Button
        variant="dark"
        className="d-md-none"
        onClick={handleShow}
        style={{ position: "fixed", top: "8px", zIndex: "1050" }}
      >
        ☰
      </Button>

      {/* Sidebar (Desktop View) */}
      <div className="sidebar d-none d-md-block">
        <Row>
          <Col>
            <div>
              <br />
              <br />
              <br />
              <h2 className="text-white ps-3">Administrator</h2>
            </div>

            <div className="sidebar3 ">
              <Nav
                defaultActiveKey="/User"
                className=" flex-column link-unstyled"
              >
                {/* Dashboard Link */}
                <Link
                  to="/Head/"
                  className="text-decoration-none link ps-3 py-2"
                >
                  <MdSpaceDashboard size={25} className="me-2" /> Dashboard
                </Link>

                {/* sidebar-                                               User Dropdown */}
                <div className="nav-item">
                  <div
                    className="d-flex text-decoration-none link ps-3 py-2"
                    onClick={toggleMastersFMenu} // Toggle dropdown on click
                    style={{ cursor: "pointer" }}
                  >
                    <GrDocumentStore size={23} className="me-3" />
                    Users
                    <i
                      className={`fas ${
                        isMastersfOpen ? "fa-angle-up" : "fa-angle-down"
                      } right ms-5`}
                      style={{ transition: "transform 0.2s ease" }} // Smooth transition
                    />
                  </div>
                  {/* Dropdown Menu */}

                  <div
                    className="nav nav-treeview"
                    style={{ display: isMastersfOpen ? "block" : "none" }}
                  >
                    <Link
                      to="/Head/BDE"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <FaUserGroup size={23} className="me-3" />
                      BDE
                    </Link>
                    <Link
                      to="/Head/HR"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <FaUserGroup size={23} className="me-3" />
                      HR
                    </Link>
                    <Link
                      to="/Head/Trainer"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <FaUserGroup size={23} className="me-3" />
                      Trainer
                    </Link>
                  </div>
                </div>

                {/* Masters Dropdown */}
                <div className="nav-item">
                  <div
                    className="d-flex text-decoration-none link ps-3 py-2"
                    onClick={toggleMastersMenu} // Toggle dropdown on click
                    style={{ cursor: "pointer" }}
                  >
                    <GrDocumentStore size={23} className="me-3" />
                    Masters
                    <i
                      className={`fas ${
                        isMastersOpen ? "fa-angle-up" : "fa-angle-down"
                      } right ms-5`}
                      style={{ transition: "transform 0.2s ease" }} // Smooth transition
                    />
                  </div>

                  {/* Dropdown Menu */}
                  <div
                    className="nav nav-treeview"
                    style={{ display: isMastersOpen ? "block" : "none" }}
                  >
                    {/* <Link
                      to="/Head/users"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <FaUserGroup size={23} className="me-3" /> Users
                    </Link> */}
                    <Link
                      to="/Head/country"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <FaEarthAmericas size={23} className="me-3" /> Country
                    </Link>
                    {/* <Link
                      to="/Head/state"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <MdRealEstateAgent size={23} className="me-3" /> State
                    </Link> */}
                    <Link
                      to="/Head/university"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <FaUniversity size={23} className="me-3" /> University
                    </Link>
                    <Link
                      to="/Head/college"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <LiaUniversitySolid size={23} className="me-3" /> College
                    </Link>
                    
                    <Link
                      to="/Head/city"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <FaMountainCity size={23} className="me-3" /> City
                    </Link>
                    <Link
                      to="/Head/officecity"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <MdLocationCity size={23} className="me-3" /> Office City
                    </Link>
                    <Link
                      to="/Head/office"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <HiMiniBuildingOffice2 size={23} className="me-3" />{" "}
                      Office
                    </Link>
                    <Link
                      to="/Head/education"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <FaUserGraduate size={23} className="me-3" /> Education
                    </Link>
                    <Link
                      to="/Head/technology"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <TbBulbFilled size={23} className="me-3" /> Technology
                    </Link>
                    {/* <Link
                      to="/Head/duration"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <MdCalendarMonth size={23} className="me-3" /> Duration
                    </Link> */}
                    <Link
                      to="/Head/Courses"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <MdLibraryBooks size={23} className="me-3" /> Courses
                    </Link>
                    <Link
                      to="/Head/batch"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <MdLibraryBooks size={23} className="me-3" /> Batch
                    </Link>
                    <Link
                      to="/Head/welcomekit"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <IoBagCheckSharp size={23} className="me-3" /> Welcome Kit
                    </Link>
                    <Link
                      to="/Head/GuestLecturer"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <GiTeacher size={23} className="me-3" /> Guest Lecturer
                    </Link>
                  </div>
                </div>

                {/* Logout Link */}
                <Link to="/" className="text-decoration-none link ps-3 py-2">
                  <LuLogIn size={25} className="me-2" /> Logout
                </Link>
              </Nav>
            </div>
          </Col>
        </Row>
      </div>

      {/* Offcanvas (Mobile View) */}
      <div>
        <Offcanvas show={show} onHide={handleClose} className="d-md-none">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Sumago Infotech</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="sidebar d-block d-md-none">
              <Nav
                defaultActiveKey="/User"
                className="flex-column link-unstyled"
              >
                {/* Dashboard Link */}
                <Link
                  to="/Head/dashboard"
                  className="text-decoration-none link ps-3 py-2"
                >
                  <MdSpaceDashboard size={25} className="me-2" /> Dashboard
                </Link>

                <div className="nav-item">
                  <div
                    className="d-flex text-decoration-none link ps-3 py-2"
                    onClick={toggleMastersFMenu} // Toggle dropdown on click
                    style={{ cursor: "pointer" }}
                  >
                    <GrDocumentStore size={23} className="me-3" />
                    Users
                    <i
                      className={`fas ${
                        isMastersfOpen ? "fa-angle-up" : "fa-angle-down"
                      } right ms-5`}
                      style={{ transition: "transform 0.2s ease" }} // Smooth transition
                    />
                  </div>
                  {/* Dropdown Menu */}

                  <div
                    className="nav nav-treeview"
                    style={{ display: isMastersfOpen ? "block" : "none" }}
                  >
                    <Link
                      to="/Head/BDE"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <FaUserGroup size={23} className="me-3" />
                      BDE
                    </Link>
                    <Link
                      to="/Head/HR"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <FaUserGroup size={23} className="me-3" />
                      HR
                    </Link>
                    <Link
                      to="/Head/Trainer"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <FaUserGroup size={23} className="me-3" />
                      Trainer
                    </Link>
                  </div>
                </div>

                {/* Masters Dropdown */}
                <div className="nav-item">
                  <div
                    className="d-flex text-decoration-none link ps-3 py-2"
                    onClick={toggleMastersMenu} // Toggle dropdown on click
                    style={{ cursor: "pointer" }}
                  >
                    <GrDocumentStore size={23} className="me-3" />
                    Masters
                    <i
                      className={`fas fa-angle-left right ms-auto ${
                        isMastersOpen ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                  {/* Dropdown Menu */}
                  <div
                    className="nav nav-treeview"
                    style={{ display: isMastersOpen ? "block" : "none" }}
                  >
                    <Link
                      to="/Head/country"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <FaEarthAmericas size={23} className="me-3" /> Country
                    </Link>
                    {/* <Link
                      to="/Head/state"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <MdRealEstateAgent size={23} className="me-3" /> State
                    </Link> */}
                    <Link
                      to="/Head/university"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <FaUniversity size={23} className="me-3" /> University
                    </Link>
                    <Link
                      to="/Head/college"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <LiaUniversitySolid size={23} className="me-3" /> College
                    </Link>
                    <Link
                      to="/Head/city"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <FaMountainCity size={23} className="me-3" /> City
                    </Link>
                    <Link
                      to="/Head/officecity"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <MdLocationCity size={23} className="me-3" /> Office City
                    </Link>
                    <Link
                      to="/Head/office"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <HiMiniBuildingOffice2 size={23} className="me-3" />{" "}
                      Office
                    </Link>
                    <Link
                      to="/Head/education"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <FaUserGraduate size={23} className="me-3" /> Education
                    </Link>
                    <Link
                      to="/Head/technology"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <TbBulbFilled size={23} className="me-3" /> Technology
                    </Link>
                    <Link
                      to="/Head/Courses"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <MdLibraryBooks size={23} className="me-3" /> Courses
                    </Link>
                    <Link
                      to="/Head/welcomekit"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <IoBagCheckSharp size={23} className="me-3" /> Welcome Kit
                    </Link>
                    <Link
                      to="/Head/fee"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <RiMoneyRupeeCircleFill size={23} className="me-3" /> Fees
                    </Link>
                    <Link
                      to="/Head/GuestLecturer"
                      className="d-flex text-decoration-none link ps-5 py-2"
                    >
                      <GiTeacher size={23} className="me-3" /> Guest Lecturer
                    </Link>
                  </div>
                </div>

                {/* Logout Link */}
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
