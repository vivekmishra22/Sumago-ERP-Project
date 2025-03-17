import axios from "axios";
import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Col, Container, Form, InputGroup, Row, Table } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import { AiFillDelete } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import Modal from "react-bootstrap/Modal";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaSearch } from "react-icons/fa";
import Feedback from "react-bootstrap/esm/Feedback";

const Feedback = () => {
    const [show, setShow] = useState(false);
    // const handleShow = () => setShow(true);

    const [userData, setUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Adjust as needed

    const [user_name, setUserName] = useState("");
    const [course_name, setCourseName] = useState("");
    const [trainer_name, setTrainerName] = useState("");
    const [current_date, setCurrentDate] = useState("");
    //   const [trainer_name, setTrainerName] = useState("");
    //   const [trainer_name, setTrainerName] = useState("");
    //   const [trainer_name, setTrainerName] = useState("");
    //   const [status, setStatus] = useState("Active"); // Default status
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Search input value
    const [editingId, setEditingId] = useState(null); // Track which ID is being edited
    const [categories, setCategories] = useState([]);

    const capitalizeFirstLetter = (str) => {
        if (!str) return str;
        return str
            .split(" ") // Split the string into words
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
            .join(" "); // Join them back together
    };

    // Fetch Data from API
    useEffect(() => {
        showUsers();
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:8000/getdataOfficeCity")
            .then((res) => {
                const udata = res.data.data.filter((item) => item.status === "Active");
                setCategories(udata); // Assuming the response contains a `data` array
                console.log("Categories fetched:", res.data.data);
            })
            .catch((err) => {
                console.error("Error fetching categories:", err);
            });
    }, []);

    const showUsers = () => {
        // setLoading(true);
        axios
            .get("http://localhost:8000/getdataOffice")
            .then((res) => {
                setUserData(res.data.data);
                // setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                // setLoading(false);
            });
    };

    // Handle Modal Close
    const handleClose = () => {
        setShow(false);
        setUserName("");
        setCourseName("");
        setTrainerName("");
        setCurrentDate("");
        // setStatus("Active");
        setEditingId(null); // Reset editing state
    };

    // Add or Update Office
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const newData = {
            user_name: capitalizeFirstLetter(user_name),
            course_name: capitalizeFirstLetter(course_name),
            trainer_name: capitalizeFirstLetter(trainer_name),
            current_date: capitalizeFirstLetter(current_date),
            // status: capitalizeFirstLetter(status),
        };

        if (editingId) {
            // Update existing Office
            axios
                .put(`http://localhost:8000/UpdateOffice/${editingId}`, newData)
                .then(() => {
                    alert("Office Updated Successfully!");
                    showUsers();
                    handleClose();
                })
                .catch((err) => console.error(err))
                .finally(() => setIsSubmitting(false));
        } else {
            // Add new Office
            axios
                .post("http://localhost:8000/addOffice", newData)
                .then(() => {
                    alert("Office Added Successfully!");
                    showUsers();
                    handleClose();
                })
                .catch((err) => console.error(err))
                .finally(() => setIsSubmitting(false));
        }
    };

    // Delete data
    const deletedata = (_id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            axios
                .delete(`http://localhost:8000/deleteOffice/${_id}`)
                .then(() => {
                    alert("Office Deleted");
                    showUsers();
                })
                .catch((err) => console.error(err));
        }
    };

    const handleEdit = (item) => {
        setEditingId(item._id);
        setUserName(item.user_name);
        setCourseName(item.course_name);
        setTrainerName(item.trainer_name);
        setCurrentDate(item.current_date);
        // setStatus(item.status);
        setShow(true);
    };

    // Export to Excel
    const handleExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            userData.map((a, index) => ({
                "Sr.No": index + 1,
                "User Name": a.user_name,
                "Course Name": a.course_name,
                "Trainer Name": a.trainer_name,
                "Current Date": a.current_date
            }))
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Office Data");
        XLSX.writeFile(workbook, "Office-data.xlsx");
    };

    // Export to PDF
    const handlePdf = () => {
        const doc = new jsPDF();
        doc.text("Office Data", 14, 22);
        doc.autoTable({
            head: [["Sr.No", "Office Name", "City Name"]],
            body: userData.map((a, index) => [
                index + 1,
                a.user_name,
                a.course_name,
                a.trainer_name,
                a.current_date
            ]),
            startY: 30,
        });
        doc.save("Office-data.pdf");
    };

    // CSV data for export
    const csvData = userData.map((a, index) => ({
        "Sr.No": index + 1,
        "User Name": a.user_name,
        "Course Name": a.course_name,
        "Trainer Name": a.trainer_name,
        "Current Date": a.current_date
    }));

    // Pagination logic
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
        const filteredData = userData.filter((item) => {
            const OfficeName = item.user_name?.toLowerCase() || "";
            const cityName = item.course_name?.toLowerCase() || "";
            const trainer_name = item.trainer_name?.toLowerCase() || "";
            const status = item.status?.toLowerCase() || "";

            return (
                OfficeName.includes(searchTerm.toLowerCase()) ||
                cityName.includes(searchTerm.toLowerCase()) ||
                trainer_name.includes(searchTerm.toLowerCase()) ||
                status.includes(searchTerm.toLowerCase())
            );
        });

        setUserData(filteredData);
    };

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    // Reset search when the input is cleared
    useEffect(() => {
        if (searchTerm === "") {
            showUsers(); // Reset the table data to the original data
        }
    }, [searchTerm]);

    return (
        <Container className="d-flex justify-content-end">
            <Row className="d-flex justify-content-center mt-2 pt-5">
                {/* Add City Button
        <h1 className="fw-bold text-center text-primary ">Office </h1>
        <Col md={12} className="d-flex justify-content-end mb-4">
          <Button variant="primary" onClick={handleShow}>
            Add Office
          </Button>
        </Col> */}

                <Row>
                    <Col md={4}>
                        <Breadcrumb>
                            <Breadcrumb.Item href="dashboard">Home</Breadcrumb.Item>
                            <Breadcrumb.Item active>Office</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col md={8} className="d-flex justify-content-end mb-4">
                        <Button variant="primary" onClick={() => setShow(true)}>
                            Add Office
                        </Button>
                    </Col>
                </Row>

                {/* Add Office Modal */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {editingId ? "Update Office" : "Add Office"} {/* Conditional title */}
                        </Modal.Title>
                        {/* <Modal.Title>Add Office</Modal.Title> */}
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={12} className="mt-2">
                                    <Form.Label>Office Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Office Name"
                                        value={user_name}
                                        onChange={(e) => setUserName(e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col md={12} className="mt-2">
                                    <Form.Label className="mt-3">
                                        <b>Select city</b>
                                    </Form.Label>
                                    <Form.Select
                                        aria-label="Select city"
                                        value={course_name}
                                        onChange={(e) => setCourseName(e.target.value)}
                                        required
                                    >
                                        <option value="">Choose a city</option>
                                        {categories.map((city) => (
                                            <option key={city._id} value={city.course_name}>
                                                {city.course_name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>

                                <Col md={12} className="mt-3">
                                    <Form.Label>Office Address</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        ria-label="With textarea"
                                        rows={3}
                                        placeholder="Enter office address"
                                        value={trainer_name}
                                        onChange={(e) => setTrainerName(e.target.value)}
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

                {/* Export Buttons */}
                <Col md={8} className="">
                    {/* <ButtonGroup aria-label="Export Buttons"> */}
                    <CSVLink data={csvData} filename={"Office-data.csv"} className="ms-1">
                        <Button variant="secondary">CSV</Button>
                    </CSVLink>
                    <Button variant="secondary" onClick={handleExcel} className="ms-1">
                        Excel
                    </Button>
                    <Button variant="secondary" onClick={handlePdf} className="ms-1">
                        PDF
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => window.print()}
                        className="ms-1"
                    >
                        Print
                    </Button>
                    {/* </ButtonGroup> */}
                </Col>

                {/* Search Input */}
                <Col md={4} className=" d-flex">
                    <InputGroup className="mb-3  ">
                        <Form.Control
                            type="text"
                            placeholder="Search for ...."
                            value={searchTerm}
                            className="ms-2"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={handleKeyPress}
                            onChangeCapture={handleSearch}
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Text id="basic-addon2" className="bg-secondary">
                            <FaSearch className="text-white" />
                        </InputGroup.Text>
                    </InputGroup>
                </Col>

                {/* Table */}
                <Col md={12} lg={12} lx={12} lxx={12}>
                    <div style={{ overflowX: "auto" }}>
                        <Table striped bordered hover id="printable-table">
                            <thead>
                                <tr>
                                    <th>Sr.No</th>
                                    <th>Office Name</th>
                                    <th>City Name</th>
                                    <th>Address</th>
                                    <th className="no-print">Status</th>
                                    <th className="no-print text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((product, index) => {
                                    return (
                                        <tr key={product._id}>
                                            <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                            <td>{product.user_name}</td>
                                            <td>{product.course_name} </td>
                                            <td>{product.trainer_name} </td>
                                            <td className="no-print">{product.status}</td>
                                            <td className="no-print d-flex justify-content-evenly">
                                                <Button
                                                    variant="warning"
                                                    onClick={() => handleEdit(product)}
                                                >
                                                    <GrEdit />
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => deletedata(product._id)}
                                                >
                                                    <AiFillDelete />
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>
                </Col>

                {/* Pagination */}
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

export default Feedback;
