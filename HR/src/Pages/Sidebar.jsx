import { useState } from "react";
import { Button, Col, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaComments, FaFolderOpen } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import Offcanvas from "react-bootstrap/Offcanvas";
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
                        <h2 className="text-white ps-3 mt-5 mb-0 pt-4 text-center"> HR </h2>

                        <Nav defaultActiveKey="/User" className="flex-column link-unstyled flex-grow-1">
                            {/* Dashboard Link */}
                            <Link to="/Head/dashboard" className="text-decoration-none link ps-3 py-2 d-flex align-items-center">
                                <MdSpaceDashboard size={25} className="me-2" /> 
                                <span>Dashboard</span>
                            </Link>

                            {/* Feedback Link */}
                            <Link to="/Head/studentlogin" className="text-decoration-none link ps-3 py-2 d-flex align-items-center">
                                <FaComments size={23} className="me-2" />
                                <span>Student Login</span>
                            </Link>

                            {/* Projects Link */}
                            <Link to="/Head/project" className="text-decoration-none link ps-3 py-2 d-flex align-items-center">
                                <FaFolderOpen size={23} className="me-2" />
                                <span>Projects</span>
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
                            <Link to="/Head/dashboard" className="text-decoration-none link ps-3 py-2">
                                <MdSpaceDashboard size={25} className="me-2" /> Dashboard
                            </Link>

                            {/* Feedback Link */}
                            <Link to="/Head/feedback" className="text-decoration-none link ps-3 py-2">
                                <FaComments size={23} className="me-2" /> Feedback
                            </Link>

                            {/* Projects Link */}
                            <Link to="/Head/project" className="text-decoration-none link ps-3 py-2">
                                <FaFolderOpen size={23} className="me-2" /> Projects
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