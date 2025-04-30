import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Breadcrumb,
    Button,
    Col,
    Container,
    Form,
    InputGroup,
    Row,
    Table,
} from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import { AiFillDelete } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import Modal from "react-bootstrap/Modal";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaSearch } from "react-icons/fa";

const Document = () => {
    const [show, setShow] = useState(false);

    const [userData, setUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const [studentName, setStudentName] = useState("");
    const [aadharCard, setAadharCard] = useState(null);
    const [panCard, setPanCard] = useState(null);
    const [tenthMarksheet, setTenthMarksheet] = useState(null);
    const [twelfthMarksheet, setTwelfthMarksheet] = useState(null);
    const [graduationMarksheet, setGraduationMarksheet] = useState(null);
    const [postGraduationMarksheet, setPostGraduationMarksheet] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Search input value
    const [editingId, setEditingId] = useState(null); // Track which ID is being edited
    //   const [errorMessage, setErrorMessage] = useState("");

    // Fetch Data from API
    useEffect(() => {
        showDocuments();
    }, []);

    const showDocuments = () => {
        axios
            .get("http://localhost:8000/getdataDocuments")
            .then((res) => {
                setUserData(res.data.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    // Handle Modal Close
    const handleClose = () => {
        setShow(false);
        setStudentName("");
        setAadharCard(null);
        setPanCard(null);
        setTenthMarksheet(null);
        setTwelfthMarksheet(null);
        setGraduationMarksheet(null);
        setPostGraduationMarksheet(null);
        setEditingId(null); // Reset editing state
    };

    // Handle Modal Show
    const handleShow = () => {
        setShow(true);
    };

    // Add or Update Document
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // const newData = {
        //     studentName,
        //     aadharCard,
        //     panCard,
        //     tenthMarksheet,
        //     twelfthMarksheet,
        //     graduationMarksheet,
        //     postGraduationMarksheet
        // };

        const formData = new FormData();
        formData.append("studentName", studentName);
        formData.append("aadharCard", aadharCard);
        formData.append("panCard", panCard);
        formData.append("tenthMarksheet", tenthMarksheet);
        formData.append("twelfthMarksheet", twelfthMarksheet);
        formData.append("graduationMarksheet", graduationMarksheet);
        formData.append("postGraduationMarksheet", postGraduationMarksheet);


        if (editingId) {
            // Update existing Document
            axios
                .put(`http://localhost:8000/putdataDocuments/${editingId}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then(() => {
                    alert("Document Updated Successfully!");
                    showDocuments();
                    handleClose();
                })
                .catch((err) => console.error(err))
                .finally(() => setIsSubmitting(false));
        } else {
            // Add new Document
            axios
                .post("http://localhost:8000/postdataDocuments", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then(() => {
                    alert("Document Added Successfully!");
                    showDocuments();
                    handleClose();
                })
                .catch((err) => console.error(err))
                .finally(() => setIsSubmitting(false));
        }
    };

    // Delete Document
    const deleteDocument = (_id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            axios
                .delete(`http://localhost:8000/deletedataDocuments/${_id}`) // Update endpoint
                .then(() => {
                    alert("Document Deleted");
                    showDocuments();
                })
                .catch((err) => console.error(err));
        }
    };

    // Handle Edit Click
    const handleEdit = (item) => {
        setEditingId(item._id);
        setStudentName(item.studentName);
        setAadharCard(item.aadharCard);
        setPanCard(item.panCard);
        setTenthMarksheet(item.tenthMarksheet);
        setTwelfthMarksheet(item.twelfthMarksheet);
        setGraduationMarksheet(item.graduationMarksheet);
        setPostGraduationMarksheet(item.postGraduationMarksheet);
        setShow(true);
    };

    // Export to Excel
    const handleExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            userData.map((a, index) => ({
                "Sr.No": index + 1,
                "Student Name": a.studentName,
                "Aadhar Card": a.aadharCard,
                "PanCard": a.panCard,
                "10th": a.tenthMarksheet,
                "12th": a.twelfthMarksheet,
                "Graduation": a.graduationMarksheet,
                "Post Graduation": a.postGraduationMarksheet
            }))
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Document Data");
        XLSX.writeFile(workbook, "Document-data.xlsx");
    };

    // Export to PDF
    const handlePdf = () => {
        const doc = new jsPDF();
        doc.text("Document Data", 14, 22);
        doc.autoTable({
            head: [["Sr.No", "Student Name", "Aadhar Card", "Start Date", "PanCard", "10th", "12th", "Graduation", "Post Graduation"]],
            body: userData.map((a, index) => [
                index + 1,
                a.studentName,
                a.aadharCard,
                a.panCard,
                a.tenthMarksheet,
                a.twelfthMarksheet,
                a.graduationMarksheet,
                a.postGraduationMarksheet
            ]),
            startY: 30,
        });
        doc.save("Document-data.pdf");
    };

    // CSV data for export
    const csvData = userData.map((a, index) => ({
        "Sr.No": index + 1,
        "Student Name": a.studentName,
        "Aadhar Card": a.aadharCard,
        "PanCard": a.panCard,
        "10th": a.tenthMarksheet,
        "12th": a.twelfthMarksheet,
        "Graduation": a.graduationMarksheet,
        "Post Graduation": a.postGraduationMarksheet
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
            (item) =>
                // item.aadharCard.toLowerCase().includes(searchTerm.toLowerCase()) ||
                // item.panCard.toLowerCase().includes(searchTerm.toLowerCase()) ||
                // item.tenthMarksheet.toLowerCase().includes(searchTerm.toLowerCase()) ||
                // item.twelfthMarksheet.toLowerCase().includes(searchTerm.toLowerCase()) ||
                // item.graduationMarksheet.toLowerCase().includes(searchTerm.toLowerCase()) ||
                // item.postGraduationMarksheet.toLowerCase().includes(searchTerm.toLowerCase())
                item.studentName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setUserData(filteredData); // Update the table data
    };

    // Reset search when the input is cleared
    useEffect(() => {
        if (searchTerm === "") {
            showDocuments(); // Reset the table data to the original data
        }
    }, [searchTerm]);

    return (
        <Container className="d-flex justify-content-end">
            <Row className="d-flex justify-content-center mt-2 pt-5">
                <Row>
                    <Col md={4}>
                        <Breadcrumb>
                            <Breadcrumb.Item href="dashboard">Home</Breadcrumb.Item>
                            <Breadcrumb.Item active>Documents</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col md={8} className="d-flex justify-content-end mb-4">
                        <Button variant="primary" onClick={handleShow}>
                            Add Document
                        </Button>
                    </Col>
                </Row>

                {/* Add Document Modal */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {editingId ? "Update Document" : "Add Document"}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={12}>
                                    <Form.Label>Student Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Document Title"
                                        value={studentName}
                                        onChange={(e) => setStudentName(e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="mb-3" controlId="formBasicDocument">
                                        <Form.Label>Aadhar Card</Form.Label>
                                        <Form.Control type="file" name="aadharCard"
                                            onChange={(e) => setAadharCard(e.target.files[0])} />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="mb-3" controlId="formBasicDocument">
                                        <Form.Label>Pan Card</Form.Label>
                                        <Form.Control type="file" name="panCard"
                                            onChange={(e) => setPanCard(e.target.files[0])} />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="mb-3" controlId="formBasicDocument">
                                        <Form.Label>10th Marksheet</Form.Label>
                                        <Form.Control type="file" name="tenthMarksheet"
                                            onChange={(e) => setTenthMarksheet(e.target.files[0])} />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="mb-3" controlId="formBasicDocument">
                                        <Form.Label>12th Marksheet</Form.Label>
                                        <Form.Control type="file" name="twelfthMarksheet"
                                            onChange={(e) => setTwelfthMarksheet(e.target.files[0])} />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="mb-3" controlId="formBasicDocument">
                                        <Form.Label>Graduation Marksheet</Form.Label>
                                        <Form.Control type="file" name="graduationMarksheet"
                                            onChange={(e) => setGraduationMarksheet(e.target.files[0])} />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="mb-3" controlId="formBasicDocument">
                                        <Form.Label>PG Marksheet</Form.Label>
                                        <Form.Control type="file" name="graduationMarksheet"
                                            onChange={(e) => setPostGraduationMarksheet(e.target.files[0])} />
                                    </Form.Group>
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
                    <CSVLink data={csvData} filename={"Document-data.csv"} className="">
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
                <Col md={12} lg={12} lx={12} lxx={12}>
                    <div style={{ overflowX: "auto" }}>
                        <Table striped bordered hover id="printable-table">
                            <thead>
                                <tr>
                                    <th>Sr.No</th>
                                    <th>Student Name</th>
                                    <th>Aadhar Card</th>
                                    <th>Pan Card</th>
                                    <th>10th Marksheet</th>
                                    <th>12th Marksheet</th>
                                    <th>Gradution Marksheet</th>
                                    <th>PG Marksheet</th>
                                    <th className="no-print text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((a, index) => (
                                    <tr key={index}>
                                        <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                        <td>{a.studentName}</td>
                                        {/* <td>{a.aadharCard}</td> */}
                                        <td>
                                            <img src={`http://localhost:8000/documents_Image/${a.aadharCard}`} alt='aadharCard' height={50} width={50} />  
                                        </td>
                                        <td>
                                            <img src={`http://localhost:8000/documents_Image/${a.panCard}`} alt='aadharCard' height={50} width={50} />  
                                        </td>
                                        <td>
                                            <img src={`http://localhost:8000/documents_Image/${a.tenthMarksheet}`} alt='aadharCard' height={50} width={50} /> 
                                        </td>
                                        <td>
                                            <img src={`http://localhost:8000/documents_Image/${a.twelfthMarksheet}`} alt='aadharCard' height={50} width={50} /> 
                                        </td>
                                        <td>
                                            <img src={`http://localhost:8000/documents_Image/${a.graduationMarksheet}`} alt='aadharCard' height={50} width={50} />  
                                        </td>
                                        <td>
                                            <img src={`http://localhost:8000/documents_Image/${a.postGraduationMarksheet}`} alt='aadharCard' height={50} width={50} /> 
                                        </td>

                                        {/* <td>{a.panCard}</td>
                                        <td>{a.tenthMarksheet}</td>
                                        <td>{a.twelfthMarksheet}</td>
                                        <td>{a.graduationMarksheet}</td>
                                        <td>{a.postGraduationMarksheet}</td> */}
                                        <td className="no-print d-flex justify-content-evenly">
                                            <Button variant="warning" onClick={() => handleEdit(a)}>
                                                <GrEdit />
                                            </Button>
                                            <Button variant="danger" onClick={() => deleteDocument(a._id)}>
                                                <AiFillDelete />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
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

export default Document;