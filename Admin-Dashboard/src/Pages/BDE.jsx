
import React, { useEffect, useState } from "react";
import { Button,Col,Container, Form,InputGroup,Row,Table,Breadcrumb} from "react-bootstrap";
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

const BDE = () => {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [designation, setDesignation] = useState("");
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
      .get("http://localhost:8000/getbde",
        {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      }

      )
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  // };
  // axios
  // .get("http://localhost:8000/getusers", {
  //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  // })
  // .then((res) => {
  //   console.log("API Response:", res.data); // Debugging log
  //   setUserData(res.data.data || []); // Fallback to empty array if undefined
  // })
  // .catch((err) => {
  //   console.error("Error fetching users:", err);
  //   setUserData([]); // Ensure it's always an array
  // });
};

  const handleClose = () => {
    setShow(false);
    setFname("");
    setLname("");
    setEmail("");
    setPassword("");
    setDesignation("");


    setStatus("Active");
    setEditingId(null);
    setErrorMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // const newData = { city_name, status };

    const newData = {
      fname: capitalizeFirstLetter(fname),
      lname: capitalizeFirstLetter(lname),
      email,
      password,
      designation,
      status: capitalizeFirstLetter(status),
    };

     if (editingId) {
      axios
        .put(`http://localhost:8000/Updatebde/${editingId}`, newData,

          {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        )
        .then(() => {
          alert("BDE Updated Successfully!");
          showUsers();
          handleClose();
        })
        .catch((err) => console.error(err))
        .finally(() => setIsSubmitting(false));
    } else {
      axios
        .post("http://localhost:8000/registerbde", newData,

          {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        )
        .then(() => {
          alert("User Added Successfully!");
          showUsers();
          handleClose();
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            setErrorMessage("User already exists.");
          } else {
            console.error(err);
          }
        })
        .finally(() => setIsSubmitting(false));
    }
  };

  const deletedata = (_id) => {
    axios
      .delete(`http://localhost:8000/deletebde/${_id}`)
      .then(() => {
        alert("Are you sure you want to delete this user?");
        showUsers();
      })
      .catch((err) => console.error(err));
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFname(item.fname);
    setLname(item.lname);
    setEmail(item.email);
    setDesignation(item.designation);
     setPassword(item.password);
    setStatus(item.status);
    setShow(true);
    setErrorMessage("");
  };

  const handleExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      userData.map((a, index) => ({
        "Sr.No": index + 1,
        "First Name": a.fname,
        "Last Name": a.lname,
        "Email":a.email,
        "Designation":a.designation
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "User Data");
    XLSX.writeFile(workbook, "User-data.xlsx");
  };

  const handlePdf = () => {
    const doc = new jsPDF();
    doc.text("User Data", 14, 22);
    doc.autoTable({
      head: [["Sr.No", "First Name","Last Name","Email ID","Designation"]],
      body: userData.map((a, index) => [index + 1, a.fname,a.lname,a.email,a.designation,a.status]),
      startY: 30,
    });
    doc.save("User-data.pdf");
  };

  const csvData = userData.map((a, index) => ({
    "Sr.No": index + 1,
    "First Name": a.fname,
    "Last Name": a.lname,
        "Email":a.email,
        "Designation":a.designation
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
        item.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        {/* <h1 className="fw-bold text-center text-secondary">City</h1>
        <Col md={12} className="d-flex justify-content-end mb-4">
          <Button variant="primary" onClick={() => setShow(true)}>
            Add City
          </Button>
        </Col> */}

        <Row>
          <Col md={4}>
            <Breadcrumb>
              <Breadcrumb.Item href="dashboard">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>BDE</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col md={8} className="d-flex justify-content-end mb-4">
            <Button variant="primary" onClick={() => setShow(true)}>
              Add BDE
            </Button>
          </Col>
        </Row>


        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add BDE</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              
                <Row>
                <Col md={6}>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter first Name"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    required
                  /></Col>
                  <Col md={6}>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter last Name"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    required
                  />
                </Col></Row>
                {errorMessage && (
                  <Col md={12} className="mt-2">
                    <div style={{ color: "red" }}>{errorMessage}</div>
                  </Col>
                )}
                <Row>
                <Col md={12} className=" mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Col>

                <Col md={12} className=" mt-3">
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter designation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    required
                  />
                </Col>
                <Col md={12} className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

{/* downlod button */}
        <Col md={8}>
          <CSVLink data={csvData} filename={"User-data.csv"}>
            <Button className="btn-secondary">CSV</Button>
          </CSVLink>
          <Button onClick={handleExcel} className="ms-1 btn-secondary">
            Excel
          </Button>
          <Button onClick={handlePdf} className="ms-1 btn-secondary">
            PDF
          </Button>
          <Button onClick={() => window.print()} className="ms-1 btn-secondary">
            Print
          </Button>
        </Col>

        {/* Search */}
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

        {/* table */}
        <Col md={12} lg={12} xl={12} xxl={12}>
          <div style={{ overflowX: "auto" }}>
            <Table striped bordered hover id="printable-table">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                   <th>Designation</th> 
                   <th>Password</th>
                  <th className="no-print">Status</th>
                  <th className="no-print text-center">Action</th> 
                </tr>
              </thead>
              <tbody>
                {currentItems.map((a, index) => (
                  <tr key={index}>
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td>{a.fname}</td>
                    <td>{a.lname}</td>
                    <td>{a.email}</td>
                     <td>{a.designation}</td> 
                     <td>{a.password}</td>

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

export default BDE;