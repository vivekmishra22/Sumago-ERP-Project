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

const Projects = () => {
  const [show, setShow] = useState(false);

  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust as needed

  const [projectTitle, setProjectTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [description, setDescription] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [status, setStatus] = useState("Pending"); // Default status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Search input value
  const [editingId, setEditingId] = useState(null); // Track which ID is being edited
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch Data from API
  useEffect(() => {
    showProjects();
  }, []);

  const showProjects = () => {
    axios
      .get("http://localhost:8000/getProject") // Update endpoint
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
    setProjectTitle("");
    setStartDate("");
    setDescription("");
    setCompletionDate("");
    setStatus("Pending");
    setEditingId(null); // Reset editing state
    setErrorMessage("");
  };

  // Handle Modal Show
  const handleShow = () => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    setStartDate(currentDate); // Set startDate to current date
    setShow(true);
  };

  // Add or Update Project
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newData = {
      projectTitle,
      startDate,
      description,
      completionDate,
      status,
    };

    if (editingId) {
      // Update existing Project
      axios
        .put(`http://localhost:8000/updateProject/${editingId}`, newData) // Update endpoint
        .then(() => {
          alert("Project Updated Successfully!");
          showProjects();
          handleClose();
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            setErrorMessage("Project already exists."); // Set error message
          } else {
            console.error(err);
          }
        })
        .finally(() => setIsSubmitting(false));
    } else {
      // Add new Project
      axios
        .post("http://localhost:8000/addProject", newData) // Update endpoint
        .then(() => {
          alert("Project Added Successfully!");
          showProjects();
          handleClose();
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            setErrorMessage("Project already exists."); // Set error message
          } else {
            console.error(err);
          }
        })
        .finally(() => setIsSubmitting(false));
    }
  };

  // Delete Project
  const deleteProject = (_id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      axios
        .delete(`http://localhost:8000/deleteProject/${_id}`) // Update endpoint
        .then(() => {
          alert("Project Deleted");
          showProjects();
        })
        .catch((err) => console.error(err));
    }
  };

  // Handle Edit Click
  const handleEdit = (item) => {
    setEditingId(item._id);
    setProjectTitle(item.projectTitle);
    setStartDate(item.startDate.split("T")[0]); // Format to YYYY-MM-DD
    setDescription(item.description);
    setCompletionDate(item.completionDate.split("T")[0]); // Format to YYYY-MM-DD
    setStatus(item.status);
    setShow(true);
  };

  // Export to Excel
  const handleExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      userData.map((a, index) => ({
        "Sr.No": index + 1,
        "Project Title": a.projectTitle,
        "Start Date": a.startDate.split("T")[0], // Format to YYYY-MM-DD
        "Description": a.description,
        "Completion Date": a.completionDate.split("T")[0], // Format to YYYY-MM-DD
        "Status": a.status,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Project Data");
    XLSX.writeFile(workbook, "Project-data.xlsx");
  };

  // Export to PDF
  const handlePdf = () => {
    const doc = new jsPDF();
    doc.text("Project Data", 14, 22);
    doc.autoTable({
      head: [["Sr.No", "Project Title", "Start Date", "Description", "Completion Date", "Status"]],
      body: userData.map((a, index) => [
        index + 1,
        a.projectTitle,
        a.startDate.split("T")[0], // Format to YYYY-MM-DD
        a.description,
        a.completionDate.split("T")[0], // Format to YYYY-MM-DD
        a.status,
      ]),
      startY: 30,
    });
    doc.save("Project-data.pdf");
  };

  // CSV data for export
  const csvData = userData.map((a, index) => ({
    "Sr.No": index + 1,
    "Project Title": a.projectTitle,
    "Start Date": a.startDate.split("T")[0], // Format to YYYY-MM-DD
    "Description": a.description,
    "Completion Date": a.completionDate.split("T")[0], // Format to YYYY-MM-DD
    "Status": a.status,
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
        item.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
      showProjects(); // Reset the table data to the original data
    }
  }, [searchTerm]);

  return (
    <Container className="d-flex justify-content-end">
      <Row className="d-flex justify-content-center mt-2 pt-5">
        <Row>
          <Col md={4}>
            <Breadcrumb>
              <Breadcrumb.Item href="dashboard">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Projects</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col md={8} className="d-flex justify-content-end mb-4">
            <Button variant="primary" onClick={handleShow}>
              Add Project
            </Button>
          </Col>
        </Row>

        {/* Add Project Modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingId ? "Update Project" : "Add Project"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={12}>
                  <Form.Label>Project Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Project Title"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    required
                  />
                </Col>
                <Col md={12} className="mt-3">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    readOnly // Make the field read-only
                  />
                </Col>
                <Col md={12} className="mt-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </Col>
                <Col md={12} className="mt-3">
                  <Form.Label>Completion Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={completionDate}
                    onChange={(e) => setCompletionDate(e.target.value)}
                    required
                  />
                </Col>
                <Col md={12} className="mt-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Incomplete">Incomplete</option>
                    <option value="Complete">Complete</option>
                    <option value="Not Completed">Not Completed</option>
                  </Form.Select>
                </Col>
                {errorMessage && (
                  <Col md={12} className="mt-2">
                    <div style={{ color: "red" }}>{errorMessage}</div>
                  </Col>
                )}
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
          <CSVLink data={csvData} filename={"Project-data.csv"} className="">
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
        <Col md={12} lg={12} lx={12} lxx={12}>
          <div style={{ overflowX: "auto" }}>
            <Table striped bordered hover id="printable-table">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Project Title</th>
                  <th>Start Date</th>
                  <th>Description</th>
                  <th>Completion Date</th>
                  <th>Status</th>
                  <th className="no-print text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((a, index) => (
                  <tr key={index}>
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td>{a.projectTitle}</td>
                    <td>{a.startDate.split("T")[0]}</td> {/* Format to YYYY-MM-DD */}
                    <td>{a.description}</td>
                    <td>{a.completionDate.split("T")[0]}</td> {/* Format to YYYY-MM-DD */}
                    <td>{a.status}</td>
                    <td className="no-print d-flex justify-content-evenly">
                      <Button variant="warning" onClick={() => handleEdit(a)}>
                        <GrEdit />
                      </Button>
                      <Button variant="danger" onClick={() => deleteProject(a._id)}>
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

export default Projects;