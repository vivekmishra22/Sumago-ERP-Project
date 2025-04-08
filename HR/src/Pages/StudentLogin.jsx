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
  Breadcrumb,
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

const StudentLogin = () => {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [categoriesdata, setCategoriesData] = useState([]);
  const [name, setCourse_Name] = useState("");
  const [student_name, setStudent_Name] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("Active");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  // const [selectedStudent, setSelectedStudent] = useState(null);
  const [error, setError] = useState("");

  const handleClose = () => {
    setStudent_Name("");
    setCourse_Name("");
    setDate("");
    setEmail("");
    setPassword("");
    setDuration("");
    setStatus("Active");
    setEditingId(null);
    setShow(false);
  };

  const capitalizeFirstLetter = (str) => {
    if (!str) return str;
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    showUsers();
    fetchCategories();
  }, []);

  const showUsers = () => {
    axios
      .get("http://localhost:8000/get_students", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const sdata = res.data.data.filter((item) => item.status === "Active");
        setUserData(sdata);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
      });
  };

  const fetchCategories = () => {
    axios
      .get("http://localhost:8000/getinstallment")
      .then((res) => {
        const sdata = res.data.data.filter(
          (item) => item.status === "Active" && item.installment_no === 1
        );
        setCategoriesData(sdata);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  };

  const handleEdit = (student) => {
    setEditingId(student._id);
    setCourse_Name(student.name);
    setStudent_Name(student.student_name);
    setDuration(student.duration);
    setDate(new Date(student.date).toISOString().split("T")[0]);
    setEmail(student.email);
    setPassword(student.password);
    setStatus(student.status);
    setShow(true);
  };

  const handleStudentChange = (e) => {
    const selectedStudentName = e.target.value;
    setStudent_Name(selectedStudentName);
    setError("");

    if (!selectedStudentName) {
      setCourse_Name("");
      setDuration("");
      return;
    }

    // Find the selected student in categoriesdata
    const student = categoriesdata.find(
      (stud) => stud.student_name === selectedStudentName
    );

    if (student) {
      setCourse_Name(student.name);
      setDuration(student.duration);
    } else {
      setCourse_Name("");
      setDuration("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const updatedDate = new Date(date).toISOString();
    const newData = {
      name: capitalizeFirstLetter(name),
      student_name: capitalizeFirstLetter(student_name),
      duration: capitalizeFirstLetter(duration),
      date: updatedDate,
      email: email.toLowerCase(),
      password,
      status: capitalizeFirstLetter(status),
    };

    if (editingId) {
      axios
        .put(`http://localhost:8000/update_stud/${editingId}`, newData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          alert("Data updated successfully");
          showUsers();
          handleClose();
        })
        .catch((err) => {
          console.error("Error updating student:", err);
          alert("Failed to update student. Please try again.");
        })
        .finally(() => setIsSubmitting(false));
    } else {
      axios
        .post("http://localhost:8000/addstudent", newData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          alert("Student Added Successfully!");
          showUsers();
          handleClose();
        })
        .catch((err) => {
          console.error("Error adding student:", err);
          alert("Failed to add student. Please try again.");
        })
        .finally(() => setIsSubmitting(false));
    }
  };

  const deletedata = (_id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      axios
        .delete(`http://localhost:8000/deletestudent/${_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          alert("Student deleted successfully");
          showUsers();
        })
        .catch((err) => {
          console.error("Error deleting student:", err);
          alert("Failed to delete student. Please try again.");
        });
    }
  };

  const handleExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      userData.map((a, index) => ({
        "Sr.No": index + 1,
        "Student Name": a.student_name,
        "Course Name": a.name,
        "Course Duration": a.duration,
        Date: a.date,
        Email: a.email,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students Data");
    XLSX.writeFile(workbook, "student-login-data.xlsx");
  };

  const handlePdf = () => {
    const doc = new jsPDF();
    doc.text("Students Data", 14, 22);
    doc.autoTable({
      head: [
        [
          "Sr.No",
          "Student Name",
          "Course Name",
          "Course Duration",
          "Date",
          "Email",
        ],
      ],
      body: userData.map((a, index) => [
        index + 1,
        a.student_name,
        a.name,
        a.duration,
        a.date,
        a.email,
      ]),
      startY: 30,
    });
    doc.save("Students-data.pdf");
  };

  const csvData = userData.map((a, index) => ({
    "Sr.No": index + 1,
    "Student Name": a.student_name,
    "Course Name": a.name,
    "Course Duration": a.duration,
    Date: a.date,
    Email: a.email,
  }));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(userData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = () => {
    const filteredData = userData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.duration.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        <Row>
          <Col md={4}>
            <Breadcrumb>
              <Breadcrumb.Item href="dashboard">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Student Login</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col md={8} className="d-flex justify-content-end mb-4">
            <Button variant="primary" onClick={() => setShow(true)}>
              Add Student Login
            </Button>
          </Col>
        </Row>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingId ? "Update Student Login" : "Add Student Login"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={12}>
                  <Form.Label>Student Name</Form.Label>
                  <Form.Select
                    aria-label="select Student"
                    value={student_name}
                    onChange={handleStudentChange}
                    required
                  >
                    <option value="">Choose Student Name</option>
                    {categoriesdata.map((stud) => (
                      <option key={stud._id} value={stud.student_name}>
                        {stud.student_name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={12}>
                  <Form.Label>Course Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setCourse_Name(e.target.value)}
                    required
                    readOnly
                  />
                </Col>
                <Col md={12}>
                  <Form.Label>Duration</Form.Label>
                  <Form.Control
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                    readOnly
                  />
                </Col>
                <Col md={12}>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </Col>
                <Col md={12}>
                  <Form.Label>Email Id</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Col>
                <Col md={12}>
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

        <Col md={8} className="">
          <CSVLink data={csvData} filename={"student-data.csv"}>
            <Button className="btn-secondary">CSV</Button>
          </CSVLink>
          <Button
            variant="primary"
            onClick={handleExcel}
            className="ms-1 btn-secondary"
          >
            Excel
          </Button>
          <Button
            variant="primary"
            onClick={handlePdf}
            className="ms-1 btn-secondary"
          >
            PDF
          </Button>
          <Button
            variant="primary"
            onClick={() => window.print()}
            className="ms-1 btn-secondary"
          >
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
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Text id="basic-addon2" className="bg-secondary">
              <FaSearch className="text-white" />
            </InputGroup.Text>
          </InputGroup>
        </Col>

        <Col md={12} lg={12} lx={12} lxx={12}>
          <div style={{ overflowX: "auto" }}>
            <Table striped bordered hover id="printable-table">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Student Name</th>
                  <th>Course Name</th>
                  <th>Course Duration</th>
                  <th>Date</th>
                  <th>Email</th>
                  <th className="no-print">Status</th>
                  <th className="no-print text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((a, index) => (
                  <tr key={index}>
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td>{a.student_name}</td>
                    <td>{a.name}</td>
                    <td>{a.duration}</td>
                    <td>{formatDate(a.date)}</td>
                    <td>{a.email}</td>
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

        <Row>
          <Col md={6}>
            <div className="dataTables_info" aria-live="polite" role="status">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, userData.length)} of {userData.length}{" "}
              entries
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

export default StudentLogin;