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

const Fee = () => {
    const [show, setShow] = useState(false);
    // const handleShow = () => setShow(true);

    const [userData, setUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Adjust as needed

    const [fee_date, setFeeDate] = useState("");
    const [course_name, setCourseName] = useState("");
    const [course_duration, setcourse_duration] = useState("");
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState("active"); // Default status
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Search input value
    const [editingId, setEditingId] = useState(null); // Track which ID is being edited
    // const [categories, setCategories] = useState([]);
    const [categoriesdata, setCategoriesData] = useState([]);



    // Fetch Data from API
    useEffect(() => {
        showUsers();
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:8000/getdataCourse")
            .then((res) => {
                const udata = res.data.data.filter((item) => item.status === 'active')
                setCategoriesData(udata);
                console.log("Categories fetched:", res.data.data);
            })
            .catch((err) => {
                console.error("Error fetching categories:", err);
            });
    }, []);

    //   useEffect(() => {
    //     axios
    //       .get("http://localhost:8000/getdataCity")
    //       .then((res) => {
    //         const udata = res.data.data.filter((item) => item.status === 'active')
    //         setCategories(udata); // Assuming the response contains a data array
    //         console.log("Categories fetched:", res.data.data);
    //       })
    //       .catch((err) => {
    //         console.error("Error fetching categories:", err);
    //       });
    //   }, []);

    const showUsers = () => {
        // setLoading(true);
        axios
            .get("http://localhost:8000/getdataFee")
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
        setCourseName("");
        setFeeDate("");
        setcourse_duration("");
        setAmount("");
        setStatus("active");
        setEditingId(null); // Reset editing state
    };

    // Add or Update Technology
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const newData = { course_name, fee_date, course_duration, amount, status };

        if (editingId) {
            // Update existing technology
            axios
                .put(`http://localhost:8000/UpdateFee/${editingId}`, newData)
                .then(() => {
                    alert("Fee Updated Successfully!");
                    showUsers();
                    handleClose();
                })
                .catch((err) => console.error(err))
                .finally(() => setIsSubmitting(false));
        } else {
            // Add new technology
            axios
                .post("http://localhost:8000/addFee", newData)
                .then(() => {
                    alert("Fee Added Successfully!");
                    showUsers();
                    handleClose();
                })
                .catch((err) => console.error(err))
                .finally(() => setIsSubmitting(false));
        }
    };

    // Delete data
    const deletedata = (_id) => {
        axios
            .delete(`http://localhost:8000/deleteFee/${_id}`)
            .then(() => {
                alert("Are you sure you want to delete this record?");
                showUsers();
            })
            .catch((err) => console.error(err));
    };

    const handleEdit = (item) => {
        setEditingId(item._id);
        setCourseName(item.course_name);
        setFeeDate(item.fee_date);
        setcourse_duration(item.course_duration);
        setAmount(item.amount);
        setStatus(item.status);
        setShow(true);
    };

    // Export to Excel
    const handleExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            userData.map((a, index) => ({
                "Sr.No": index + 1,
                "Fee Date": a.fee_date,
                "Course Name": a.course_name,
                "course_duration": a.course_duration,
                "Amount": a.amount,
            }))
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Fee Data");
        XLSX.writeFile(workbook, "Fee-data.xlsx");
    };

    // Export to PDF
    const handlePdf = () => {
        const doc = new jsPDF();
        doc.text("Fee Data", 14, 22);
        doc.autoTable({
            head: [["Sr.No", "University Name", "Fee Name", "City Name"]],
            body: userData.map((a, index) => [
                index + 1,
                a.course_name,
                a.fee_date,
                a.course_duration,
                a.amount
            ]),
            startY: 30,
        });
        doc.save("Fee-data.pdf");
    };

    // CSV data for export
    const csvData = userData.map((a, index) => ({
        "Sr.No": index + 1,
        "Fee Date": a.fee_date,
        "Course Name": a.course_name,
        "course_duration": a.course_duration,
        "Amount": a.amount,
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

    // Handle search
    const handleSearch = () => {
        const filteredData = userData.filter(
            (item) =>         // course_name, fee_date, course_duration, amount, status
                item.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.fee_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.course_duration.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.status.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setUserData(filteredData); // Update the table data
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
            <Row className="d-flex justify-content-center mt-4 pt-5">

                {/* <h1 className="text-center text-primary fw-bold mb-3">Fee</h1>


                Add Fee Button
                <Col md={12} className="d-flex justify-content-end mb-4">
                    <Button variant="primary" onClick={handleShow}>
                        Add Fee
                    </Button>
                </Col> */}

                <Row>
                    <Col md={4}>
                        <Breadcrumb>
                            <Breadcrumb.Item href="dashboard">Home</Breadcrumb.Item>
                            <Breadcrumb.Item active>Fee</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col md={8} className="d-flex justify-content-end mb-4">
                        <Button variant="primary" onClick={() => setShow(true)}>
                            Add Fee
                        </Button>
                    </Col>
                </Row>

                {/* Add Fee Modal */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {editingId ? "Update Fee" : "Add Fee"} {/* Conditional title */}
                        </Modal.Title>
                        {/* <Modal.Title>Add Fee</Modal.Title> */}
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={12} className="mt-2">
                                    <Form.Label>Fee Date</Form.Label>
                                    <Form.Control
                                        type="Date"
                                        placeholder="Enter Fee Name"
                                        value={fee_date}
                                        onChange={(e) => setFeeDate(e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col md={12}>
                                    <Form.Label className="mt-3">
                                        <b>Select Course</b>
                                    </Form.Label>
                                    <Form.Select
                                        aria-label="Select course"
                                        value={course_name}
                                        onChange={(e) => setCourseName(e.target.value)}
                                        required
                                    >
                                        <option value="">Choose a course</option>
                                        {categoriesdata.map((university) => (
                                            <option
                                                key={university._id}
                                                value={university.course_name}
                                            >
                                                {university.course_name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col md={12}>
                                    <Form.Label className="mt-3">
                                        <b>Select Duration</b>
                                    </Form.Label>
                                    <Form.Select
                                        aria-label="Select course_duration"
                                        value={course_duration}
                                        onChange={(e) => setcourse_duration(e.target.value)}
                                        required
                                    >
                                        <option value="">Choose a duration</option>
                                        {categoriesdata.map((university) => (
                                            <option
                                                key={university._id}
                                                value={university.course_duration}
                                            >
                                                {university.course_duration}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col md={12} className="mt-2">
                                    <Form.Label>Fee Amount</Form.Label>
                                    <Form.Control
                                        type="Number"
                                        placeholder="Enter Fee Amount"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col md={12} className="d-flex mt-3">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        label="Active"
                                        name="status"
                                        value="active"
                                        className="ps-5"
                                        checked={status === "active"}
                                        onChange={(e) => setStatus(e.target.value)}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Inactive"
                                        name="status"
                                        value="inactive"
                                        className="ps-5"
                                        checked={status === "inactive"}
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
                    <CSVLink
                        data={csvData}
                        filename={"Fee-data.csv"}
                        className="ms-1"
                    >
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
                <Col md={4} className="d-flex">
                    <InputGroup className="mb-3">
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
                        <InputGroup.Text id="basic-addon2" className=" bg-secondary ">
                            <FaSearch className="text-white" />
                        </InputGroup.Text>
                    </InputGroup>
                </Col>

                {/* Table */}
                <Col md={12} lg={12} lx={12} lxx={12} id="printable">
                    <div style={{ overflowX: "auto" }}>
                        <Table striped bordered hover id="printable-table">
                            <thead>
                                <tr>
                                    <th>Sr.No</th>
                                    <th>Fee Date</th>
                                    <th>Course Name</th>
                                    <th>course_duration</th>
                                    <th>Amount</th>
                                    <th className="no-print">Status</th>
                                    <th className="text-center no-print">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((product, index) => {
                                    return (
                                        <tr key={product._id}>
                                            <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                            <td>{product.fee_date}</td>
                                            <td>{product.course_name} </td>
                                            <td>{product.course_duration} </td>
                                            <td>{product.amount} </td>
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

export default Fee;