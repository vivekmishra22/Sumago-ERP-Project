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
  Image,
} from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import { AiFillDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaSearch } from "react-icons/fa";
// import { GrEdit } from "react-icons/gr";
import { useNavigate} from "react-router-dom";

const Trainer_profile_Add = () => {

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

  // Fetch data from the API
  const showUsers = () => {
    axios
      .get("http://localhost:8000/getTrainer_profile")
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
      .delete(`http://localhost:8000/deleteTrainer_profile/${_id}`)
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
        "Full Name": a.full_Name,
        "Image ": a.image,
        "Job Title": a.job_title,
        "Mobile No": a.Phone,
        "Email": a.email,
        "Country": a.country,
        "City Name": a.city_name,
        "Brief Bio": a.brief_bio,
        "Areas Specialization": a.areas_specialization,
        "Degree Earned": a.degree_earned,
        "Certifications": a.certifications,
        "Year": a.year,
        "Job Roles": a.job_roles,
        "Job Duration": a.job_duration,
        "Key Responsibilities Achievements":
          a.key_responsibilities_achievements,
        "Programming Languages": a.programming_languages,
        "Software Expertise": a.software_expertise,
        "Hardware Networking Knowledge": a.hardware_networking_knowledge,
        "Training Tools": a.training_tools,
        "Courses Taught": a.courses_taught,
        "Training Methods": a.training_methods,
        "Seminars Conducted": a.seminars_conducted,
        "Languages Spoken": a.languages_spoken,
        "Availability": a.availability,
        "Github": a.github,
        "LinkedIn": a.linkedIn,
        "Website": a.website,
        "State": a.state,
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
        (doc.getStringUnitWidth("Trainer Profile Details") *
          doc.internal.getFontSize()) /
        doc.internal.scaleFactor;
      doc.text(
        "Trainer Profile Details",
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
      doc.text(`Trainer ${index + 1}`, leftMargin, yPosition);
      yPosition += lineHeight + 2;

      // Personal Information
      doc.setFontSize(11);
      doc.setTextColor(150, 150, 150);
      doc.text("Personal Information", leftMargin, yPosition);
      yPosition += lineHeight;

      addFormField("Full Name", student.full_Name);
      addFormField("Image", student.image);
      addFormField("Job Title", student.job_title);
      addFormField("Mobile No", formatPhoneNumber(student.Phone));
      addFormField("email", student.email);
      addFormField("Country", student.country);
      addFormField("City Name", student.city_name);

      // Education Information
      // doc.setFontSize(11);
      // doc.setTextColor(150, 150, 150);
      // doc.text("Education Information", leftMargin, yPosition);
      // yPosition += lineHeight;

      addFormField("Brief Bio", student.brief_bio);
      addFormField("Areas Specialization", student.areas_specialization);
      addFormField("Degree Earned", student.degree_earned);
      addFormField("Mode of Education", student.mode_education);
      addFormField("Certifications", student.certifications);
      addFormField("Year", student.year);

      // Address Information
      // doc.setFontSize(11);
      // doc.setTextColor(150, 150, 150);
      // doc.text("Address Information", leftMargin, yPosition);
      // yPosition += lineHeight;

      addFormField("Job Roles", student.job_roles);
      addFormField("Job Duration", student.job_duration);
      addFormField(
        "Key Responsibilities Achievements",
        student.key_responsibilities_achievements
      );
      addFormField("Programming Languages", student.programming_languages);

      // Other Information
      // doc.setFontSize(11);
      // doc.setTextColor(150, 150, 150);
      // doc.text("Other Information", leftMargin, yPosition);
      // yPosition += lineHeight;

      addFormField("Software Expertise", student.software_expertise);
      addFormField(
        "Hardware Networking Knowledge",
        student.hardware_networking_knowledge
      );
      addFormField("Training Tools", student.training_tools);
      addFormField("Courses Taught", student.courses_taught);
      addFormField("Training Methods", student.training_methods);
      addFormField("Seminars Conducted", student.seminars_conducted);
      addFormField("Languages Spoken", student.languages_spoken);
      addFormField("Availability", student.availability);
      addFormField("Github", student.github);
      addFormField("LinkedIn", student.linkedIn);
      addFormField("Website", student.website);
      addFormField("State", student.state);
    });

    // Save PDF
    doc.save("Student-Course-Details.pdf");
  };

  // CSV data for export
  const csvData = userData.map((a, index) => ({
    "Full Name": a.full_Name,
    "Image ": a.image,
    "Job Title": a.job_title,
    "Mobile No": a.Phone,
    Email: a.email,
    Country: a.country,
    "City Name": a.city_name,
    "Brief Bio": a.brief_bio,
    "Areas Specialization": a.areas_specialization,
    "Degree Earned": a.degree_earned,
    Certifications: a.certifications,
    Year: a.year,
    "Job Roles": a.job_roles,
    "Job Duration": a.job_duration,
    "Key Responsibilities Achievements": a.key_responsibilities_achievements,
    "Programming Languages": a.programming_languages,
    "Software Expertise": a.software_expertise,
    "Hardware Networking Knowledge": a.hardware_networking_knowledge,
    "Training Tools": a.training_tools,
    "Courses Taught": a.courses_taught,
    "Training Methods": a.training_methods,
    "Seminars Conducted": a.seminars_conducted,
    "Languages Spoken": a.languages_spoken,
    Availability: a.availability,
    Github: a.github,
    LinkedIn: a.linkedIn,
    Website: a.website,
    State: a.state,
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
        (index.full_Name &&
          index.full_Name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.image &&
          index.image.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.job_title &&
          index.job_title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.Phone &&
          index.Phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.mobile_number && 
          String(index.mobile_number).toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.email &&
          index.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.country &&
          index.country.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.city_name &&
          index.city_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.brief_bio &&
          index.brief_bio.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.areas_specialization &&
          index.areas_specialization.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.degree_earned &&
          index.degree_earned.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.year &&
          index.year.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.job_roles &&
          index.job_roles.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.job_duration &&
          index.job_duration.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.key_responsibilities_achievements &&
          index.key_responsibilities_achievements.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.programming_languages &&
          index.programming_languages.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.software_expertise &&
          index.software_expertise.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.hardware_networking_knowledge &&
          index.hardware_networking_knowledge.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.training_tools &&
          index.training_tools.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.courses_taught &&
          index.courses_taught.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.training_methods &&
          index.training_methods.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.seminars_conducted &&
          index.seminars_conducted.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.languages_spoken &&
          index.languages_spoken.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.availability &&
          index.availability.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.github &&
          index.github.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.linkedIn &&
          index.linkedIn.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.website &&
          index.website.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (index.state &&
          index.state.toLowerCase().includes(searchTerm.toLowerCase())) ||
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
          <Col md={12} lg={4} xl={4} xxl={4}>
            <Breadcrumb>
              <Breadcrumb.Item href="/Head/">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Trainer Profile Add</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col
            md={12}
            lg={8}
            xl={8}
            xxl={8}
            className="d-flex justify-content-end mb-4"
          >
            <Button
              variant="primary"
              onClick={() => navigate("/Head/trainer_profile")}
            >
              Add Trainer Profile
            </Button>
          </Col>
        </Row>

        {/* Export Buttons */}
        <Col md={12} lg={8} xl={8} xxl={8} className="mt-4">
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
        <Col md={12} lg={4} xl={4} xxl={4} className=" d-flex mt-4">
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
                  <th>Full Name</th>
                  <th>Profile Photo</th>
                  <th>Job Title</th>
                  <th>Phone No</th>
                  <th>email</th>
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
                        <td>{item.full_Name}</td>
                        <td>
                          <Image
                            src={`http://localhost:8000/images/${item.image}`}
                            height={50}
                            width={50}
                          />
                        </td>
                        <td>{item.job_title}</td>
                        <td>{item.Phone}</td>
                        <td>{item.email}</td>
                        <td className="no-print">{item.status}</td>
                        <td className="no-print d-flex justify-content-evenly ">
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
                                  <th>Country</th>
                                  <th>State</th>
                                  <th>City</th>
                                  <th>Brief Bio</th>
                                  <th>Areas Specialization</th>
                                  <th>Degree Earned</th>
                                  <th>Certifications</th>
                                  <th>Years Experience</th>
                                </tr>
                              </thead>

                              <tbody>
                                <tr>
                                  <td>{item.country}</td>
                                  <td>{item.state}</td>
                                  <td>{item.city_name}</td>
                                  <td>{item.brief_bio}</td>
                                  <td>{item.areas_specialization}</td>
                                  <td>{item.degree_earned}</td>
                                  <td>{item.certifications}</td>
                                  <td>{item.year}</td>
                                </tr>
                              </tbody>
                            </Table>
                            <Table bordered className="mb-0">
                              <thead>
                                <tr>
                                  <th>Job Roles</th>
                                  <th>job_duration</th>
                                  <th>Key Responsibilities Achievements</th>
                                  <th>Programming Languages</th>
                                  <th>Software Expertise</th>
                                  <th>Hardware Networking Knowledge</th>
                                  <th>Training Tools</th>
                                  <th>Courses Taught</th>
                                  <th>Training Methods</th>
                                  <th>Seminars Conducted</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{item.job_roles}</td>
                                  <td>{item.job_duration}</td>
                                  <td>
                                    {item.key_responsibilities_achievements}
                                  </td>
                                  <td>{item.programming_languages}</td>
                                  <td>{item.software_expertise}</td>
                                  <td>{item.hardware_networking_knowledge}</td>
                                  <td>{item.training_tools}</td>
                                  <td>{item.courses_taught}</td>
                                  <td>{item.training_methods}</td>
                                  <td>{item.seminars_conducted} </td>
                                </tr>
                              </tbody>
                            </Table>

                            <Table bordered className="mb-0">
                              <thead>
                                <tr>
                                  <th>Languages Spoken</th>
                                  <th>Availability</th>
                                  <th>Github</th>
                                  <th>LinkedIn</th>
                                  <th>Website</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{item.languages_spoken}</td>
                                  <td>{item.availability}</td>
                                  <td>{item.github}</td>
                                  <td>{item.linkedIn}</td>
                                  <td>{item.website}</td>
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

export default Trainer_profile_Add;
