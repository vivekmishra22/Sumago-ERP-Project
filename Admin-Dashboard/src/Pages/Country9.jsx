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

const Country = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust as needed
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [status, setStatus] = useState("Active"); // Default status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Search input value
  const [editingId, setEditingId] = useState(null); // Track which ID is being edited

  const capitalizeFirstLetter = (str) => {
    if (!str) return str;
    return str
      .split(' ') // Split the string into words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(' '); // Join them back together
  };

  // Fetch Data from API
  useEffect(() => {
    showUsers();
  }, []);

  const showUsers = () => {
    axios
      .get("http://localhost:8000/getdataCountry")
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
    setCountry("");
    setState("");
    setStatus("Active");
    setEditingId(null); // Reset editing state
  };

  // Add or Update Country
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newData = {
      country: capitalizeFirstLetter(country),
      state: capitalizeFirstLetter(state),
      status: capitalizeFirstLetter(status)
    };

    if (editingId) {
      // Update existing Country
      axios
        .put(`http://localhost:8000/UpdateCountry/${editingId}`, newData)
        .then(() => {
          alert("Country Updated Successfully!");
          showUsers();
          handleClose();
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => setIsSubmitting(false));
    } else {
      // Add new Country
      axios
        .post("http://localhost:8000/addCountry", newData)
        .then(() => {
          alert("Country Added Successfully!");
          showUsers();
          handleClose();
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => setIsSubmitting(false));
    }
  };

  // Delete Country
  const deletedata = (_id) => {
    axios
      .delete(`http://localhost:8000/deleteCountry/${_id}`)
      .then(() => {
        alert("Are you sure you want to delete this record?");
        showUsers();
      })
      .catch((err) => console.error(err));
  };

  // Handle Edit Click
  const handleEdit = (item) => {
    setEditingId(item._id);
    setCountry(item.country);
    setState(item.state);
    setStatus(item.status);
    setShow(true);
  };

  // Export to Excel
  const handleExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      userData.map((a, index) => ({
        "Sr.No": index + 1,
        "Country Name": a.country,
        "State" : a.state
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Country Data");
    XLSX.writeFile(workbook, "Country-data.xlsx");
  };

  // Export to PDF
  const handlePdf = () => {
    const doc = new jsPDF();
    doc.text("Country Data", 14, 22);
    doc.autoTable({
      head: [["Sr.No", "Country Name", "State"]],
      body: userData.map((a, index) => [index + 1, a.country , a.state]),
      startY: 30,
    });
    doc.save("Country-data.pdf");
  };

  // CSV data for export
  const csvData = userData.map((a, index) => ({
    "Sr.No": index + 1,
    "Country Name": a.country,
    "State": a.state
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
        item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.state.toLowerCase().includes(searchTerm.toLowerCase())||
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
        <Row>
          <Col md={4}>
        <Breadcrumb>
      <Breadcrumb.Item href="/Head/">Home</Breadcrumb.Item>
      <Breadcrumb.Item active>Country</Breadcrumb.Item>
    </Breadcrumb>
    </Col>
    <Col md={8} className="d-flex justify-content-end mb-4">
          <Button variant="primary" onClick={handleShow}>
            Add Country
          </Button>
        </Col>
    </Row>

        {/* Add Country Modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> {editingId ? "Update Country" : "Add Country"} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={12}>
                  <Form.Label>Country Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Country Name"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                </Col>

                <Col md={12}>
                  <Form.Label>State Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter state Name"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                </Col>
                {/* {errorMessage && (
                  <Col md={12} className="mt-2">
                    <div style={{ color: "red" }}>{errorMessage}</div>
                  </Col>
                )} */}
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
        <Col md={8}>
          {/* <ButtonGroup aria-label="Export Buttons"> */}
          <CSVLink data={csvData} filename={"Country-data.csv"} className="">
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
            <InputGroup.Text id="basic-addon2" className=" bg-secondary ">
              <FaSearch className="text-white" />
            </InputGroup.Text>
          </InputGroup>
        </Col>

        {/* Table */}
        <Col md={12} lg={12} lx={12} lxx={12} >
          <div style={{ overflowX: "auto" }}>
            <Table striped bordered hover id="printable-table">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Country Name</th>
                  <th>State Name</th>
                  <th className="no-print">Status</th>
                  <th className="no-print text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((a, index) => (
                  <tr key={index}>
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td>{a.country}</td>
                    <td>{a.state}</td>
                    <td className="no-print ">{a.status}</td>
                    <td className="no-print  d-flex justify-content-evenly">
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

          <Col md={6} className="d-flex justify-content-end ">
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

export default Country;
