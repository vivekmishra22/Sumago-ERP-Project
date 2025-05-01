import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Col, Container, Form, InputGroup, Row, Table, } from "react-bootstrap";
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

const City = () => {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [city_name, setCityName] = useState("");
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
      .get("http://localhost:8000/getdataCity")
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleClose = () => {
    setShow(false);
    setCityName("");
    setStatus("Active");
    setEditingId(null);
    setErrorMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // const newData = { city_name, status };

    const newData = {
      city_name: capitalizeFirstLetter(city_name),
      status: capitalizeFirstLetter(status),
    };

    if (editingId) {
      axios
        .put(`http://localhost:8000/UpdateCity/${editingId}`, newData)
        .then(() => {
          alert("City Updated Successfully!");
          showUsers();
          handleClose();
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            setErrorMessage("City already exists.");
          } else {
            console.error(err);
          }
        })
        .finally(() => setIsSubmitting(false));
    } else {
      axios
        .post("http://localhost:8000/addCity", newData)
        .then(() => {
          alert("City Added Successfully!");
          showUsers();
          handleClose();
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            setErrorMessage("City already exists.");
          } else {
            console.error(err);
          }
        })
        .finally(() => setIsSubmitting(false));
    }
  };

  const deletedata = (_id) => {
    axios
      .delete(`http://localhost:8000/deleteCity/${_id}`)
      .then(() => {
        alert("Are you sure you want to delete this record?");
        showUsers();
      })
      .catch((err) => console.error(err));
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setCityName(item.city_name);
    setStatus(item.status);
    setShow(true);
    setErrorMessage("");
  };

  const handleExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      userData.map((a, index) => ({
        "Sr.No": index + 1,
        "City Name": a.city_name,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "City Data");
    XLSX.writeFile(workbook, "City-data.xlsx");
  };

  const handlePdf = () => {
    const doc = new jsPDF();
    doc.text("City Data", 14, 22);
    doc.autoTable({
      head: [["Sr.No", "City Name"]],
      body: userData.map((a, index) => [index + 1, a.city_name]),
      startY: 30,
    });
    doc.save("City-data.pdf");
  };

  const csvData = userData.map((a, index) => ({
    "Sr.No": index + 1,
    "City Name": a.city_name,
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
        item.city_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUserData(filteredData);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (searchTerm === "") {
      showUsers();
    }
  }, [searchTerm]);

  return (
    <Container className="d-flex justify-content-end">
      <Row className="d-flex justify-content-center mt-2 pt-5">
        {/* <h1 className="fw-bold text-center text-primary">City</h1> */}
        <Row>
          <Col md={4}>
            <Breadcrumb>
              <Breadcrumb.Item href="dashboard">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>City</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col md={8} className="d-flex justify-content-end mb-4">
            <Button variant="primary" onClick={() => setShow(true)}>
              Add City
            </Button>
          </Col>
        </Row>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingId ? "Update City" : "Add City"} {/* Conditional title */}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={12}>
                  <Form.Label>City Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter City Name"
                    value={city_name}
                    onChange={(e) => setCityName(e.target.value)}
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

        {/* <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add City</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={12}>
                  <Form.Label>City Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter City Name"
                    value={city_name}
                    onChange={(e) => setCityName(e.target.value)}
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
        </Modal> */}

        <Col md={8}>
          <CSVLink data={csvData} filename={"City-data.csv"}>
            <Button variant="secondary">CSV</Button>
          </CSVLink>
          <Button variant="secondary" onClick={handleExcel} className="ms-1">
            Excel
          </Button>
          <Button variant="secondary" onClick={handlePdf} className="ms-1">
            PDF
          </Button>
          <Button variant="secondary" onClick={() => window.print()} className="ms-1">
            Print
          </Button>
        </Col>

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
            />
            <InputGroup.Text id="basic-addon2" className="bg-secondary">
              <FaSearch className="text-white" />
            </InputGroup.Text>
          </InputGroup>
        </Col>


        <Col md={12} lg={12} xl={12} xxl={12} id="printable">
          <div style={{ overflowX: "auto" }}>
            <Table striped bordered hover id="printable-table">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>City Name</th>
                  <th className="no-print">Status</th>
                  <th className="no-print text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((a, index) => (
                  <tr key={index}>
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td>{a.city_name}</td>
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

export default City;
