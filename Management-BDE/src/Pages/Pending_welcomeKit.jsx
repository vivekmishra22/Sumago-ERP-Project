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
  FormCheck,
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
import { useNavigate } from "react-router-dom";

const Pending_welcomeKit = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setName("");
    setStudent_name("");
    setCurrentDate("");
    setWelcome_kit([]);
    setKit_Aside("pending Kit");
    setStatus("Active");
    setShow(false);
  };

  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [name, setName] = useState("");
  const [student_name, setStudent_name] = useState("");
  const [current_date, setCurrentDate] = useState("");
  const [welcome_kit, setWelcome_kit] = useState([]);
  const [kit_aside, setKit_Aside] = useState("pending Kit");
  const [status, setStatus] = useState("Active");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [categoriesdata, setCategoriesData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categorieskitdata, setCategoriesKitData] = useState([]);
  const [selectedKits, setSelectedKits] = useState([]);

  const handleCheckboxChange = (e, kitValue) => {
    let updatedSelectedKits;
    if (e.target.checked) {
      updatedSelectedKits = [...selectedKits, kitValue];
    } else {
      updatedSelectedKits = selectedKits.filter((kit) => kit !== kitValue);
    }
    capitalizeFirstLetter(welcome_kit);
    setSelectedKits(updatedSelectedKits);

    if (updatedSelectedKits.length === categorieskitdata.length) {
      setKit_Aside("complete Kit");
    } else {
      setKit_Aside("pending Kit");
    }
  };

  function capitalizeFirstLetter(input) {
    if (typeof input === "string") {
      return input
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    return input;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const showUsers = () => {
    axios
      .get("http://localhost:8000/getdataKit_FeesPaid")
      .then((res) => {
        // Filter for pending kits only
        const pendingKits = res.data.data.filter(
          (item) =>
            item.kit_aside === "pending Kit" ||
            (Array.isArray(item.welcome_kit) &&
              item.welcome_kit.length < categorieskitdata.length)
        );
        setUserData(pendingKits);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to fetch pending welcome kits.");
      });
  };

  // useEffect(() => {
  //   showUsers();
  // }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/getEnquiry_Student").then((res) => {
      const sdata = res.data.data.filter((item) => item.status === "Active");
      setCategoriesData(sdata);
    });

    axios.get("http://localhost:8000/getdataCourse").then((res) => {
      const cdata = res.data.data.filter((item) => item.status === "Active");
      setCategories(cdata);
    });

    axios.get("http://localhost:8000/getkititem").then((res) => {
      const wdata = res.data.data.filter((item) => item.status === "Active");
      setCategoriesKitData(wdata);
    });
  }, []);

  const handleEdit = (item) => {
    setEditingId(item._id);
    setName(item.name);
    setStudent_name(item.student_name);
    setCurrentDate(new Date(item.current_date).toISOString().split("T")[0]);

    const kitsArray =
      typeof item.welcome_kit === "string"
        ? item.welcome_kit.split(", ")
        : item.welcome_kit;
    setSelectedKits(kitsArray);

    setKit_Aside(item.kit_aside);
    setStatus(item.status);
    setShow(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updatedDate = new Date(current_date).toISOString();
    const newData = {
      name: capitalizeFirstLetter(name),
      student_name: capitalizeFirstLetter(student_name),
      current_date: updatedDate,
      welcome_kit: selectedKits.join(", "),
      kit_aside:
        selectedKits.length === categorieskitdata.length
          ? "complete Kit"
          : "pending Kit",
      status: capitalizeFirstLetter(status),
    };

    if (editingId) {
      axios
        .put(`http://localhost:8000/UpdateKit_FeesPaid/${editingId}`, newData)
        .then(() => {
          alert("Updated successfully");
          showUsers();
          handleClose();
        })
        .finally(() => setIsSubmitting(false));
    } else {
      axios
        .post("http://localhost:8000/addKit_FeesPaid", newData)
        .then(() => {
          alert("Added successfully");
          handleClose();
          showUsers();
          navigate("/Head/pending_welcomekit");
        })
        .catch(() => alert("Failed to add data"));
    }
  };

  const deletedata = (_id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      axios
        .delete(`http://localhost:8000/deleteKit_FeesPaid/${_id}`)
        .then(() => showUsers())
        .catch((err) => console.error(err));
    }
  };

  const handleExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      userData.map((a, index) => ({
        "Sr.No": index + 1,
        "Student Name": a.student_name,
        "Course Name": a.name,
        Date: formatDate(a.current_date),
        "Pending Items": categorieskitdata
          .filter((kit) => !a.welcome_kit.includes(kit.welcome_kit))
          .map((kit) => kit.welcome_kit)
          .join(", "),
        Status: a.kit_aside,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pending Kits Data");
    XLSX.writeFile(workbook, "pending-kits-data.xlsx");
  };

  const handlePdf = () => {
    const doc = new jsPDF();
    doc.text("Pending Welcome Kits", 14, 22);
    doc.autoTable({
      head: [["Sr.No", "Student", "Course", "Date", "Pending Items", "Status"]],
      body: userData.map((a, index) => [
        index + 1,
        a.student_name,
        a.name,
        formatDate(a.current_date),
        categorieskitdata
          .filter((kit) => !a.welcome_kit.includes(kit.welcome_kit))
          .map((kit) => kit.welcome_kit)
          .join(", "),
        a.kit_aside,
      ]),
      startY: 30,
    });
    doc.save("pending-kits-data.pdf");
  };

  const csvData = userData.map((a, index) => ({
    "Sr.No": index + 1,
    "Student Name": a.student_name,
    "Course Name": a.name,
    Date: formatDate(a.current_date),
    "Pending Items": categorieskitdata
      .filter((kit) => !a.welcome_kit.includes(kit.welcome_kit))
      .map((kit) => kit.welcome_kit)
      .join(", "),
    Status: a.kit_aside,
  }));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(userData.length / itemsPerPage);

  // const handleSearch = () => {
  //   const filtered = userData.filter(item =>
  //     Object.values(item).some(val =>
  //       String(val).toLowerCase().includes(searchTerm.toLowerCase())
  //   ));
  //   setUserData(filtered);
  // };

  // useEffect(() => {
  //   if (searchTerm === "") showUsers();
  // }, [searchTerm]);

  // Handle search
  const handleSearch = () => {
    const filteredData = userData.filter((item) => {
      return (
        (item.name &&
          typeof item.name === "string" &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.student_name &&
          typeof item.student_name === "string" &&
          item.student_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.current_date &&
          typeof item.current_date === "string" &&
          item.current_date.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.welcome_kit &&
          typeof item.welcome_kit === "string" &&
          item.welcome_kit.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.status &&
          typeof item.status === "string" &&
          item.status.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });

    setUserData(filteredData); // Update the table data
  };

  // Reset search when the input is cleared
  useEffect(() => {
    if (searchTerm === "") {
      showUsers(); // Reset the table data to the original data
    }
  });

  return (
    <Container className="d-flex justify-content-end">
      <Row className="d-flex justify-content-center mt-2 pt-5">
        <Row>
          <Col md={12}>
            <Breadcrumb>
              <Breadcrumb.Item href="/Head/">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="/Head/welcomekit_feespaid">
                WelCome Kit Fees Paid
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Pending WelCome Kit</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingId ? "Update Pending Kit" : "Add Pending Kit"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={12}>
                  <Form.Label>Student Name</Form.Label>
                  <Form.Select
                    value={student_name}
                    onChange={(e) => setStudent_name(e.target.value)}
                    required
                  >
                    <option value="">Select Student</option>
                    {categoriesdata.map((student) => (
                      <option key={student._id} value={student.student_name}>
                        {student.student_name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Col md={12}>
                  <Form.Label>Course Name</Form.Label>
                  <Form.Select
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  >
                    <option value="">Select Course</option>
                    {categories.map((course) => (
                      <option key={course._id} value={course.name}>
                        {course.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Col md={12}>
                  <Form.Label>Current Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={current_date}
                    onChange={(e) => setCurrentDate(e.target.value)}
                    required
                    readOnly
                  />
                </Col>

                <Col md={12}>
                  <Form.Label>Welcome Kit Items</Form.Label>
                  <Row>
                    {categorieskitdata.map((kit) => (
                      <Col md={4} key={kit._id}>
                        <FormCheck
                          type="checkbox"
                          label={kit.welcome_kit}
                          checked={selectedKits.includes(kit.welcome_kit)}
                          onChange={(e) =>
                            handleCheckboxChange(e, kit.welcome_kit)
                          }
                        />
                      </Col>
                    ))}
                  </Row>
                </Col>

                <Col md={12} className="d-flex mt-3">
                  <Form.Label>Kit Status</Form.Label>
                  <Form.Check
                    type="radio"
                    label="Complete Kit"
                    name="kit_aside"
                    value="complete Kit"
                    className="ps-5"
                    checked={kit_aside === "complete Kit"}
                    onChange={(e) => setKit_Aside(e.target.value)}
                    disabled={selectedKits.length !== categorieskitdata.length}
                  />
                  <Form.Check
                    type="radio"
                    label="Pending Kit"
                    name="kit_aside"
                    value="pending Kit"
                    className="ps-5"
                    checked={kit_aside === "pending Kit"}
                    onChange={(e) => setKit_Aside(e.target.value)}
                    disabled={selectedKits.length === categorieskitdata.length}
                  />
                </Col>

                <Col md={12} className="d-flex mt-3">
                  <Form.Label> Status</Form.Label>
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
              {isSubmitting ? "Processing..." : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Modal>

        <Col md={8} className="mb-3">
          <CSVLink data={csvData} filename="pending-kits.csv">
            <Button variant="secondary">CSV</Button>
          </CSVLink>
          <Button variant="secondary" onClick={handleExcel} className="ms-2">
            Excel
          </Button>
          <Button variant="secondary" onClick={handlePdf} className="ms-2">
            PDF
          </Button>
          <Button
            variant="secondary"
            onClick={() => window.print()}
            className="ms-2"
          >
            Print
          </Button>
        </Col>

        <Col md={4} className="mb-3">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button variant="secondary" onClick={handleSearch}>
              <FaSearch />
            </Button>
          </InputGroup>
        </Col>

        <Col md={12}>
          <div style={{ overflowX: "auto" }}>
            <Table striped bordered hover id="printable-table">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Date</th>
                  <th>Pending Items</th>
                  <th>Kit Status</th>
                  <th className="no-print"> Status</th>
                  <th className="text-center no-print">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => {
                  const pendingItems = categorieskitdata
                    .filter(
                      (kit) => !item.welcome_kit.includes(kit.welcome_kit)
                    )
                    .map((kit) => kit.welcome_kit);

                  return (
                    <tr key={item._id}>
                      <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                      <td>{item.student_name}</td>
                      <td>{item.name}</td>
                      <td>{formatDate(item.current_date)}</td>
                      <td>
                        {pendingItems.length > 0
                          ? pendingItems.join(", ")
                          : "None (Complete)"}
                      </td>
                      <td>{item.kit_aside}</td>
                      <td className="no-print">{item.status} </td>
                      <td className="text-center no-print">
                        <Button
                          variant="warning"
                          onClick={() => handleEdit(item)}
                        >
                          <GrEdit />
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => deletedata(item._id)}
                        >
                          <AiFillDelete />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Col>

        <Row className="mt-3">
          <Col md={6}>
            <div className="mt-2">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, userData.length)} of {userData.length}{" "}
              entries
            </div>
          </Col>
          <Col md={6}>
            <Pagination className="justify-content-end">
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              />
              {Array.from({ length: totalPages }, (_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === currentPage}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              />
            </Pagination>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default Pending_welcomeKit;
