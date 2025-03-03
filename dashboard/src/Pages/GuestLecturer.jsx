import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button,  Col, Container, Form, Row, Table } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import { AiFillDelete } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import Modal from "react-bootstrap/Modal";
import jsPDF from "jspdf";
import "jspdf-autotable";

const GuestLecturer = () => {
    const navigate = useNavigate();
    
  const [show, setShow] = useState(false);
  
  const handleClose = () => {
        setguest_lecturer_name("");
        setlecture_topic_description("");
        setguest_lecture_batch("");
        setguest_lecture_date("");
        setStatus("active");
        setShow(false);
      
  };
  const handleShow = () => setShow(true);

  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust as needed

  const [guest_lecturer_name,  setguest_lecturer_name] = useState("");
  const [lecture_topic_description, setlecture_topic_description] = useState("");
  const [guest_lecture_batch,  setguest_lecture_batch] = useState("");
  const [ guest_lecture_date, setguest_lecture_date] = useState("");
  const [status, setStatus] = useState("active"); // Default status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Search input value

  // Fetch data on component mount
  useEffect(() => {
    showUsers();
  }, []);

  // Fetch data from the API
  const showUsers = () => {
    axios
      .get("http://localhost:8000/getguestdata")
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to fetch data. Please check your network connection or try again later.");
      });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newData = {
      
        guest_lecturer_name,
        lecture_topic_description, 
        guest_lecture_batch,
         guest_lecture_date,
         status
    };

    axios
      .post("http://localhost:8000/addguest", newData)
      .then((res) => {
        console.log("Data Added:", res.data);
        alert("Guest data Added Successfully!");
        setguest_lecturer_name("");
        setlecture_topic_description("");
        setguest_lecture_batch("");
        setguest_lecture_date("");
        setStatus("active");
        handleClose();
        showUsers(); // Refresh the table
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to add data. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // Delete data
  const deletedata = (_id) => {
      axios
        .delete(`http://localhost:8000/deleteguest/${_id}`)
        .then((res) => {
          console.log("User Deleted:", res.data);
          alert("Are you sure you want to delete this record?");
          showUsers();
        })
        .catch((error) => {
          console.error("Error Deleting User:", error);
        });
  };

  

  // Export to Excel
  const handleExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      userData.map((a, index) => ({
        "Sr.No": index + 1,
        "guest_lecturer_name": a.guest_lecturer_name,
        "lecture_topic_description":a.lecture_topic_description,
        "guest_lecture_batch":a.guest_lecture_batch,
        "guest_lecture_date":a.guest_lecture_date,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Guest Lecturer Data");
    XLSX.writeFile(workbook, "guestlecturer-data.xlsx");
  };

  // Export to PDF
  const handlePdf = () => {
    const doc = new jsPDF();
    doc.text("Guest Lecturer Data", 14, 22);
    doc.autoTable({
      head: [["Sr.No", "guest_lecturer_name","lecture_topic_description","guest_lecture_batch","guest_lecture_date"]],
      body: userData.map((a, index) => [index + 1,  a.guest_lecturer_name,
        a.lecture_topic_description,
        a.guest_lecture_batch,
        a.guest_lecture_date, 
      ]),
      startY: 30,
    });
    doc.save("Guest Lecturer-data.pdf");
  };

  // CSV data for export
  const csvData = userData.map((a, index) => ({
    "Sr.No": index + 1,
    "guest_lecturer_name": a.guest_lecturer_name,
    "lecture_topic_description":a.lecture_topic_description,
    "guest_lecture_batch":a.guest_lecture_batch,
    "guest_lecture_date":a.guest_lecture_date,
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
    const filteredData = userData.filter((item) =>
      item.guest_lecturer_name.toLowerCase().includes(searchTerm.toLowerCase())||
      item.lecture_topic_description.toLowerCase().includes(searchTerm.toLowerCase())||
      item.guest_lecture_batch.toLowerCase().includes(searchTerm.toLowerCase())||
      item.guest_lecture_date.toLowerCase().includes(searchTerm.toLowerCase())||
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
        {/* Add Technology Button */}
        <Col md={12} className="d-flex justify-content-end mb-2">
          <Button variant="primary" onClick={handleShow}>
            Add Guest Lecturer
          </Button>
        </Col>

        {/* Add Technology Modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Guest Lecturer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={12}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter  Name"
                    value={guest_lecturer_name}
                    onChange={(e) =>  setguest_lecturer_name(e.target.value)}
                    required
                  />
                </Col>
                <Col md={12}>
                  <Form.Label>Lecture Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter lecture description"
                    value={lecture_topic_description}
                    onChange={(e) =>  setlecture_topic_description(e.target.value)}
                    required
                  />
                </Col>
                <Col md={12}>
                  <Form.Label>Lecture Batch</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter lecture batch"
                    value={guest_lecture_batch}
                    onChange={(e) =>  setguest_lecture_batch(e.target.value)}
                    required
                  />
                </Col>
                <Col md={12}>
                  <Form.Label>Lecture Date</Form.Label>
                  <Form.Control
                    type="Date"
                    placeholder="Enter lecture date"
                    value={guest_lecture_date}
                    onChange={(e) =>  setguest_lecture_date(e.target.value)}
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
            <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Export Buttons */}
        <Col md={6} className="">
            <CSVLink data={csvData} filename={"course-data.csv"} className="">
              <Button variant="primary">CSV</Button>
            </CSVLink>
            <Button variant="primary" onClick={handleExcel} className="ms-1">
              Excel
            </Button>
            <Button variant="primary" onClick={handlePdf} className="ms-1">
              PDF
            </Button>
            <Button variant="primary" onClick={() => window.print()} className="ms-1">
              Print
            </Button>
        </Col>

        {/* Search Input */}
        <Col md={6} className="mb-3 d-flex">
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
 
        <Col md={12} lg={12} lx={12} lxx={12} className="mt-3">
          
            <div style={{ overflowX: "auto" }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Sr.No</th>
                    <th>Guest Lecturer Name</th>
                    <th>Lecture Description</th>
                    <th>Lecture Batch </th>
                    <th>Lecture Date</th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((a, index) => (
                    <tr key={index}>
                      <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                      <td>{a.guest_lecturer_name}</td>
                      <td>{a.lecture_topic_description}</td>
                      <td>{a.guest_lecture_batch}</td>
                      <td>{a.guest_lecture_date}</td>
                      <td>{a.status}</td>
                      <td className="d-flex justify-content-evenly">
                        <Button
                          variant="warning"
                          onClick={() => navigate(`/Head/UpdateGuest/${a._id}`)}
                        >
                          <GrEdit />
                        </Button>
                        <Button variant="danger" onClick={() => deletedata(a._id)}>
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

export default GuestLecturer;