import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import { AiFillDelete } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";
// import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import Modal from "react-bootstrap/Modal";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Education = () => {
  const [show, setShow] = useState(false);
  // const handleClose = () => {
  //   if ( education_name || status !== "active") {
  //     if (window.confirm("Are you sure you want to discard changes?")) {
  //       setEducationName("");
  //       setStatus("active");
  //       setShow(false);
  //     }
  //   } else {
  //     setShow(false);
  //   }
  // };
  const handleShow = () => setShow(true);

  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust as needed

  const [education_name, setEducationName] = useState("");
  const [status, setStatus] = useState("active"); // Default status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Search input value
  const [editingId, setEditingId] = useState(null); // Track which ID is being edited

  // Fetch data on component mount
  useEffect(() => {
    showUsers();
  }, []);

  // Fetch Data from API
  useEffect(() => {
    showUsers();
  }, []);

  const showUsers = () => {
    // setLoading(true);
    axios
      .get("http://localhost:8000/getdataEducation")
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
    setEducationName("");
    setStatus("active");
    setEditingId(null); // Reset editing state
  };


  // Add or Update Education
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newData = { education_name, status };

    if (editingId) {
      // Update existing Education
      axios
        .put(`http://localhost:8000/UpdateEducation/${editingId}`, newData)
        .then(() => {
          alert("Education Updated Successfully!");
          showUsers();
          handleClose();
        })
        .catch((err) => console.error(err))
        .finally(() => setIsSubmitting(false));
    } else {
      // Add new Education
      axios
        .post("http://localhost:8000/addEducation", newData)
        .then(() => {
          alert("Education Added Successfully!");
          showUsers();
          handleClose();
        })
        .catch((err) => console.error(err))
        .finally(() => setIsSubmitting(false));
    }
  };

  // Delete Education
  const deletedata = (_id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      axios
        .delete(`http://localhost:8000/deleteEducation/${_id}`)
        .then(() => {
          alert("Education Deleted");
          showUsers();
        })
        .catch((err) => console.error(err));
    }
  };

  // Handle Edit Click
  const handleEdit = (item) => {
    setEditingId(item._id);
    setEducationName(item.education_name);
    setStatus(item.status);
    setShow(true);
  };

  

  // Export to Excel
  const handleExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      userData.map((a, index) => ({
        "Sr.No": index + 1,
        "Education Name": a.education_name,
        Status: a.status,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Education Data");
    XLSX.writeFile(workbook, "Education-data.xlsx");
  };

  // Export to PDF
  const handlePdf = () => {
    const doc = new jsPDF();
    doc.text("Education Data", 14, 22);
    doc.autoTable({
      head: [["Sr.No", "Education ID", "Education Name", "Status"]],
      body: userData.map((a, index) => [
        index + 1,
        a.education_name,
        a.status,
      ]),
      startY: 30,
    });
    doc.save("Education-data.pdf");
  };

  // CSV data for export
  const csvData = userData.map((a, index) => ({
    "Sr.No": index + 1,
    "Education Name": a.education_name,
    Status: a.status,
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
        item.education_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
      <Row className="d-flex justify-content-center mt-5 pt-5">
        {/* Add Education Button */}
        <Col md={12} className="d-flex justify-content-end mb-2">
          <Button variant="primary" onClick={handleShow}>
            Add Education
          </Button>
        </Col>

        {/* Add Education Modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Education</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={12}>
                  <Form.Label>Education Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Education Name"
                    value={education_name}
                    onChange={(e) => setEducationName(e.target.value)}
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
          <CSVLink data={csvData} filename={"Education-data.csv"} className="">
            <Button variant="primary">CSV</Button>
          </CSVLink>
          <Button variant="primary" onClick={handleExcel} className="ms-1">
            Excel
          </Button>
          <Button variant="primary" onClick={handlePdf} className="ms-1">
            PDF
          </Button>
          <Button
            variant="primary"
            onClick={() => window.print()}
            className="ms-1"
          >
            Print
          </Button>
          {/* </ButtonGroup> */}
        </Col>

        {/* Search Input */}
        <Col md={4} className="mb-3 d-flex">
          <Form.Label>Search:</Form.Label>
          <Form.Control
            type="text"
            placeholder
            value={searchTerm}
            className="ms-2"
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            onChangeCapture={handleSearch}
          />
        </Col>

        {/* Table */}
        <Col md={12} lg={12} lx={12} lxx={12} className="mt-3">
          <h1 className="fw-bold text-center text-primary">Education Data</h1>
          {/* {loading ? (
            <p>Loading...</p>
          ) : ( */}
          <div style={{ overflowX: "auto" }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Education Name</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((a, index) => (
                  <tr key={index}>
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td>{a.education_name}</td>
                    <td>{a.status}</td>
                    <td className="d-flex justify-content-evenly">
                      <Button
                        variant="warning"
                        onClick={() => handleEdit(a)}
                      >
                        <GrEdit />
                      </Button>
                      <Button
                        variant="danger"
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
          {/* )} */}
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

export default Education;
