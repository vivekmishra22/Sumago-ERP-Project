import { useState } from "react";
import { Button, Col, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUniversity, FaUserGraduate } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { MdLibraryBooks, MdLocationCity, MdSpaceDashboard } from "react-icons/md";
import Offcanvas from "react-bootstrap/Offcanvas";
import { IoBagCheckSharp } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { LiaUniversitySolid } from "react-icons/lia";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { FaMountainCity } from "react-icons/fa6";
import { TbBulbFilled } from "react-icons/tb";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { GiTeacher } from "react-icons/gi";

const Sidebar = () => {
    const [show, setShow] = useState(false); // State for Offcanvas
    const [isMastersOpen, setIsMastersOpen] = useState(false); // State for Masters dropdown

    const handleClose = () => setShow(false); // Close Offcanvas
    const handleShow = () => setShow(true); // Open Offcanvas

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
                        <br />
                        <br />
                        <br />
                        <h2 className="text-white ps-3">Administrator</h2>

                        <Nav defaultActiveKey="/User" className="flex-column link-unstyled">
                            {/* Dashboard Link */}
                            <Link
                                to="/Head/dashboard"
                                className="text-decoration-none link ps-3 py-2 d-flex align-items-center"
                            >
                                <MdSpaceDashboard size={25} className="me-2" /> 
                                <span>Dashboard</span>
                            </Link>

                            {/* Masters Dropdown */}
                            <div className="nav-item">
                                <div
                                    className="d-flex text-decoration-none link ps-3 py-2 d-flex align-items-center"
                                    onClick={toggleMastersMenu} // Toggle dropdown on click
                                    style={{ cursor: "pointer" }}
                                >
                                    <GrDocumentStore size={23} className="me-3" />
                                    <span>Masters</span>
                                    <i
                                        className={`fas ${isMastersOpen ? "fa-angle-up" : "fa-angle-down"} right ms-5`}
                                        style={{ transition: "transform 0.2s ease" }} // Smooth transition
                                    />
                                </div>
                                {/* Dropdown Menu */}
                                <div
                                    className="nav nav-treeview"
                                    style={{ display: isMastersOpen ? "block" : "none" }}
                                >
                                    <Link
                                        to="/Head/university"
                                        className="d-flex text-decoration-none link ps-5 py-2 d-flex align-items-center"
                                    >
                                        <FaUniversity size={23} className="me-3" /> 
                                        <span>University</span>
                                    </Link>
                                    <Link
                                        to="/Head/college"
                                        className="d-flex text-decoration-none link ps-5 py-2 d-flex align-items-center"
                                    >
                                        <LiaUniversitySolid size={23} className="me-3" /> 
                                        <span>College</span>
                                    </Link>
                                    <Link
                                        to="/Head/city"
                                        className="d-flex text-decoration-none link ps-5 py-2 d-flex align-items-center"
                                    >
                                        <FaMountainCity size={23} className="me-3" /> 
                                        <span>City</span>
                                    </Link>
                                    <Link
                                        to="/Head/officecity"
                                        className="d-flex text-decoration-none link ps-5 py-2 d-flex align-items-center"
                                    >
                                        <MdLocationCity size={23} className="me-3" /> 
                                        <span>Office City</span>
                                    </Link>
                                    <Link
                                        to="/Head/office"
                                        className="d-flex text-decoration-none link ps-5 py-2 d-flex align-items-center"
                                    >
                                        <HiMiniBuildingOffice2 size={23} className="me-3" /> 
                                        <span>Office</span>
                                    </Link>
                                    <Link
                                        to="/Head/education"
                                        className="d-flex text-decoration-none link ps-5 py-2 d-flex align-items-center"
                                    >
                                        <FaUserGraduate size={23} className="me-3" /> 
                                        <span>Education</span>
                                    </Link>
                                    <Link
                                        to="/Head/technology"
                                        className="d-flex text-decoration-none link ps-5 py-2 d-flex align-items-center"
                                    >
                                        <TbBulbFilled size={23} className="me-3" /> 
                                        <span>Technology</span>
                                    </Link>
                                    <Link
                                        to="/Head/Courses"
                                        className="d-flex text-decoration-none link ps-5 py-2 d-flex align-items-center"
                                    >
                                        <MdLibraryBooks size={23} className="me-3" /> 
                                        <span>Courses</span>
                                    </Link>
                                    <Link
                                        to="/Head/welcomekit"
                                        className="d-flex text-decoration-none link ps-5 py-2 d-flex align-items-center"
                                    >
                                        <IoBagCheckSharp size={23} className="me-3" /> 
                                        <span>Welcome Kit</span>
                                    </Link>
                                    <Link
                                        to="/Head/fee"
                                        className="d-flex text-decoration-none link ps-5 py-2 d-flex align-items-center"
                                    >
                                        <RiMoneyRupeeCircleFill size={23} className="me-3" /> 
                                        <span>Fees</span>
                                    </Link>
                                    <Link
                                        to="/Head/GuestLecturer"
                                        className="d-flex text-decoration-none link ps-5 py-2 d-flex align-items-center"
                                    >
                                        <GiTeacher size={23} className="me-3" />
                                        <span>Guest Lecturer</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Logout Link */}
                            <Link to="/" className="text-decoration-none link ps-3 py-2 d-flex align-items-center">
                                <LuLogIn size={25} className="me-2" /> 
                                <span>Logout</span>
                            </Link>
                        </Nav>
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
                            <Nav defaultActiveKey="/User" className="flex-column link-unstyled">
                                {/* Dashboard Link */}
                                <Link
                                    to="/Head/dashboard"
                                    className="text-decoration-none link ps-3 py-2"
                                >
                                    <MdSpaceDashboard size={25} className="me-2" /> Dashboard
                                </Link>

                                {/* Masters Dropdown */}
                                <div className="nav-item">
                                    <div
                                        className="d-flex text-decoration-none link ps-3 py-2"
                                        onClick={toggleMastersMenu} // Toggle dropdown on click
                                        style={{ cursor: "pointer" }}
                                    >
                                        <GrDocumentStore size={23} className="me-3" />
                                        Masters
                                    </div>
                                    {/* Dropdown Menu */}
                                    <div
                                        className="nav nav-treeview"
                                        style={{ display: isMastersOpen ? "block" : "none" }}
                                    >
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
                                            <HiMiniBuildingOffice2 size={23} className="me-3" /> Office
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