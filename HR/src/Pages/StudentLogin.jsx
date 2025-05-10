import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row, Table, Breadcrumb } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import { AiFillDelete } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import Modal from "react-bootstrap/Modal";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const StudentLogin = () => {
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [student_name, setStudent_Name] = useState("");
    const [name, setCourse_Name] = useState("");
    const [date, setDate] = useState("");
    const [duration, setDuration] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("Active");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const capitalizeFirstLetter = (str) => {
        if (!str) return str;
        return str
            .split(" ") // Split the string into words
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
            .join(" "); // Join them back together
    };

    useEffect(() => {
        showUsers();
    }, []);

    const showUsers = () => {
        axios
            .get("http://localhost:8000/get_students",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }

            )
            .then((res) => {
                console.log("API Response:", res.data); // Log the response
                setUserData(res.data.data || res.data || []);
                // setUserData(res.data.data || []);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleClose = () => {
        setShow(false);

        setStudent_Name("");
        setCourse_Name("");
        setDate("");
        setDuration("");
        setEmail("");
        setPassword("");

        setStatus("Active");
        setEditingId(null);
        setErrorMessage("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const updatedDate = new Date(date).toISOString();

        // const newData = { city_name, status };

        const newData = {

            student_name: capitalizeFirstLetter(student_name),
            name: capitalizeFirstLetter(name),
            date: updatedDate,
            duration: capitalizeFirstLetter(duration),
            email: email.toLowerCase(),
            password,
            status: capitalizeFirstLetter(status)
        };

        if (editingId) {
            axios
                .put(`http://localhost:8000/update_stud/${editingId}`, newData,

                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }

                )
                .then(() => {
                    alert("Student Updated Successfully!");
                    showUsers();
                    handleClose();
                })
                .catch((err) => console.error(err))
                .finally(() => setIsSubmitting(false));
        } else {
            axios
                .post("http://localhost:8000/addstudent", newData,

                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                )
                .then(() => {
                    alert("User Added Successfully!");
                    showUsers();
                    handleClose();
                })
                .catch((err) => {
                    if (err.response && err.response.status === 400) {
                        setErrorMessage("User already exists.");
                    } else {
                        console.error(err);
                    }
                })
                .finally(() => setIsSubmitting(false));
        }
    };

    const deletedata = (_id) => {
        axios
            .delete(`http://localhost:8000/deletestudent/${_id}`)
            .then(() => {
                alert("Are you sure you want to delete this user?");
                showUsers();
            })
            .catch((err) => console.error(err));
    };

    const handleEdit = (student) => {
        setEditingId(student._id);
        setStudent_Name(student.student_name);
        setCourse_Name(student.name);
        setDate(new Date(student.date).toISOString().split("T")[0]);
        setDuration(student.duration);
        setEmail(student.email);
        setPassword(student.password);
        setStatus(student.status);
        setShow(true);
        setErrorMessage("");
    };

    const handleExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            userData.map((a, index) => ({
                "Sr.No": index + 1,
                "Student Name": a.student_name,
                "Course Name": a.name,
                "Course Duration": a.duration,
                "Date": a.date,
                "Email": a.email
            }))
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "User Data");
        XLSX.writeFile(workbook, "User-data.xlsx");
    };

    const handlePdf = () => {
        const doc = new jsPDF();
        doc.text("User Data", 14, 22);
        doc.autoTable({
            head: [["Sr.No", "Student Name", "Course Name", "Date", "Course Duration", "Email"]],
            body: userData.map((a, index) => [index + 1, a.student_name, a.name, a.date, a.duration, a.email]),
            startY: 30,
        });
        doc.save("User-data.pdf");
    };

    const csvData = userData.map((a, index) => ({
        "Sr.No": index + 1,
        "Student Name": a.student_name,
        "Course Name": a.name,
        "Course Duration": a.duration,
        "Date": a.date,
        "Email": a.email
    }));

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(userData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => handlePageChange(number)}
            >
                {number}
            </Pagination.Item>
        );
    }

    const showingFrom = indexOfFirstItem + 1;
    const showingTo = Math.min(indexOfLastItem, userData.length);
    const totalEntries = userData.length;

    const handleSearch = () => {
        const filteredData = userData.filter(
            (item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.duration.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.status.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setUserData(filteredData);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1);
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        if (searchTerm === "") {
            showUsers();
        }
    }, [searchTerm]);

    return (
        <Container className="d-flex justify-content-end">
            <Row className="d-flex justify-content-center mt-2 pt-5">
                {/* <h1 className="fw-bold text-center text-secondary">City</h1>
        <Col md={12} className="d-flex justify-content-end mb-4">
          <Button variant="primary" onClick={() => setShow(true)}>
            Add City
          </Button>
        </Col> */}

                <Row>
                    <Col md={4}>
                        <Breadcrumb>
                            <Breadcrumb.Item href="dashboard">Home</Breadcrumb.Item>
                            <Breadcrumb.Item active>Student</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col md={8} className="d-flex justify-content-end mb-4">
                        <Button variant="primary" onClick={() => setShow(true)}>
                            Add Student
                        </Button>
                    </Col>
                </Row>


                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{editingId ? "Update Student" : "Add Student"} </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>

                            <Row>
                                <Col md={12}>
                                    <Form.Label>Student Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Student Name"
                                        value={student_name}
                                        onChange={(e) => setStudent_Name(e.target.value)}
                                        required
                                    />
                                </Col>
                                {errorMessage && (
                                    <Col md={12} className="mt-2">
                                        <div style={{ color: "red" }}>{errorMessage}</div>
                                    </Col>
                                )}
                                <Col md={12}>
                                    <Form.Label>Course Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Course Name"
                                        value={name}
                                        onChange={(e) => setCourse_Name(e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col md={12}>
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col md={12}>
                                    <Form.Label>Duration</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Duration"
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col md={12}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col md={12}>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col md={12} className="d-flex mt-3">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        label="Active"
                                        name="status"
                                        value="Active"
                                        className="ps-5"
                                        checked={status === "Active"}
                                        onChange={(e) => setStatus(e.target.value)}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Inactive"
                                        name="status"
                                        value="Inactive"
                                        className="ps-5"
                                        checked={status === "Inactive"}
                                        onChange={(e) => setStatus(e.target.value)}
                                    />
                                </Col>
                            </Row>

                            {/* <Row>
                                <Col md={6}>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter first Name"
                                        value={fname}
                                        onChange={(e) => setFname(e.target.value)}
                                        required
                                    /></Col>
                                <Col md={6}>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter last Name"
                                        value={lname}
                                        onChange={(e) => setLname(e.target.value)}
                                        required
                                    />
                                </Col></Row>
                            {errorMessage && (
                                <Col md={12} className="mt-2">
                                    <div style={{ color: "red" }}>{errorMessage}</div>
                                </Col>
                            )}
                            <Row>
                                <Col md={12} className=" mt-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter Email id"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Col>

                                <Col md={12} className="mt-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col md={12} className="d-flex mt-3">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        label="Active"
                                        name="status"
                                        value="Active"
                                        className="ps-5"
                                        checked={status === "Active"}
                                        onChange={(e) => setStatus(e.target.value)}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Inactive"
                                        name="status"
                                        value="Inactive"
                                        className="ps-5"
                                        checked={status === "Inactive"}
                                        onChange={(e) => setStatus(e.target.value)}
                                    />
                                </Col>
                            </Row> */}
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* downlod button */}
                <Col md={8}>
                    <CSVLink data={csvData} filename={"User-data.csv"}>
                        <Button className="btn-secondary">CSV</Button>
                    </CSVLink>
                    <Button onClick={handleExcel} className="ms-1 btn-secondary">
                        Excel
                    </Button>
                    <Button onClick={handlePdf} className="ms-1 btn-secondary">
                        PDF
                    </Button>
                    <Button onClick={() => window.print()} className="ms-1 btn-secondary">
                        Print
                    </Button>
                </Col>

                {/* Search */}
                <Col md={4} className="d-flex">
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Search for ...."
                            value={searchTerm}
                            className="ms-2"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onChangeCapture={handleSearch}
                        />
                        <InputGroup.Text id="basic-addon2" className="bg-secondary">
                            <FaSearch className="text-white" />
                        </InputGroup.Text>
                    </InputGroup>
                </Col>

                {/* table */}
                <Col md={12} lg={12} xl={12} xxl={12}>
                    <div style={{ overflowX: "auto" }}>
                        <Table striped bordered hover id="printable-table">
                            <thead>
                                <tr>
                                    <th>Sr.No</th>
                                    <th>Student Name</th>
                                    <th>Course Name</th>
                                    <th>Course Duration</th>
                                    <th>Date</th>
                                    <th>Email</th>
                                    <th className="no-print">Status</th>
                                    <th className="no-print text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((a, index) => (
                                    <tr key={index}>
                                        <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                        <td>{a.student_name}</td>
                                        <td>{a.name}</td>
                                        <td>{a.duration}</td>
                                        <td>{formatDate(a.date)}</td>
                                        <td>{a.email}</td>
                                        <td className="no-print">{a.status}</td>
                                        <td className="no-print d-flex justify-content-evenly">
                                            <Button
                                                variant="warning"
                                                className="no-print" // Hide this during printing
                                                onClick={() => handleEdit(a)}
                                            >
                                                <GrEdit />
                                            </Button>
                                            <Button
                                                variant="danger"
                                                className="no-print" // Hide this during printing
                                                onClick={() => deletedata(a._id)}
                                            >
                                                <AiFillDelete />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Col>

                <Row>
                    <Col md={6}>
                        <div className="dataTables_info" aria-live="polite" role="status">
                            Showing {showingFrom} to {showingTo} of {totalEntries} entries
                        </div>
                    </Col>
                    <Col md={6} className="d-flex justify-content-end">
                        <Pagination>
                            <Pagination.Prev
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                            >
                                Previous
                            </Pagination.Prev>
                            {[...Array(totalPages)].map((_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    active={index + 1 === currentPage}
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                            >
                                Next
                            </Pagination.Next>
                        </Pagination>
                    </Col>
                </Row>
            </Row>
        </Container>
    );
};

export default StudentLogin;