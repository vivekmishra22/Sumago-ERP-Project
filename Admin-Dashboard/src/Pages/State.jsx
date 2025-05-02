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
// import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import Modal from "react-bootstrap/Modal";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaSearch } from "react-icons/fa";

const State = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust as needed
  const [categoriesdata, setCategoriesData] = useState([]);

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
    // setLoading(true);
    axios
      .get("http://localhost:8000/getdataState")
      .then((res) => {
        setUserData(res.data.data);
        // setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        // setLoading(false);
      });

      axios
            .get("http://localhost:8000/getdataCountry")
            .then((res) => {
              const udata = res.data.data.filter((item) => item.status === "Active");
              setCategoriesData(udata);
              console.log("Categories fetched:", res.data.data);
            })
            .catch((err) => {
              console.error("Error fetching categories:", err);
            });
  };

  // Handle Modal Close
  const handleClose = () => {
    setShow(false);
    setCountry("");
    setState("");
    setStatus("Active");
    setEditingId(null); // Reset editing state
    setErrorMessage("");
  };

  // Add or Update state
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // const newData = {
    //   state,  status
    // }

    const newData = {
      country: capitalizeFirstLetter(country),
      state: capitalizeFirstLetter(state),
      status: capitalizeFirstLetter(status),
    };

    if (editingId) {
      // Update existing state
      axios
        .put(`http://localhost:8000/UpdateState/${editingId}`, newData)
        .then(() => {
          alert("state Updated Successfully!");
          showUsers();
          handleClose();
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            setErrorMessage("State is already exist.."); // Set error message
          } else {
            console.error(err);
          }
        })
        .finally(() => setIsSubmitting(false));
    } else {
      // Add new state
      axios
        .post("http://localhost:8000/addState", newData)
        .then(() => {
          alert("State Added Successfully!");
          showUsers();
          handleClose();
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            setErrorMessage("State is already exist.."); // Set error message
          } else {
            console.error(err);
          }
        })
        .finally(() => setIsSubmitting(false));
    }
  };

  // Delete state
  const deletedata = (_id) => {
    axios
      .delete(`http://localhost:8000/deleteState/${_id}`)
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
        "Country":a.country,
        "State Name": a.state,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "state Data");
    XLSX.writeFile(workbook, "state-data.xlsx");
  };

  // Export to PDF
  const handlePdf = () => {
    const doc = new jsPDF();
    doc.text("State Data", 14, 22);
    doc.autoTable({
      head: [["Sr.No", "Country", "State Name"]],
      body: userData.map((a, index) => [index + 1, a.country, a.state]),
      startY: 30,
    });
    doc.save("State-data.pdf");
  };

  // CSV data for export
  const csvData = userData.map((a, index) => ({
    "Sr.No": index + 1,
    "Country": a.country,
    "State Name": a.state,
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
        item.country.toLowerCase().includes(searchTerm.toLowerCase)||
        item.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        {/* <h1 className="fw-bold text-center text-primary mb-3">state </h1> */}
        {/* <Breadcrumb>
      <Breadcrumb.Item href="dashboard">Home</Breadcrumb.Item>
      <Breadcrumb.Item active>state</Breadcrumb.Item>
    </Breadcrumb> */}
        {/* Add state Button */}
        <Row><Col md={4}>
        <Breadcrumb>
      <Breadcrumb.Item href="/Head/">Home</Breadcrumb.Item>
      <Breadcrumb.Item active>state</Breadcrumb.Item>
    </Breadcrumb>
    </Col>
    <Col md={8} className="d-flex justify-content-end mb-4">
          <Button variant="primary" onClick={handleShow}>
            Add state
          </Button>
        </Col>
    </Row>
        {/* <Col md={6} className="d-flex justify-content-end mb-4">
          <Button variant="primary" onClick={handleShow}>
            Add state
          </Button>
        </Col> */}

        {/* Add state Modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> {editingId ? "Update state" : "Add state"} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={12}>
                                  <Form.Label className="mt-3">
                                    <b>Select Country</b>
                                  </Form.Label>
                                  <Form.Select
                                    aria-label="Select Country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    required
                                    
                                  >
                                    <option value="">Choose a Country</option>
                                    {categoriesdata.map((index) => (
                                      <option
                                        key={index._id}
                                        value={index.country}
                                      >
                                        {index.country}
                                      </option>
                                    ))}
                                  </Form.Select>
                                </Col>
                <Col md={12}>
                  <Form.Label>state Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter state Name"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                </Col>
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
        <Col md={8}>
          {/* <ButtonGroup aria-label="Export Buttons"> */}
          <CSVLink data={csvData} filename={"state-data.csv"} className="">
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
                  <th>Country</th>
                  <th>state Name</th>
                  <th className="no-print">Status</th>
                  <th className="no-print text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((a, index) => (
                  <tr key={index}>
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td>{a.country} </td>
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

export default State;
