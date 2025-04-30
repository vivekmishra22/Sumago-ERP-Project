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
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaSearch } from "react-icons/fa";

const Enquiry_Student = () => {

  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust as needed
  const [searchTerm, setSearchTerm] = useState(""); // Search input value

  // Fetch data on component mount
  useEffect(() => {
    showUsers();
  }, []);

  // Fetch data from the API
  const showUsers = () => {
    axios
      .get("http://localhost:8000/getEnquiry_Student")
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        alert(
          "Failed to fetch data. Please check your network connection or try again later."
        );
      });
  };

  // Delete data
  const deletedata = (_id) => {
    axios
      .delete(`http://localhost:8000/deleteEnquiry_Student/${_id}`)
      .then((res) => {
        console.log("course Deleted:", res.data);
        alert("Course deleted");
        showUsers();
      })
      .catch((err) => console.error(err));
  };

    // Export to Excel
   const handleExcel = () => {
     const worksheet = XLSX.utils.json_to_sheet(
       userData.map((a, index) => ({
         "Sr.No": index + 1,
         "Student Name": a.student_name,
         "Mobile No":a.mobile_number,
         "Gmail":a.gmail,
         "Education":a.education_name,
         "Temporary Address":a.temporary_address,
         "Permanent Address":a.permanent_address,
         "Course Name": a.course_name,
         "Duration":a.duration
       }))
     );
     const workbook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(workbook, worksheet, "Courses Data");
     XLSX.writeFile(workbook, "courses-data.xlsx");
   };

   // Export to PDF
   const handlePdf = () => {
     const doc = new jsPDF();
     doc.text("Courses Data", 14, 22);
     doc.autoTable({
       head: [["Sr.No", "Student Name", "Mobile No",  "Gmail", "Education", "Temporary Address", "Permanent Address","Course Name", "Duration"]],
       body: userData.map((a, index) => [
         index + 1,
         a.student_name,
         a.mobile_number,
         a.gmail,
         a.education_name,
         a.temporary_address,
         a.permanent_address,
         a.course_name,
         a.duration
       ]),
       startY: 30,
     });
     doc.save("Courses-data.pdf");
   };

     // CSV data for export
   const csvData = userData.map((a, index) => ({
    "Student Name": a.student_name,
    "Mobile No":a.mobile_number,
    "Gmail":a.gmail,
    "Education":a.education_name,
    "Temporary Address":a.temporary_address,
    "Permanent Address":a.permanent_address,
    "Course Name": a.course_name,
    "Duration":a.duration
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
    const filteredData = userData.filter((index) => {
      return (
        (index.student_name && index.student_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.mobile_number && String(index.mobile_number).toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.gmail && index.gmail.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.education_name && index.education_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.temporary_address && index.temporary_address.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.permanent_address && index.permanent_address.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.course_name && index.course_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.duration && String(index.duration).toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.status && index.status.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
    setUserData(filteredData);
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
              <Breadcrumb.Item active>Student Data</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>

        {/* Export Buttons */}
        <Col md={8} className="mt-4">
          <CSVLink data={csvData} filename={"course-data.csv"}>
            <Button className=" btn-secondary">CSV</Button>
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

        {/* Search Input */}
        <Col md={4} className=" d-flex mt-4">
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

        <Col md={12} lg={12} lx={12} lxx={12} >
          <div style={{ overflowX: "auto" }}>
            <Table striped bordered hover id="printable-table">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Student Name</th>
                  <th>Mobile No</th>
                  <th>Email</th>
                  <th>Education</th>
                  <th>Temporary Address</th>
                  <th>Permanent Address</th>
                  <th>Course</th>
                  <th>Duration</th>
                  <th className="no-print">Status</th>
                  <th className="no-print text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td>{item.student_name}</td>
                    <td>{item.mobile_number}</td>
                    <td>{item.gmail}</td>
                    <td>{item.education_name}</td>
                    <td>{item.temporary_address}</td>
                    <td>{item.permanent_address}</td>
                    <td>{item.course_name}</td>
                    <td>{item.duration}</td>
                    <td className="no-print">{item.status}</td>
                    <td className="no-print d-flex justify-content-evenly">
                      <Button
                        variant="danger"
                        onClick={() => deletedata(item._id)}
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

export default Enquiry_Student;
