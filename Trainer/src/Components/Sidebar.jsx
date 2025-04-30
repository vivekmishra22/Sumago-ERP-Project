import { useState } from "react";
import { Button, Col, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LuLogIn } from "react-icons/lu";
import {  MdSpaceDashboard } from "react-icons/md";
import Offcanvas from "react-bootstrap/Offcanvas";
import { ImProfile } from "react-icons/im";
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
                        <h1 className="text-white ps-3 mt-5 pt-5 fw-bold">Trainer</h1>
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
                            {/* <Link
                                to="/Head/trainer_profile"
                                className="text-decoration-none link ps-3 py-2"
                            >
                                <ImProfile size={25} className="me-2" /> Trainer Profile
                            </Link> */}
                            <Link
                                to="/Head/trainer_profile_add"
                                className="text-decoration-none link ps-3 py-2"
                            >
                                <ImProfile size={25} className="me-2" /> Trainer Profile Add
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
                        <h5 className="text-white ps-3 fw-bold">Trainer</h5>
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
                                to="/Head/trainer_profile"
                                className="text-decoration-none link ps-3 py-2"
                            >
                                <ImProfile size={25} className="me-2" /> Trainer Profile
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