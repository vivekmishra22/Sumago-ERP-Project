import { useState } from "react";
import { Button, Col, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import Offcanvas from "react-bootstrap/Offcanvas";
import { ImProfile } from "react-icons/im";
import { BiLogOut } from "react-icons/bi";
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
            <div className="sidebar d-none d-md-block vh-100 bg-dark">
                <Row className="h-100">
                    <Col className="d-flex flex-column h-100">
                        <h2 className="text-white ps-3 mt-5 mb-0 pt-4 text-center">Trainer</h2>

                        <Nav defaultActiveKey="/User" className="flex-column link-unstyled flex-grow-1 p-2">
                            {/* Dashboard Link */}
                            <Link
                                to="/Head/"
                                className="text-decoration-none link ps-3 py-2"
                            >
                                <MdSpaceDashboard size={25} className="me-2" /> Dashboard
                            </Link>
                            <Link
                                to="/Head/trainer_profile_add"
                                className="text-decoration-none link ps-3 py-2"
                            >
                                <ImProfile size={25} className="me-2" /> Trainer Profile Add
                            </Link>

                            <Link
                                to="/Head/student_batch"
                                className="text-decoration-none link ps-3 py-2"
                            >
                                <ImProfile size={25} className="me-2" /> Student Batch
                            </Link>

                            {/* Logout Link (Always at the bottom) */}
                            <Link to="/" className="text-decoration-none link ps-3 py-2 d-flex align-items-center mt-auto">
                                <BiLogOut size={25} className="me-2" />
                                <span>Logout</span>
                            </Link>
                        </Nav>
                    </Col>
                </Row>
            </div>

            {/* Offcanvas (Mobile View) */}
            <Offcanvas show={show} onHide={handleClose} className="d-md-none">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Sumago Infotech</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="sidebar d-block d-md-none">
                        <Nav defaultActiveKey="/User" className="flex-column link-unstyled d-flex flex-column h-100">
                            {/* Dashboard Link */}
                            <Link
                                    to="/Head/"
                                    className="text-decoration-none link ps-3 py-2"
                                >
                                    <MdSpaceDashboard size={25} className="me-2" /> Dashboard
                                </Link>
                                <Link
                                    to="/Head/trainer_profile_add"
                                    className="text-decoration-none link ps-3 py-2"
                                >
                                    <ImProfile size={25} className="me-2" /> Trainer Profile Add
                                </Link>

                                <Link
                                    to="/Head/student_batch"
                                    className="text-decoration-none link ps-3 py-2"
                                >
                                    <ImProfile size={25} className="me-2" /> Student Batch
                                </Link>                              
                                
                            {/* Logout Link (Always at the bottom) */}
                            <Link to="/" className="text-decoration-none link ps-3 py-2 mt-auto">
                                <BiLogOut size={25} className="me-2" /> Logout
                            </Link>
                        </Nav>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default Sidebar;