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

const Welcomekit_Feespaid = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setCourse_Name("");
    setStudent_name("");
    setDate("");
    setWelcome_kit([]);
    setStatus("Active");
    setShow(false);
  };

  // const handleShow = () => setShow(true);

  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust as needed
  // const navigate = useNavigate();

  const [course_name, setCourse_Name] = useState("");
  const [student_name, setStudent_name] = useState("");
  const [date, setDate] = useState("");
  const [welcome_kit, setWelcome_kit] = useState([]);
  const [status, setStatus] = useState("Active"); // Default status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Search input value
  const [editingId, setEditingId] = useState(null); // Track which ID is being edited
  const [categoriesdata, setCategoriesData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categorieskitdata, setCategoriesKitData] = useState([]);
  const [selectedKits, setSelectedKits] = useState([]);

  // Handle the change event when a checkbox is toggled
  const handleCheckboxChange = (e, kitValue) => {
    if (e.target.checked) {
      // If checked, add the value to the selectedKits array
      setSelectedKits((prev) => [...prev, kitValue]);
    } else {
      // If unchecked, remove the value from the selectedKits array
      setSelectedKits((prev) => prev.filter((kit) => kit !== kitValue));
    }
  };

  // const capitalizeFirstLetter = (str) => {
  //   if (!str) return str;
  //   return str
  //     .split(" ") // Split the string into words
  //     .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
  //     .join(" "); // Join them back together
  // };
  function capitalizeFirstLetter(input) {
    if (typeof input === "string") {
      return input
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    } else {
      console.error("Input is not a string!");
      return input; // Or handle accordingly
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
   const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
   const month = String(date.getMonth() + 1); // Months are zero-based
   const year = date.getFullYear();
   return `${day}-${month}-${year}`;
};

  // Fetch data on component mount
  useEffect(() => {
    showUsers();
  }, []);

  // Fetch data from the API
  const showUsers = () => {
    axios
      .get("http://localhost:8000/getdataKit_FeesPaid")
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

  useEffect(() => {
    axios
      .get("http://localhost:8000/getEnquiry_Student")
      .then((res) => {
        const sdata = res.data.data.filter((item) => item.status === "Active");
        setCategoriesData(sdata);
        console.log("Categories fetched:", res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });

    axios
      .get("http://localhost:8000/getdataCourse")
      .then((res) => {
        const cdata = res.data.data.filter((item) => item.status === "Active");
        setCategories(cdata);
        console.log("Categories fetched:", res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });

    axios
      .get("http://localhost:8000/getkititem")
      .then((res) => {
        const wdata = res.data.data.filter((item) => item.status === "Active");
        setCategoriesKitData(wdata);
        console.log("Categories fetched:", res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  // Handle Edit Click
  const handleEdit = (course) => {
    setEditingId(course._id);
    setCourse_Name(course.course_name);
    setStudent_name(course.student_name);
    setDate(new Date(course.date).toISOString().split("T")[0]);
    setWelcome_kit(course.welcome_kit.join(", "));
    setStatus(course.status);
    setShow(true);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updatedDate = new Date(date).toISOString();    
    const newData = {
      course_name: capitalizeFirstLetter(course_name),
      student_name: capitalizeFirstLetter(student_name),
      date:updatedDate,
      welcome_kit:selectedKits.join(", "),
      status: capitalizeFirstLetter(status),
    };

    if (editingId) {
      axios
        .put(`http://localhost:8000/UpdateKit_FeesPaid/${editingId}`, newData)
        .then((res) => {
          // console.log(res.data);
          alert("Data updated successfully");
          showUsers();
          handleClose();
        })
        .catch((err) => console.error(err))
        .finally(() => setIsSubmitting(false));
    } else {
      axios
        .post("http://localhost:8000/addKit_FeesPaid", newData)
        .then((res) => {
          // console.log("Data Added:", res.data);
          alert("Course Added Successfully!");
          // setCourse_Name("");
          // setStudent_name("");
          // setDate("");
          // setWelcome_kit("");
          // setStatus("Active");
          handleClose();
          showUsers(); // Refresh the table
        })
        .catch((err) => {
          console.log(err);
          alert("Failed to add data. Please try again.");
        });
    }
  };

  // Delete data
  const deletedata = (_id) => {
    axios
      .delete(`http://localhost:8000/deleteKit_FeesPaid/${_id}`)
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
        "Course Name": a.course_name,
        "Date": a.date,
        "Welcome Kit": a.welcome_kit,
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
      head: [["Sr.No", "Student Name", "Course Name", "Date", "welcome_kit"]],
      body: userData.map((a, index) => [
        index + 1,
        a.student_name,
        a.course_name,
        a.date,
        a.welcome_kit,
      ]),
      startY: 30,
    });
    doc.save("Courses-data.pdf");
  };

  // CSV data for export
  const csvData = userData.map((a, index) => ({
    "Sr.No": index + 1,
    "Student Name": a.student_name,
    "Course Name": a.course_name,
    "Date": a.date,
    "Welcome Kit": a.welcome_kit,
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
    const filteredData = userData.filter((item) => {
      return (
        (item.course_name && typeof item.course_name === 'string' && item.course_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.student_name && typeof item.student_name === 'string' && item.student_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.date && typeof item.date === 'string' && item.date.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.welcome_kit && typeof item.welcome_kit === 'string' && item.welcome_kit.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.status && typeof item.status === 'string' && item.status.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
  
    setUserData(filteredData); // Update the table data
  };
  

  // // Handle Enter key press
  // const handleKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     handleSearch();
  //   }
  // };

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
              <Breadcrumb.Item active>WelCome Kit Fees Paid</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col md={8} className="d-flex justify-content-end mb-4">
            <Button variant="primary" onClick={() => setShow(true)}>
              Add Course
            </Button>
          </Col>
        </Row>

        {/* Add Technology Modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingId
                ? " Update WelCome Kit Fees Paid"
                : "Add WelCome Kit Fees Paid"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={12}>
                  <Form.Label>Student Name</Form.Label>
                  <Form.Select
                    aria-label="Select student"
                    value={student_name}
                    onChange={(e) => setStudent_name(e.target.value)}
                    required
                  >
                    <option value="">Choose a Student name</option>
                    {categoriesdata.map((student) => (
                      <option key={student._id} value={student.student_name}>
                        {student_name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={12}>
                  <Form.Label>Course Name</Form.Label>
                  <Form.Select
                    aria-label="select Course"
                    value={course_name}
                    onChange={(e) => setCourse_Name(e.target.value)}
                    required
                  >
                    <option value="">Choose Course Name</option>
                    {categories.map((course) => (
                      <option key={course._id} value={course.course_name}>
                        {course.course_name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={12}>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="Date"
                    placeholder="Enter Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </Col>

                <Col md={12}>
                <Form.Label>Welcome Kit</Form.Label>
                  {categorieskitdata.map((kit) => (
                    <div key={kit._id}>
                      <input
                        type="checkbox"
                        value={kit.welcome_kit}
                        checked={selectedKits.includes(kit.welcome_kit)} // Check if the kit is selected
                        onChange={(e) =>{
                          handleCheckboxChange(e, kit.welcome_kit)
                          setWelcome_kit(e.target.welcome_kit)
                        }
                        } // Handle the checkbox change
                        required
                      />
                      <label>{kit.welcome_kit}</label>
                    </div>
                  ))}
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

        {/* Export Buttons */}
        <Col md={8} className="">
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
        <Col md={4} className=" d-flex">
          <InputGroup className="mb-3  ">
            <Form.Control
              type="text"
              placeholder="Search for ...."
              value={searchTerm}
              className="ms-2"
              onChange={(e) => setSearchTerm(e.target.value)}
              // onKeyPress={handleKeyPress}
              onChangeCapture={handleSearch}
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Text id="basic-addon2" className=" bg-secondary ">
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
                  <th>Date</th>
                  <th>Welcome Kit</th>
                  <th className="no-print">Status</th>
                  <th className="no-print text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((a, index) => (
                  <tr key={index}>
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td>{a.student_name}</td>
                    <td>{a.course_name}</td>
                    <td>{formatDate(a.date)}</td>
                    {/* <td>{a.date}</td> */}
                    <td>{a.welcome_kit}</td>
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

export default Welcomekit_Feespaid;


// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   Col,
//   Container,
//   Form,
//   InputGroup,
//   Row,
//   Table,
//   Breadcrumb,
//   Modal,
// } from "react-bootstrap";
// import Pagination from "react-bootstrap/Pagination";
// import { AiFillDelete } from "react-icons/ai";
// import { GrEdit } from "react-icons/gr";
// import { CSVLink } from "react-csv";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import { FaSearch } from "react-icons/fa";

// const Welcomekit_Feespaid = () => {
//   const [show, setShow] = useState(false);
//   const [userData, setUserData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [course_name, setCourse_Name] = useState("");
//   const [student_name, setStudent_name] = useState("");
//   const [date, setDate] = useState("");
//   const [welcome_kit, setWelcome_kit] = useState("");
//   const [status, setStatus] = useState("Active");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [editingId, setEditingId] = useState(null);
//   const [categoriesdata, setCategoriesData] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [categorieskitdata, setCategoriesKitData] = useState([]);
//   const [selectedKits, setSelectedKits] = useState([]);

//   // Fetch data on component mount
//   useEffect(() => {
//     showUsers();
//     fetchCategories();
//   }, []);

//    function capitalizeFirstLetter(input) {
//      if (typeof input === "string") {
//        return input
//          .split(" ")
//          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//          .join(" ");
//      } else {
//        console.error("Input is not a string!");
//        return input; // Or handle accordingly
//      }
//    }

//   // Fetch user data
//   const showUsers = () => {
//     axios
//       .get("http://localhost:8000/getdataKit_FeesPaid")
//       .then((res) => {
//         setUserData(res.data.data);
//         setFilteredData(res.data.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching data:", err);
//         alert("Failed to fetch data. Please try again later.");
//       });
//   };

//   // Fetch categories (students, courses, kits)
//   const fetchCategories = () => {
//     axios
//       .get("http://localhost:8000/getEnquiry_Student")
//       .then((res) => {
//         const sdata = res.data.data.filter((item) => item.status === "Active");
//         setCategoriesData(sdata);
//       })
//       .catch((err) => console.error("Error fetching students:", err));

//     axios
//       .get("http://localhost:8000/getdataCourse")
//       .then((res) => {
//         const cdata = res.data.data.filter((item) => item.status === "Active");
//         setCategories(cdata);
//       })
//       .catch((err) => console.error("Error fetching courses:", err));

//     axios
//       .get("http://localhost:8000/getkititem")
//       .then((res) => {
//         const wdata = res.data.data.filter((item) => item.status === "Active");
//         setCategoriesKitData(wdata);
//       })
//       .catch((err) => console.error("Error fetching kits:", err));
//   };

//   // Handle checkbox changes for welcome kits
//   const handleCheckboxChange = (e, kitValue) => {
//     if (e.target.checked) {
//       setSelectedKits((prev) => [...prev, kitValue]);
//     } else {
//       setSelectedKits((prev) => prev.filter((kit) => kit !== kitValue));
//     }
//   };

//   // Handle form submission (POST or PUT)
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const updatedDate = new Date(date).toISOString();
//     const newData = {
//       course_name: capitalizeFirstLetter(course_name),
//       student_name: capitalizeFirstLetter(student_name),
//       date: updatedDate,
//       welcome_kit: selectedKits.join(", "),
//       status: capitalizeFirstLetter(status),
//     };

//     if (editingId) {
//       axios
//         .put(`http://localhost:8000/UpdateKit_FeesPaid/${editingId}`, newData)
//         .then((res) => {
//           alert("Data updated successfully");
//           showUsers();
//           handleClose();
//         })
//         .catch((err) => console.error(err))
//         .finally(() => setIsSubmitting(false));
//     } else {
//       axios
//         .post("http://localhost:8000/addKit_FeesPaid", newData)
//         .then((res) => {
//           alert("Course Added Successfully!");
//           handleClose();
//           showUsers();
//         })
//         .catch((err) => {
//           console.error(err);
//           alert("Failed to add data. Please try again.");
//         });
//     }
//   };

//   // Handle edit click
//   const handleEdit = (course) => {
//     setEditingId(course._id);
//     setCourse_Name(course.course_name);
//     setStudent_name(course.student_name);
//     setDate(new Date(course.date).toISOString().split("T")[0]);
//     setSelectedKits(course.welcome_kit.split(", "));
//     setStatus(course.status);
//     setShow(true);
//   };

//   // Handle delete
//   const deletedata = (_id) => {
//     axios
//       .delete(`http://localhost:8000/deleteKit_FeesPaid/${_id}`)
//       .then((res) => {
//         alert("Course deleted");
//         showUsers();
//       })
//       .catch((err) => console.error(err));
//   };

//     // Export to Excel
//    const handleExcel = () => {
//      const worksheet = XLSX.utils.json_to_sheet(
//        userData.map((a, index) => ({
//          "Sr.No": index + 1,
//          "Student Name": a.student_name,
//          "Course Name": a.course_name,
//          "Date": a.date,
//          "Welcome Kit": a.welcome_kit,
//        }))
//      );
//      const workbook = XLSX.utils.book_new();
//      XLSX.utils.book_append_sheet(workbook, worksheet, "Courses Data");
//      XLSX.writeFile(workbook, "courses-data.xlsx");
//    };

//    // Export to PDF
//    const handlePdf = () => {
//      const doc = new jsPDF();
//      doc.text("Courses Data", 14, 22);
//      doc.autoTable({
//        head: [["Sr.No", "Student Name", "Course Name", "Date", "welcome_kit"]],
//        body: userData.map((a, index) => [
//          index + 1,
//          a.student_name,
//          a.course_name,
//          a.date,
//          a.welcome_kit,
//        ]),
//        startY: 30,
//      });
//      doc.save("Courses-data.pdf");
//    };

//    // CSV data for export
//    const csvData = userData.map((a, index) => ({
//      "Sr.No": index + 1,
//      "Student Name": a.student_name,
//      "Course Name": a.course_name,
//      "Date": a.date,
//      "Welcome Kit": a.welcome_kit,
//    }));

//   // Handle search
//   const handleSearch = () => {
//     const filtered = userData.filter((item) => {
//       return (
//         item.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.welcome_kit.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.status.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     });
//     setFilteredData(filtered);
//   };

//   // Reset search
//   useEffect(() => {
//     if (searchTerm === "") {
//       setFilteredData(userData);
//     }
//   }, [searchTerm, userData]);

//   // Close modal and reset form
//   const handleClose = () => {
//     setCourse_Name("");
//     setStudent_name("");
//     setDate("");
//     setWelcome_kit("");
//     setStatus("Active");
//     setSelectedKits([]);
//     setEditingId(null);
//     setShow(false);
//   };

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//   return (
//     <Container className="d-flex justify-content-end">
//       <Row className="d-flex justify-content-center mt-2 pt-5">
//         {/* Breadcrumb */}
//         <Row>
//           <Col md={4}>
//             <Breadcrumb>
//               <Breadcrumb.Item href="/Head/">Home</Breadcrumb.Item>
//               <Breadcrumb.Item active>Welcome Kit Fees Paid</Breadcrumb.Item>
//             </Breadcrumb>
//           </Col>
//           <Col md={8} className="d-flex justify-content-end mb-4">
//             <Button variant="primary" onClick={() => setShow(true)}>
//               Add Course
//             </Button>
//           </Col>
//         </Row>

//         {/* Modal for Add/Edit */}
//         <Modal show={show} onHide={handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>
//               {editingId ? "Update Welcome Kit Fees Paid" : "Add Welcome Kit Fees Paid"}
//             </Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form onSubmit={handleSubmit}>
//               <Row>
//                 <Col md={12}>
//                   <Form.Label>Student Name</Form.Label>
//                   <Form.Select
//                     aria-label="Select student"
//                     value={student_name}
//                     onChange={(e) => setStudent_name(e.target.value)}
//                     required
//                   >
//                     <option value="">Choose a Student name</option>
//                     {categoriesdata.map((student) => (
//                       <option key={student._id} value={student.student_name}>
//                         {student.student_name}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Col>
//                 <Col md={12}>
//                   <Form.Label>Course Name</Form.Label>
//                   <Form.Select
//                     aria-label="Select course"
//                     value={course_name}
//                     onChange={(e) => setCourse_Name(e.target.value)}
//                     required
//                   >
//                     <option value="">Choose Course Name</option>
//                     {categories.map((course) => (
//                       <option key={course._id} value={course.course_name}>
//                         {course.course_name}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Col>
//                 <Col md={12}>
//                   <Form.Label>Date</Form.Label>
//                   <Form.Control
//                     type="date"
//                     value={date}
//                     onChange={(e) => setDate(e.target.value)}
//                     required
//                   />
//                 </Col>
//                 <Col md={12}>
//                   <Form.Label>Welcome Kit</Form.Label>
//                   {categorieskitdata.map((kit) => (
//                     <div key={kit._id}>
//                       <input
//                         type="checkbox"
//                         value={kit.welcome_kit}
//                         checked={selectedKits.includes(kit.welcome_kit)}
//                         onChange={(e) => handleCheckboxChange(e, kit.welcome_kit)}
//                       />
//                       <label>{kit.welcome_kit}</label>
//                     </div>
//                   ))}
//                 </Col>
//                 <Col md={12} className="d-flex mt-3">
//                   <Form.Label>Status</Form.Label>
//                   <Form.Check
//                     type="radio"
//                     label="Active"
//                     name="status"
//                     value="Active"
//                     checked={status === "Active"}
//                     onChange={(e) => setStatus(e.target.value)}
//                     className="ps-5"
//                   />
//                   <Form.Check
//                     type="radio"
//                     label="Inactive"
//                     name="status"
//                     value="Inactive"
//                     checked={status === "Inactive"}
//                     onChange={(e) => setStatus(e.target.value)}
//                     className="ps-5"
//                   />
//                 </Col>
//               </Row>
//             </Form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose}>
//               Close
//             </Button>
//             <Button
//               variant="primary"
//               onClick={handleSubmit}
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Saving..." : "Save Changes"}
//             </Button>
//           </Modal.Footer>
//         </Modal>

//         {/* Export Buttons */}
//         <Col md={8} className="">
//           <CSVLink data={csvData} filename={"course-data.csv"}>
//             <Button className="btn-secondary">CSV</Button>
//           </CSVLink>
//           <Button variant="primary" onClick={handleExcel} className="ms-1 btn-secondary">
//             Excel
//           </Button>
//           <Button variant="primary" onClick={handlePdf} className="ms-1 btn-secondary">
//             PDF
//           </Button>
//           <Button variant="primary" onClick={() => window.print()} className="ms-1 btn-secondary">
//             Print
//           </Button>
//         </Col>

//         {/* Search Input */}
//         <Col md={4} className="d-flex">
//           <InputGroup className="mb-3">
//             <Form.Control
//               type="text"
//               placeholder="Search for ...."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               onKeyPress={(e) => e.key === "Enter" && handleSearch()}
//             />
//             <InputGroup.Text id="basic-addon2" className="bg-secondary">
//               <FaSearch className="text-white" />
//             </InputGroup.Text>
//           </InputGroup>
//         </Col>

//         {/* Table */}
//         <Col md={12} lg={12} lx={12} lxx={12}>
//           <div style={{ overflowX: "auto" }}>
//             <Table striped bordered hover id="printable-table">
//               <thead>
//                 <tr>
//                   <th>Sr.No</th>
//                   <th>Student Name</th>
//                   <th>Course Name</th>
//                   <th>Date</th>
//                   <th>Welcome Kit</th>
//                   <th className="no-print">Status</th>
//                   <th className="no-print text-center">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentItems.map((a, index) => (
//                   <tr key={index}>
//                     <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
//                     <td>{a.student_name}</td>
//                     <td>{a.course_name}</td>
//                     <td>{new Date(a.date).toLocaleDateString()}</td>
//                     <td>{a.welcome_kit}</td>
//                     <td className="no-print">{a.status}</td>
//                     <td className="no-print d-flex justify-content-evenly">
//                       <Button variant="warning" onClick={() => handleEdit(a)}>
//                         <GrEdit />
//                       </Button>
//                       <Button variant="danger" onClick={() => deletedata(a._id)}>
//                         <AiFillDelete />
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </div>
//         </Col>

//         {/* Pagination */}
//         <Row>
//           <Col md={6}>
//             <div className="dataTables_info" aria-live="polite" role="status">
//               Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
//             </div>
//           </Col>
//           <Col md={6} className="d-flex justify-content-end">
//             <Pagination>
//               <Pagination.Prev
//                 disabled={currentPage === 1}
//                 onClick={() => setCurrentPage(currentPage - 1)}
//               >
//                 Previous
//               </Pagination.Prev>
//               {[...Array(totalPages)].map((_, index) => (
//                 <Pagination.Item
//                   key={index + 1}
//                   active={index + 1 === currentPage}
//                   onClick={() => setCurrentPage(index + 1)}
//                 >
//                   {index + 1}
//                 </Pagination.Item>
//               ))}
//               <Pagination.Next
//                 disabled={currentPage === totalPages}
//                 onClick={() => setCurrentPage(currentPage + 1)}
//               >
//                 Next
//               </Pagination.Next>
//             </Pagination>
//           </Col>
//         </Row>
//       </Row>
//     </Container>
//   );
// };

// export default Welcomekit_Feespaid;