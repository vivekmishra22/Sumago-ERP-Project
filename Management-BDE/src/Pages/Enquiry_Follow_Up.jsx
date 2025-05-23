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
import { AiFillDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaSearch } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
// import { GrEdit } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";

const Enquiry_Follow_Up = () => {
    const {_id} = useParams("")
    const navigate = useNavigate("");
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust as needed
  const [searchTerm, setSearchTerm] = useState(""); // Search input value
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Fetch data on component mount
  useEffect(() => {
    showUsers();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits
    const month = String(date.getMonth() + 1); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

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
      userData.map((a) => ({
        "Student Name": a.student_name,
        "University Name": a.university_name,
        "College Name": a.college_name,
        "City Name": a.city_name,
        "Mobile No": a.mobile_number,
        "WhatsApp No": a.whatsApp_number,
        "Birth Date No": a.date_birth,
        "Gmail": a.gmail,
        "Blood Group": a.blood_Group,
        "Education": a.education_name,
        "Marital Status": a.marital_status,
        "Office City Name": a.office_city_name,
        "Temporary Address": a.temporary_address,
        "Permanent Address": a.permanent_address,
        "Mode Education": a.mode_education,
        "Course Name": a.course_name,
        "Duration": a.duration,
        "Amoute": a.amount,
        "Placement Reference": a.placement_reference,
        "System": a.system,
        "Tshirt": a.tshirt,
        "Batch Slot": a.batch_slot,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Courses Data");
    XLSX.writeFile(workbook, "courses-data.xlsx");
  };

  const handlePdf = () => {
    const doc = new jsPDF();

    // Set styling constants
    const lineHeight = 7;
    const leftMargin = 14;
    const labelWidth = 60;

    // Loop through each student
    userData.forEach((student, index) => {
      // Start new page for each student (except first)
      if (index > 0) {
        doc.addPage();
      }

      let yPosition = 20; // Reset position for each new page

      // PDF Title (centered)
      doc.setFontSize(16);
      doc.setTextColor(40);
      const pageWidth = doc.internal.pageSize.getWidth();
      const textWidth =
        (doc.getStringUnitWidth("Student Course Details") *
          doc.internal.getFontSize()) /
        doc.internal.scaleFactor;
      doc.text(
        "Student Course Details",
        (pageWidth - textWidth) / 2,
        yPosition
      );
      yPosition += 10;

      // Add horizontal line
      doc.setDrawColor(200);
      doc.setLineWidth(0.5);
      doc.line(leftMargin, yPosition, pageWidth - leftMargin, yPosition);
      yPosition += 10;

      // Function to add form fields with proper string conversion
      const addFormField = (label, value) => {
        // Convert value to string safely
        const stringValue =
          value !== undefined && value !== null ? String(value) : "N/A";

        // Label
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`${label}:`, leftMargin, yPosition);

        // Value
        doc.setFontSize(11);
        doc.setTextColor(40);
        doc.text(stringValue, leftMargin + labelWidth, yPosition);

        yPosition += lineHeight;
      };

      // Format phone numbers
      const formatPhoneNumber = (num) => {
        if (!num) return "N/A";
        const str = String(num).replace(/\D/g, "");
        return str.length === 10 ? `${str.slice(0, 5)} ${str.slice(5)}` : str;
      };

      // Student header
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 255);
      doc.text(`Student ${index + 1}`, leftMargin, yPosition);
      yPosition += lineHeight + 2;

      // Personal Information
      doc.setFontSize(11);
      doc.setTextColor(150, 150, 150);
      doc.text("Personal Information", leftMargin, yPosition);
      yPosition += lineHeight;

      addFormField("Student Name", student.student_name);
      addFormField(
        "Birth Date",
        student.date_birth
          ? new Date(student.date_birth).toLocaleDateString()
          : "N/A"
      );
      addFormField("Mobile No", formatPhoneNumber(student.mobile_number));
      addFormField("WhatsApp No", formatPhoneNumber(student.whatsApp_number));
      addFormField("Gmail", student.gmail);
      addFormField("Blood Group", student.blood_Group);
      addFormField("Marital Status", student.marital_status);

      // Education Information
      doc.setFontSize(11);
      doc.setTextColor(150, 150, 150);
      doc.text("Education Information", leftMargin, yPosition);
      yPosition += lineHeight;

      addFormField("University Name", student.university_name);
      addFormField("College Name", student.college_name);
      addFormField("Education", student.education_name);
      addFormField("Mode of Education", student.mode_education);
      addFormField("Course Name", student.course_name);
      addFormField("Duration", student.duration);
      addFormField(
        "Amount",
        student.amount
          ? `₹${Number(student.amount).toLocaleString("en-IN")}`
          : "N/A"
      );

      // Address Information
      doc.setFontSize(11);
      doc.setTextColor(150, 150, 150);
      doc.text("Address Information", leftMargin, yPosition);
      yPosition += lineHeight;

      addFormField("City Name", student.city_name);
      addFormField("Office City", student.office_city_name);
      addFormField("Temporary Address", student.temporary_address);
      addFormField("Permanent Address", student.permanent_address);

      // Other Information
      doc.setFontSize(11);
      doc.setTextColor(150, 150, 150);
      doc.text("Other Information", leftMargin, yPosition);
      yPosition += lineHeight;

      addFormField("Placement Reference", student.placement_reference);
      addFormField("System", student.system);
      addFormField("Tshirt", student.tshirt);
      addFormField("Batch Slot", student.batch_slot);
    });

    // Save PDF
    doc.save("Student-Course-Details.pdf");
  };

  // CSV data for export
  const csvData = userData.map((a) => ({
    "Student Name": a.student_name,
    "University Name": a.university_name,
    "College Name": a.college_name,
    "City Name": a.city_name,
    "Mobile No": a.mobile_number,
    "WhatsApp No": a.whatsApp_number,
    "Birth Date No": a.date_birth,
    "Gmail": a.gmail,
    "Blood Group": a.blood_Group,
    "Education": a.education_name,
    "Marital Status": a.marital_status,
    "Office City Name": a.office_city_name,
    "Temporary Address": a.temporary_address,
    "Permanent Address": a.permanent_address,
    "Mode Education": a.mode_education,
    "Course Name": a.course_name,
    "Duration": a.duration,
    "Amoute": a.amount,
    "Placement Reference": a.placement_reference,
    "System": a.system,
    "Tshirt": a.tshirt,
    "Batch Slot": a.batch_slot,
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
        (index.university_name &&index.university_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.college_name &&
          index.college_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (index.city_name &&
          index.city_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.mobile_number &&
          String(index.mobile_number)
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (index.whatsApp_number &&
          String(index.whatsApp_number)
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (index.date_birth &&
          String(index.date_birth)
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (index.gmail &&
          index.gmail.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.blood_Group &&
          index.blood_Group.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.education_name &&
          index.education_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (index.marital_status &&
          index.marital_status
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (index.office_city_name &&
          index.office_city_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (index.temporary_address &&
          index.temporary_address
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (index.permanent_address &&
          index.permanent_address
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (index.mode_education &&
          index.mode_education
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (index.course_name &&
          index.course_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.duration &&
          String(index.duration)
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (index.amount &&
          String(index.amount)
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (index.placement_reference &&
          String(index.placement_reference)
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (index.system &&
          String(index.system)
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (index.tshirt &&
          String(index.tshirt)
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (index.batch_slot &&
          String(index.batch_slot)
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (index.status &&
          index.status.toLowerCase().includes(searchTerm.toLowerCase()))
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
              <Breadcrumb.Item active>
                Student Enquiry Follow Up
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          {/* <Col md={8} className="d-flex justify-content-end mb-4">
            <Button
              variant="primary"
              onClick={() => navigate("/Head/enquiry_add")}
            >
              Add Student Enquiry
            </Button>
          </Col> */}
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

        {/* Table */}
        <Col md={12} lg={12} xl={12} xxl={12}>
          <div style={{ overflowX: "auto" }}>
            <Table
              striped
              bordered
              hover
              responsive
              className="align-middle"
              id="printable-table"
            >
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Student</th>
                  <th>University</th>
                  <th>College</th>
                  <th>City</th>
                  <th>Mobile</th>

                  <th className="no-print">Status</th>
                  <th className="no-print">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => {
                  const rowIndex = index + (currentPage - 1) * itemsPerPage;

                  return (
                    <React.Fragment key={rowIndex}>
                      <tr>
                        <td>
                          {rowIndex + 1}
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => toggleRow(rowIndex)}
                          >
                            {expandedRows[rowIndex] ? (
                              <AiOutlineMinus />
                            ) : (
                              <AiOutlinePlus id="printable-table" />
                            )}
                          </Button>
                        </td>
                        <td>{item.student_name}</td>
                        <td>{item.university_name}</td>
                        <td>{item.college_name}</td>
                        <td>{item.city_name}</td>
                        <td>{item.mobile_number}</td>

                        <td className="no-print">{item.status}</td>
                        <td className="no-print d-flex justify-content-evenly ">
                          <Button
                            variant="warning"
                            // onClick={() => handleEdit(item)}
                            onClick={() => navigate(`/Head/update_enquiry_followUp/${_id}`)}
                          >
                            <GrEdit />
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => deletedata(item._id)}
                            className="d-flex my-atou align-items-center"
                          >
                            <AiFillDelete />
                          </Button>
                        </td>
                      </tr>

                      {expandedRows[rowIndex] && (
                        <tr>
                          <td colSpan="13" className="p-0">
                            <Table bordered className="mb-0">
                              <thead>
                                <tr>
                                  <th>WhatsApp</th>
                                  <th>DOB</th>
                                  <th>Gmail</th>
                                  <th>Blood Group</th>
                                  <th>Education</th>
                                  <th>Marital Status</th>
                                  <th>Office City</th>
                                  <th>Temp Address</th>
                                  <th>Perm Address</th>
                                  <th>Mode</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{item.whatsApp_number}</td>
                                  <td>{formatDate(item.date_birth)}</td>
                                  <td>{item.gmail}</td>
                                  <td>{item.blood_Group}</td>
                                  <td>{item.education_name}</td>
                                  <td>{item.marital_status}</td>
                                  <td>{item.office_city_name}</td>
                                  <td>{item.temporary_address}</td>
                                  <td>{item.permanent_address}</td>
                                  <td>{item.mode_education}</td>
                                </tr>
                              </tbody>
                            </Table>
                            <Table bordered className="mb-0">
                              <thead>
                                <tr>
                                  <th>Perm Address</th>
                                  <th>Mode</th>
                                  <th>Course</th>
                                  <th>Duration</th>
                                  <th>Amount</th>
                                  <th>Placement Ref</th>
                                  <th>System</th>
                                  <th>Tshirt</th>
                                  <th>Batch Slot</th>
                                  <th>Current Date</th>
                                  <th>Folliw Up Date</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{item.permanent_address}</td>
                                  <td>{item.mode_education}</td>
                                  <td>{item.course_name}</td>
                                  <td>{item.duration}</td>
                                  <td>{item.amount}</td>
                                  <td>{item.placement_reference}</td>
                                  <td>{item.system}</td>
                                  <td>{item.tshirt}</td>
                                  <td>{item.batch_slot}</td>
                                  <td>{formatDate(item.current_date)} </td>
                                  <td>{formatDate(item.end_date)}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
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

export default Enquiry_Follow_Up;
