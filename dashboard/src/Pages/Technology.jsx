import axios from "axios";
import React, { useEffect, useState } from "react";
import {
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
// import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import Modal from "react-bootstrap/Modal";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaSearch } from "react-icons/fa";

const Technology = () => {
  const [show, setShow] = useState(false);
  // const handleClose = () => {
  //   if ( name || status !== "active") {
  //     if (window.confirm("Are you sure you want to discard changes?")) {
  //       setName("");
  //       setStatus("active");
  //       setShow(false);
  //     }
  //   } else {
  //     setShow(false);
  //   }
  // };
  const handleShow = () => setShow(true);

  const [userData, setUserData] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust as needed
  // const navigate = useNavigate();

  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active"); // Default status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Search input value
  const [editingId, setEditingId] = useState(null); // Track which ID is being edited
  const [errorMessage, setErrorMessage] = useState("");

  const capitalizeFirstLetter = (str) => {
    if (!str) return str;
    return str
      .split(' ') // Split the string into words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(' '); // Join them back together
  };

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
      .get("http://localhost:8000/getdata")
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
    setName("");
    setStatus("Active");
    setEditingId(null); // Reset editing state
    setErrorMessage("");
  };

  // const handleShow = () => setShow(true);

  // Add or Update Technology
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newData = {
      name: capitalizeFirstLetter(name),
      status: capitalizeFirstLetter(status),
    };

    if (editingId) {
      // Update existing technology
      axios
        .put(`http://localhost:8000/UpdateTechnology/${editingId}`, newData)
        .then(() => {
          alert("Technology Updated Successfully!");
          showUsers();
          handleClose();
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            setErrorMessage("College is already exist.."); // Set error message
          } else {
            console.error(err);
          }
        })
        .finally(() => setIsSubmitting(false));
    } else {
      // Add new technology
      axios
        .post("http://localhost:8000/technologypost", newData)
        .then(() => {
          alert("Technology Added Successfully!");
          showUsers();
          handleClose();
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            setErrorMessage("College is already exist.."); // Set error message
          } else {
            console.error(err);
          }
        })
        .finally(() => setIsSubmitting(false));
    }
  };

  // Delete Technology
  const deletedata = (_id) => {
    axios
      .delete(`http://localhost:8000/deleteTechnology/${_id}`)
      .then(() => {
        alert("Are you sure you want to delete this record?");
        showUsers();
      })
      .catch((err) => console.error(err));
  };

  // Handle Edit Click
  const handleEdit = (item) => {
    setEditingId(item._id);
    setName(item.name);
    setStatus(item.status);
    setShow(true);
  };

  // Export to Excel
  const handleExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      userData.map((a, index) => ({
        "Sr.No": index + 1,
        "Technology Name": a.name,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Technology Data");
    XLSX.writeFile(workbook, "technology-data.xlsx");
  };

  // Export to PDF
  const handlePdf = () => {
    const doc = new jsPDF();
    doc.text("Technology Data", 14, 22);
    doc.autoTable({
      head: [["Sr.No", "Technology Name"]],
      body: userData.map((a, index) => [index + 1, a.name]),
      startY: 30,
    });
    doc.save("technology-data.pdf");
  };

  // CSV data for export
  const csvData = userData.map((a, index) => ({
    "Sr.No": index + 1,
    "Technology Name": a.name,
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
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
      <Row className="d-flex justify-content-center mt-2 pt-5">
        {/* Add City Button */}
        <h1 className="fw-bold text-center text-primary ">Technology </h1>
        <Col md={12} className="d-flex justify-content-end mb-4">
          <Button variant="primary" onClick={handleShow}>
            Add Technology
          </Button>
        </Col>

        {/* Add Technology Modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Technology</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={12}>
                  <Form.Label>Technology Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Technology Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Col>

                {/* Display Error Message */}
                {errorMessage && (
                  <Col md={12} className="mt-2">
                    <div style={{ color: "red" }}>{errorMessage}</div>
                  </Col>
                )}

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
        <Col md={8} className=" button  ">
          {/* <ButtonGroup aria-label="Export Buttons"> */}
          <CSVLink data={csvData} filename={"technology-data.csv"} className="">
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
            <InputGroup.Text id="basic-addon2" className=" bg-primary ">
              <FaSearch className="text-white" />
            </InputGroup.Text>
          </InputGroup>
        </Col>

        {/* table */}
        <Col md={12} lg={12} lx={12} lxx={12}>
          <div style={{ overflowX: "auto" }}>
            <Table striped bordered hover id="printable-table">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Technology Name</th>
                  <th className="no-print">Status</th>
                  <th className="no-print text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((a, index) => (
                  <tr key={index}>
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td>{a.name}</td>
                    <td className="no-print">{a.status}</td>
                    <td className="no-print d-flex justify-content-evenly">
                      <Button variant="warning" onClick={() => handleEdit(a)}>
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

export default Technology;
