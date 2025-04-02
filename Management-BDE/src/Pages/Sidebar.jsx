import { useState } from "react";
import { Button, Col, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { FaUniversity, FaUserGraduate } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import {  MdSpaceDashboard } from "react-icons/md";
import Offcanvas from "react-bootstrap/Offcanvas";
import { IoBagCheckSharp } from "react-icons/io5";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
const Sidebar = () => {
    const [show, setShow] = useState(false); // State for Offcanvas

    const handleClose = () => setShow(false); // Close Offcanvas
    const handleShow = () => setShow(true); // Open Offcanvas

    

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
                        {/* <br />
                        <br />
                        <br /> */}
                        <h5 className="text-white ps-3 mt-5 pt-5 fw-bold">Business Development Executive</h5>
                    </div>

                        <div className="sidebar3 ">

                        <Nav defaultActiveKey="/User" className=" flex-column link-unstyled">
                            {/* Dashboard Link */}
                            <Link
                                to="/Head/"
                                className="text-decoration-none link ps-3 py-2"
                            >
                                <MdSpaceDashboard size={25} className="me-2" /> Dashboard
                            </Link>
                            <Link
                                to="/Head/enquiry_add"
                                className="text-decoration-none link ps-3 py-2"
                            >
                                <RiMoneyRupeeCircleFill size={25} className="me-2" />  Student Enquiry
                            </Link>
                            <Link
                                to="/Head/enquiry_student"
                                className="text-decoration-none link ps-3 py-2"
                            >
                                <RiMoneyRupeeCircleFill size={25} className="me-2" />  Student Enquiry Data
                            </Link>
                            <Link
                                to="/Head/admission_fees"
                                className="text-decoration-none link ps-3 py-2"
                            >
                                <RiMoneyRupeeCircleFill size={25} className="me-2" />  Admission Fees
                            </Link>
                            <Link
                                to="/Head/welcomekit_feespaid"
                                className="text-decoration-none link ps-3 py-2"
                            >
                                <IoBagCheckSharp size={25} className="me-2" />  Welcome Kit
                            </Link>

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
                        <Row>
                    <Col>
                    <div>
                        <br />
                        <br />
                        <br />
                        <h5 className="text-white ps-3 fw-bold">Business Development Executive</h5>
                    </div>

                        <div className="sidebar3 ">

                        <Nav defaultActiveKey="/User" className=" flex-column link-unstyled">
                            {/* Dashboard Link */}
                            <Link
                                to="/Head/"
                                className="text-decoration-none link ps-3 py-2"
                            >
                                <MdSpaceDashboard size={25} className="me-2" /> Dashboard
                            </Link>
                            <Link
                                to="/Head/enquiry_student"
                                className="text-decoration-none link ps-3 py-2"
                            >
                                <RiMoneyRupeeCircleFill size={25} className="me-2" />  Student Enquiry
                            </Link>
                            <Link
                                to="/Head/admission_fees"
                                className="text-decoration-none link ps-3 py-2"
                            >
                                <RiMoneyRupeeCircleFill size={25} className="me-2" />  Admission Fees
                            </Link>
                            <Link
                                to="/Head/welcomekit_feespaid"
                                className="text-decoration-none link ps-3 py-2"
                            >
                                <IoBagCheckSharp size={25} className="me-2" />  Welcome Kit
                            </Link>

                            {/* Logout Link */}
                            <Link to="/" className="text-decoration-none link ps-3 py-2">
                                <LuLogIn size={25} className="me-2" /> Logout
                            </Link>
                        </Nav>
                        </div>
                    </Col>
                </Row>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </>
    );
};

export default Sidebar;