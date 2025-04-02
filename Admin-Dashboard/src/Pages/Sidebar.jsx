import { useState } from "react";
import { Button, Col, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaLayerGroup, FaUniversity, FaUserCheck, FaUserFriends, FaUserGraduate, FaUserPlus, FaUsers, FaUsersCog } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { MdAssignmentInd, MdGroups, MdLibraryBooks, MdLocationCity, MdSpaceDashboard } from "react-icons/md";
import Offcanvas from "react-bootstrap/Offcanvas";
import { IoBagCheckSharp } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { LiaUniversitySolid } from "react-icons/lia";
import { HiMiniBuildingOffice2, HiUserGroup } from "react-icons/hi2";
import { FaMountainCity, FaUserGroup } from "react-icons/fa6";
import { TbBulbFilled } from "react-icons/tb";
import { GiTeacher } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import { RiGroupFill } from "react-icons/ri";
import { BsFillPersonLinesFill } from "react-icons/bs";

const Sidebar = () => {
    const [show, setShow] = useState(false); // State for Offcanvas
    const [showAddLogin, setShowAddLogin] = useState(false); // State for Add Login dropdown
    const [showMasters, setShowMasters] = useState(false); // State for Masters dropdown

    const handleClose = () => setShow(false); // Close Offcanvas
    const handleShow = () => setShow(true); // Open Offcanvas

    const toggleAddLogin = () => {
        setShowAddLogin(!showAddLogin);
    };

    const toggleMasters = () => {
        setShowMasters(!showMasters);
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
                <Row className="h-100">
                    <Col className="d-flex flex-column">
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

                            {/* User Dropdown */}
                            <div className="nav-item">
                                <div
                                    className="d-flex text-decoration-none link ps-3 py-2 d-flex align-items-center pe-4"
                                    onClick={toggleAddLogin} // Toggle dropdown on click
                                    style={{ cursor: "pointer" }}
                                >
                                    {/* <RiUserAddFill size={23} className="me-3" />
                                    <span>Add Login</span> */}

                                    <FaUserPlus size={23} className="me-3" />
                                    <span>Add Login</span>
                                    <i
                                        className={`fas ${showAddLogin ? "fa-angle-up" : "fa-angle-down"} right ms-auto`}
                                        style={{ transition: "transform 0.2s ease" }} // Smooth transition
                                    />
                                </div>

                                {/* Dropdown Menu */}
                                <div
                                    className="nav nav-treeview"
                                    style={{ display: showAddLogin ? "block" : "none" }}

                                >
                                    <Link
                                        to="/Head/BDE"
                                        className="d-flex text-decoration-none link ps-5 py-2 d-flex align-items-center"
                                    >
                                        <FaUserGroup size={23} className="me-3" />
                                        <span>BDE</span>
                                    </Link>
                                    <Link
                                        to="/Head/HR"
                                        className="d-flex text-decoration-none link ps-5 py-2 d-flex align-items-center"
                                    >
                                        <FaUserGroup size={23} className="me-3" />
                                        <span>HR</span>
                                    </Link>
                                    <Link
                                        to="/Head/Trainer"
                                        className="d-flex text-decoration-none link ps-5 py-2 d-flex align-items-center"
                                    >
                                        <FaUserGroup size={23} className="me-3" />
                                        <span>Trainer</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Masters Dropdown */}
                            <div className="nav-item">
                                <div
                                    className="d-flex text-decoration-none link ps-3 py-2 d-flex align-items-center pe-4"
                                    onClick={toggleMasters} // Toggle dropdown on click
                                    style={{ cursor: "pointer" }}
                                >
                                    {/* <GrDocumentStore size={23} className="me-3" /> */}
                                    <FaLayerGroup size={23} className="me-3" />
                                    <span>Masters</span>
                                    <i
                                        className={`fas ${showMasters ? "fa-angle-up" : "fa-angle-down"} right ms-auto`}
                                        style={{ transition: "transform 0.2s ease" }} // Smooth transition
                                    />
                                </div>
                                {/* Dropdown Menu */}
                                <div
                                    className="nav nav-treeview"
                                    style={{ display: showMasters ? "block" : "none" }}
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
                                        to="/Head/duration"
                                        className="d-flex text-decoration-none link ps-5 py-2 d-flex align-items-center"
                                    >
                                        <MdLibraryBooks size={23} className="me-3" />
                                        <span>Duration</span>
                                    </Link>
                                    <Link
                                        to="/Head/batch"
                                        className="d-flex text-decoration-none link ps-5 py-2 d-flex align-items-center"
                                    >
                                        {/* <MdLibraryBooks size={23} className="me-3" /> */}
                                        {/* <RiGroupFill size={23} className="me-3" /> */}
                                        <FaUsersCog size={23} className="me-3" />
                                        {/* <MdGroups size={23} className="me-3" /> */}
                                        {/* <BsFillPersonLinesFill size={23} className="me-3" /> */}
                                        {/* <MdAssignmentInd size={23} className="me-3" /> */}
                                        <span>Batch</span>
                                    </Link>
                                    <Link
                                        to="/Head/welcomekit"
                                        className="d-flex text-decoration-none link ps-5 py-2 d-flex align-items-center"
                                    >
                                        <IoBagCheckSharp size={23} className="me-3" />
                                        <span>Welcome Kit</span>
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
                        </Nav>

                        {/* Logout Button - Fixed to bottom */}
                        <div className="mt-auto">
                            <Link
                                to="/"
                                className="text-decoration-none link ps-3 py-2 d-flex align-items-center"
                                style={{ marginBottom: "20px" }}
                            >
                                <BiLogOut size={25} className="me-2" />
                                <span>Logout</span>
                            </Link>
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
                    <Offcanvas.Body className="d-flex flex-column">
                        {/* <div className="sidebar d-block d-md-none"> */}
                        <div className="flex-grow-1">
                            <Nav defaultActiveKey="/User" className="flex-column link-unstyled">
                                {/* Dashboard Link */}
                                <Link
                                    to="/Head/dashboard"
                                    className="text-decoration-none link ps-3 py-2"
                                >
                                    <MdSpaceDashboard size={25} className="me-2" /> Dashboard
                                </Link>

                                {/* User Dropdown */}
                                <div className="nav-item">
                                    <div
                                        className="d-flex text-decoration-none link ps-3 py-2 d-flex align-items-center pe-4"
                                        onClick={toggleAddLogin} // Toggle dropdown on click
                                        style={{ cursor: "pointer" }}
                                    >
                                        <GrDocumentStore size={23} className="me-3" />
                                        Add Login
                                        <i
                                            className={`fas ${showAddLogin ? "fa-angle-up" : "fa-angle-down"} right ms-auto`}
                                            style={{ transition: "transform 0.2s ease" }} // Smooth transition
                                        />
                                    </div>
                                    {/* Dropdown Menu */}
                                    <div
                                        className="nav nav-treeview"
                                        style={{ display: showAddLogin ? "block" : "none" }}

                                    >
                                        <Link
                                            to="/Head/BDE"
                                            className="d-flex text-decoration-none link ps-5 py-2 d-flex align-items-center"
                                        >
                                            <FaUserGroup size={23} className="me-3" />
                                            <span>BDE</span>
                                        </Link>
                                        <Link
                                            to="/Head/HR"
                                            className="d-flex text-decoration-none link ps-5 py-2 d-flex align-items-center"
                                        >
                                            <FaUserGroup size={23} className="me-3" />
                                            <span>HR</span>
                                        </Link>
                                        <Link
                                            to="/Head/Trainer"
                                            className="d-flex text-decoration-none link ps-5 py-2 d-flex align-items-center"
                                        >
                                            <FaUserGroup size={23} className="me-3" />
                                            <span>Trainer</span>
                                        </Link>
                                    </div>
                                </div>

                                {/* Masters Dropdown */}
                                <div className="nav-item">
                                    <div
                                        className="d-flex text-decoration-none link ps-3 py-2 d-flex align-items-center pe-4"
                                        onClick={toggleMasters} // Toggle dropdown on click
                                        style={{ cursor: "pointer" }}
                                    >
                                        <GrDocumentStore size={23} className="me-3" />
                                        <span>Masters</span>
                                        <i
                                            className={`fas ${showMasters ? "fa-angle-up" : "fa-angle-down"} right ms-auto`}
                                            style={{ transition: "transform 0.2s ease" }} // Smooth transition
                                        />
                                    </div>
                                    {/* Dropdown Menu */}
                                    <div
                                        className="nav nav-treeview"
                                        style={{ display: showMasters ? "block" : "none" }}
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
                                            to="/Head/duration"
                                            className="d-flex text-decoration-none link ps-5 py-2 d-flex align-items-center"
                                        >
                                            <MdLibraryBooks size={23} className="me-3" />
                                            <span>Duration</span>
                                        </Link>
                                        <Link
                                            to="/Head/batch"
                                            className="d-flex text-decoration-none link ps-5 py-2 d-flex align-items-center"
                                        >
                                            <MdLibraryBooks size={23} className="me-3" />
                                            <span>Batch</span>
                                        </Link>

                                        <Link
                                            to="/Head/welcomekit"
                                            className="d-flex text-decoration-none link ps-5 py-2 d-flex align-items-center"
                                        >
                                            <IoBagCheckSharp size={23} className="me-3" />
                                            <span>Welcome Kit</span>
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

                                {/* <Link to="/" className="text-decoration-none link ps-3 py-2">
                                    <LuLogIn size={25} className="me-2" /> Logout
                                </Link> */}
                            </Nav>
                        </div>
                        <div className="mt-auto">
                            <Link to="/" className="text-decoration-none link ps-3 py-2 d-flex align-items-center">
                                <LuLogIn size={25} className="me-2" />
                                <span>Logout</span>
                            </Link>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </>
    );
};

export default Sidebar;