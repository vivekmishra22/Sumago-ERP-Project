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
// import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import Modal from "react-bootstrap/Modal";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaSearch } from "react-icons/fa";

const Admission_Fees = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setCourse_Name("");
    setFees_date("");
    setDuration("");
    setAmount("");
    setStatus("Active");
    setShow(false);
  };

  // const handleShow = () => setShow(true);

  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust as needed
  // const navigate = useNavigate();

  const [course_name, setCourse_Name] = useState("");
  const [fees_date, setFees_date] = useState("");
  const [duration, setDuration] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Active"); // Default status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Search input value
  const [editingId, setEditingId] = useState(null); // Track which ID is being edited
  const [categoriesdata, setCategoriesData] = useState([]);
  const [categories, setCategories] = useState([]);

  // const capitalizeFirstLetter = (str) => {
  //   if (!str) return str;
  //   return str
  //     .split(" ") // Split the string into words
  //     .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
  //     .join(" "); // Join them back together
  // };

  function capitalizeFirstLetter(input) {
    if (typeof input === 'string') {
      return input.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
     else {
      console.error('Input is not a string!');
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
      .get("http://localhost:8000/getdataAdmissionFees")
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
      .get("http://localhost:8000/getdataDuration")
      .then((res) => {
        const ddata = res.data.data.filter((item) => item.status === "Active");
        setCategoriesData(ddata);
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
  }, []);

  // Handle Edit Click
  const handleEdit = (course) => {
    setEditingId(course._id);
    setCourse_Name(course.course_name);
    setFees_date(new Date(course.fees_date).toISOString().split("T")[0]);
    setDuration(course.duration);
    setAmount(course.amount);
    setStatus(course.status);
    setShow(true);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updatedDate = new Date(fees_date).toISOString();
    const newData = {
      course_name: capitalizeFirstLetter(course_name),
      fees_date: updatedDate,
      duration: capitalizeFirstLetter(duration),
      amount: capitalizeFirstLetter(amount),
      status: capitalizeFirstLetter(status),
    };

    if (editingId) {
      axios
        .put(`http://localhost:8000/UpdateAdmissionFees/${editingId}`, newData)
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
        .post("http://localhost:8000/addAdmissionFees", newData)
        .then((res) => {
          // console.log("Data Added:", res.data);
          alert("Course Added Successfully!");
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
      .delete(`http://localhost:8000/deleteAdmissionFees/${_id}`)
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
        "Fees Date": a.fees_date,
        "Course Name": a.course_name,
        "Course Duration": a.duration,
        "Amount": a.amount,
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
      head: [
        ["Sr.No", "Fees Date", "Course Name", "Course Duration", "Amount"],
      ],
      body: userData.map((a, index) => [
        index + 1,
        a.fees_date,
        a.course_name,
        a.duration,
        a.amount,
      ]),
      startY: 30,
    });
    doc.save("Courses-data.pdf");
  };

  // CSV data for export
  const csvData = userData.map((a, index) => ({
    "Sr.No": index + 1,
    "Fees Date": a.fees_date,
    "Course Name": a.course_name,
    "Course Duration": a.duration,
    "Amount": a.amount,
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
    const filteredData = userData.filter((item) => 
      String(item.course_name).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.fees_date).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.duration).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.amount).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.status).toLowerCase().includes(searchTerm.toLowerCase())
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
              <Breadcrumb.Item active>Fees structure</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col md={8} className="d-flex justify-content-end mb-4">
            <Button variant="primary" onClick={() => setShow(true)}>
              Add Fees Structure
            </Button>
          </Col>
        </Row>

        {/* Add Technology Modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            {/* <Modal.Title>
              {editingId ? " Update Adission Fees" : "Add Adission Fees"}
            </Modal.Title> */}
            <Modal.Title>
              {editingId ? "Update Fees Structure" : "Add Fees Structure"} {/* Conditional title */}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={12}>
                  <Form.Label>Fees Date</Form.Label>
                  <Form.Control
                    type="Date"
                    placeholder="Enter Fees Date"
                    value={fees_date}
                    onChange={(e) => setFees_date(e.target.value)}
                    required
                  />
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
                  <Form.Label>Duration</Form.Label>
                  <Form.Select
                    aria-label="select Course"
                    value={duration}
                    onChange={(e) => {
                      const selectedDuration = e.target.value;
                      setDuration(selectedDuration);

                      // Find the corresponding amount based on the selected duration
                      const selectedCategory = categoriesdata.find(
                        (category) => category.duration === selectedDuration
                      );

                      // If a matching category is found, set the amount
                      if (selectedCategory) {
                        setAmount(selectedCategory.amount);
                      }
                    }}
                    required
                  >
                    <option value="">Choose Duration</option>
                    {categoriesdata.map((category) => (
                      <option key={category._id} value={category.duration}>
                        {category.duration}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Col md={12}>
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
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

        <Col md={12} lg={12} lx={12} lxx={12}>
          <div style={{ overflowX: "auto" }}>
            <Table striped bordered hover id="printable-table">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Course Name</th>
                  <th>Fees Date</th>
                  <th>Course Duration</th>
                  <th>Amount</th>
                  <th className="no-print">Status</th>
                  <th className="no-print text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((a, index) => (
                  <tr key={index}>
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td>{a.course_name}</td>
                    <td>{formatDate(a.fees_date)}</td>
                    <td>{a.duration}</td>
                    <td>{a.amount}</td>
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

export default Admission_Fees;


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
//   Pagination,
// } from "react-bootstrap";
// import { AiFillDelete} from "react-icons/ai";
// import { CSVLink } from "react-csv";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import { FaSearch } from "react-icons/fa";
// import axios from "axios";
// import { GrEdit } from "react-icons/gr";

// const Admission_Fees = () => {
//   // State variables
//   const [show, setShow] = useState(false);
//   const [userData, setUserData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [course_name, setCourse_Name] = useState("");
//   const [fees_date, setFees_date] = useState("");
//   const [duration, setDuration] = useState("");
//   const [amount, setAmount] = useState("");
//   const [status, setStatus] = useState("Active");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [editingId, setEditingId] = useState(null);
//   const [categoriesdata, setCategoriesData] = useState([]);
//   const [categories, setCategories] = useState([]);

//   // Fetch data on component mount
//   useEffect(() => {
//     showUsers();
//     fetchCategories();
//   }, []);

//   function capitalizeFirstLetter(input) {
//     if (typeof input === 'string') {
//       return input.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
//     }
//      else {
//       console.error('Input is not a string!');
//       return input; // Or handle accordingly
//     }
//   }

//   // Fetch users from the API
//   const showUsers = () => {
//     axios
//       .get("http://localhost:8000/getdataAdmissionFees")
//       .then((res) => {
//         setUserData(res.data.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching data:", err);
//         alert("Failed to fetch data. Please check your network connection.");
//       });
//   };

//   // Fetch categories and durations
//   const fetchCategories = () => {
//     axios
//       .get("http://localhost:8000/getdataDuration")
//       .then((res) => {
//         const ddata = res.data.data.filter((item) => item.status === "Active");
//         setCategoriesData(ddata);
//       })
//       .catch((err) => {
//         console.error("Error fetching durations:", err);
//       });

//     axios
//       .get("http://localhost:8000/getdataCourse")
//       .then((res) => {
//         const cdata = res.data.data.filter((item) => item.status === "Active");
//         setCategories(cdata);
//       })
//       .catch((err) => {
//         console.error("Error fetching courses:", err);
//       });
//   };

//   // Handle modal close
//   const handleClose = () => {
//     setShow(false);
//     setCourse_Name("");
//     setFees_date("");
//     setDuration("");
//     setAmount("");
//     setStatus("Active");
//     setEditingId(null);
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const newData = {
//       // course_name,
//       // fees_date,
//       // duration,
//       // amount,
//       // status,
//       course_name: capitalizeFirstLetter(course_name),
//       fees_date: capitalizeFirstLetter(fees_date),
//       duration: capitalizeFirstLetter(duration),
//       amount: capitalizeFirstLetter(amount),
//       status: capitalizeFirstLetter(status),
//     };

//     if (editingId) {
//       // Update existing record
//       axios
//         .put(`http://localhost:8000/UpdateAdmissionFees/${editingId}`, newData)
//         .then(() => {
//           alert("Data updated successfully");
//           showUsers();
//           handleClose();
//         })
//         .catch((err) => console.error("Error updating data:", err))
//         .finally(() => setIsSubmitting(false));
//     } else {
//       // Add new record
//       axios
//         .post("http://localhost:8000/addAdmissionFees", newData)
//         .then(() => {
//           alert("Data added successfully");
//           showUsers();
//           handleClose();
//         })
//         .catch((err) => {
//           console.error("Error adding data:", err);
//           alert("Failed to add data. Please try again.");
//         })
//         .finally(() => setIsSubmitting(false));
//     }
//   };

//   // Handle edit
//   const handleEdit = (course) => {
//     setEditingId(course._id);
//     setCourse_Name(course.course_name);
//     setFees_date(course.fees_date);
//     setDuration(course.duration);
//     setAmount(course.amount);
//     setStatus(course.status);
//     setShow(true);
//   };

//   // Handle delete
//   const deletedata = (_id) => {
//     if (window.confirm("Are you sure you want to delete this record?")) {
//       axios
//         .delete(`http://localhost:8000/deleteAdmissionFees/${_id}`)
//         .then(() => {
//           alert("Record deleted successfully");
//           showUsers();
//         })
//         .catch((err) => console.error("Error deleting data:", err));
//     }
//   };

//   // Export to Excel
//   const handleExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(
//       userData.map((a, index) => ({
//         "Sr.No": index + 1,
//         "Fees Date": a.fees_date,
//         "Course Name": a.course_name,
//         "Course Duration": a.duration,
//         Amount: a.amount,
//       }))
//     );
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Admission Fees Data");
//     XLSX.writeFile(workbook, "admission-fees-data.xlsx");
//   };

//   // Export to PDF
//   const handlePdf = () => {
//     const doc = new jsPDF();
//     doc.text("Admission Fees Data", 14, 22);
//     doc.autoTable({
//       head: [["Sr.No", "Fees Date", "Course Name", "Course Duration", "Amount"]],
//       body: userData.map((a, index) => [
//         index + 1,
//         a.fees_date,
//         a.course_name,
//         a.duration,
//         a.amount,
//       ]),
//       startY: 30,
//     });
//     doc.save("admission-fees-data.pdf");
//   };

//   // CSV data for export
//   const csvData = userData.map((a, index) => ({
//     "Sr.No": index + 1,
//     "Fees Date": a.fees_date,
//     "Course Name": a.course_name,
//     "Course Duration": a.duration,
//     Amount: a.amount,
//   }));

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(userData.length / itemsPerPage);

//   // Handle search
//    const handleSearch = () => {
//      const filteredData = userData.filter(
//        (item) =>
//          item.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//          item.fees_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
//          item.duration.toLowerCase().includes(searchTerm.toLowerCase()) ||
//          item.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
//          item.status.toLowerCase().includes(searchTerm.toLowerCase())
//      );
//      setUserData(filteredData); // Update the table data
//    };

//   return (
//     <Container className="d-flex justify-content-end">
//       <Row className="d-flex justify-content-center mt-2 pt-5">
//         {/* Breadcrumb */}
//         <Row>
//           <Col md={4}>
//             <Breadcrumb>
//               <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
//               <Breadcrumb.Item active>Admission Fees</Breadcrumb.Item>
//             </Breadcrumb>
//           </Col>
//           <Col md={8} className="d-flex justify-content-end mb-4">
//             <Button variant="primary" onClick={() => setShow(true)}>
//               Add Admission Fees
//             </Button>
//           </Col>
//         </Row>

//         {/* Modal for Add/Edit */}
//         <Modal show={show} onHide={handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>
//               {editingId ? "Update Admission Fees" : "Add Admission Fees"}
//             </Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form onSubmit={handleSubmit}>
//               <Row>
//                 <Col md={12}>
//                   <Form.Label>Fees Date</Form.Label>
//                   <Form.Control
//                     type="date"
//                     value={fees_date}
//                     onChange={(e) => setFees_date(e.target.value)}
//                     required
//                   />
//                 </Col>
//                 <Col md={12}>
//                   <Form.Label>Course Name</Form.Label>
//                   <Form.Select
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
//                   <Form.Label>Duration</Form.Label>
//                   <Form.Select
//                     value={duration}
//                     onChange={(e) => {
//                       const selectedDuration = e.target.value;
//                       setDuration(selectedDuration);

//                       // Find the corresponding amount based on the selected duration
//                       const selectedCategory = categoriesdata.find(
//                         (category) => category.duration === selectedDuration
//                       );

//                       // If a matching category is found, set the amount
//                       if (selectedCategory) {
//                         setAmount(selectedCategory.amount);
//                       }
//                     }}
//                     required
//                   >
//                     <option value="">Choose Duration</option>
//                     {categoriesdata.map((category) => (
//                       <option key={category._id} value={category.duration}>
//                         {category.duration}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Col>
//                 <Col md={12}>
//                   <Form.Label>Amount</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={amount}
//                     onChange={(e) => setAmount(e.target.value)}
//                     required
//                   />
//                 </Col>
//                 <Col md={12} className="d-flex mt-3">
//                   <Form.Label>Status</Form.Label>
//                   <Form.Check
//                     type="radio"
//                     label="Active"
//                     name="status"
//                     value="Active"
//                     className="ps-5"
//                     checked={status === "Active"}
//                     onChange={(e) => setStatus(e.target.value)}
//                   />
//                   <Form.Check
//                     type="radio"
//                     label="Inactive"
//                     name="status"
//                     value="Inactive"
//                     className="ps-5"
//                     checked={status === "Inactive"}
//                     onChange={(e) => setStatus(e.target.value)}
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
//         <Col md={8}>
//           <CSVLink data={csvData} filename={"admission-fees-data.csv"}>
//             <Button className="btn-secondary">CSV</Button>
//           </CSVLink>
//           <Button onClick={handleExcel} className="ms-1 btn-secondary">
//             Excel
//           </Button>
//           <Button onClick={handlePdf} className="ms-1 btn-secondary">
//             PDF
//           </Button>
//           <Button onClick={() => window.print()} className="ms-1 btn-secondary">
//             Print
//           </Button>
//         </Col>

//         {/* Search Input */}
//          <Col md={4} className=" d-flex">
//            <InputGroup className="mb-3  ">
//              <Form.Control
//                type="text"
//                placeholder="Search for ...."
//                value={searchTerm}
//                className="ms-2"
//                onChange={(e) => setSearchTerm(e.target.value)}
//               //  onKeyPress={handleKeyPress}
//                onChangeCapture={handleSearch}
//                aria-label="Recipient's username"
//                aria-describedby="basic-addon2"
//              />
//              <InputGroup.Text id="basic-addon2" className=" bg-secondary ">
//                <FaSearch className="text-white" />
//              </InputGroup.Text>
//            </InputGroup>
//          </Col>

//         {/* Table */}
//         <Col md={12} lg={12} xl={12} xxl={12}>
//           <div style={{ overflowX: "auto" }}>
//             <Table striped bordered hover id="printable-table">
//               <thead>
//                 <tr>
//                   <th>Sr.No</th>
//                   <th>Course Name</th>
//                   <th>Fees Date</th>
//                   <th>Course Duration</th>
//                   <th>Amount</th>
//                   <th className="no-print">Status</th>
//                   <th className="no-print text-center">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentItems.map((a, index) => (
//                   <tr key={index}>
//                     <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
//                     <td>{a.course_name}</td>
//                     <td>{a.fees_date}</td>
//                     <td>{a.duration}</td>
//                     <td>{a.amount}</td>
//                     <td className="no-print">{a.status}</td>
//                     <td className="no-print d-flex justify-content-evenly">
//                       <Button
//                         variant="warning"
//                         className="no-print"
//                         onClick={() => handleEdit(a)}
//                       >
//                         <GrEdit />
//                       </Button>
//                       <Button
//                         variant="danger"
//                         className="no-print"
//                         onClick={() => deletedata(a._id)}
//                       >
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
//               Showing {indexOfFirstItem + 1} to {Math.min(
//                 indexOfLastItem,
//                 userData.length
//               )} of {userData.length} entries
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

// export default Admission_Fees;