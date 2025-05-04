import axios from "axios";
import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

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

const Installment= () => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setStudent_Name("");
    setCourse_Name("");
    setFees_date("");
    setDuration("");
    setAmount("");
    setInstallmentAmount("");
    setInstallment("");
    setStatus("Active");
    setShow(false);
  };

  // const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust as needed
  // const navigate = useNavigate();
const[student_name, setStudent_Name] = useState("");
const[installment_no, setInstallment] = useState("");
  const [course_name, setCourse_Name] = useState("");
  const [fees_date, setFees_date] = useState("");
  const [duration, setDuration] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Active"); // Default status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Search input value
  const [editingId, setEditingId] = useState(null); // Track which ID is being edited
  const [categoriesdata, setCategoriesData] = useState([]);
   const [iamount, setInstallmentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(""); 

  // const [categories, setCategories] = useState([]);

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
      .get("http://localhost:8000/getinstallment")
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
        })
        .catch((err) => console.error("Error fetching categories:", err));
  
    // axios
    //   .get("http://localhost:8000/getdataDuration")
    //   .then((res) => {
    //     const ddata = res.data.data.filter((item) => item.status === "Active");
    //     setCategoriesData(ddata);
    //     console.log("Categories fetched:", res.data.data);
    //   })
    //   .catch((err) => {
    //     console.error("Error fetching categories:", err);
    //   });


    // axios
    //   .get("http://localhost:8000/getdataCourse")
    //   .then((res) => {
    //     const cdata = res.data.data.filter((item) => item.status === "Active");
    //     setCategories(cdata);
    //     console.log("Categories fetched:", res.data.data);
    //   })
    //   .catch((err) => {
    //     console.error("Error fetching categories:", err);
    //   });
  }, []);

  // Handle Edit Click
  const handleEdit = (installment) => {
    setEditingId(installment._id);
    setStudent_Name(installment.student_name);
    setInstallment(installment.installment_no);
    setCourse_Name(installment.course_name);
    setFees_date(new Date(installment.date).toISOString().split("T")[0]);;
    setDuration(installment.duration);
    setAmount(installment.amount);
    setInstallmentAmount(installment.iamount);
    setStatus(installment.status);
    setShow(true);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const updatedDate = new Date(fees_date).toISOString();    
    
      const newData = {
        student_name: capitalizeFirstLetter(student_name),
        installment_no,
        course_name: capitalizeFirstLetter(course_name),
        fees_date: updatedDate,
        duration: capitalizeFirstLetter(duration),
        amount,
        iamount,
        status: capitalizeFirstLetter(status),
        payment_method: paymentMethod, // <-- Add this line
      };
      
    

    if (editingId) {
      axios
        .put(`http://localhost:8000/updateinstallment/${editingId}`, newData)
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
        .post("http://localhost:8000/addinstallment", newData)
        .then((res) => {
          // console.log("Data Added:", res.data);
          alert("Installment Added Successfully!");
          setStudent_Name("");
          setInstallment("");
          setCourse_Name("");
          setFees_date("");
          setDuration("");
          setAmount("");
          setInstallmentAmount("");
          setStatus("Active");
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
      .delete(`http://localhost:8000/deleteinstallment/${_id}`)
      .then((res) => {
        console.log("Installment Deleted:", res.data);
        alert("Installment deleted");
        showUsers();
      })
      .catch((err) => console.error(err));
  };
  //Generate Receipt
  // const GenerateReceipt = ({ installmentId }) => {
  //   const [receiptUrl, setReceiptUrl] = useState("");
  
  const handleGenerateReceipt = (id) => {
    navigate(`/GenerateReceipt/${id}`);
};
    // const handleGenerateReceipt = async () => {
    //   try {
    //     const response = await axios.get(`http://localhost:8000/Receipt/${installmentId}`);
    //     setReceiptUrl(response.data.receiptUrl);
    //   } catch (error) {
    //     console.error("Error generating receipt:", error);
    //   }
    // };

  // Export to Excel
  const handleExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      userData.map((a, index) => ({
        "Sr.No": index + 1,
        "Installment No.":a.installment_no,
        "Student Name":a.student_name,
        "Fees Date": a.fees_date,
        "Course Name": a.course_name,
        "Course Duration": a.duration,
        "Course Fees": a.amount,
        "Installment Amount":a.iamount,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Installment Data");
    XLSX.writeFile(workbook, "Installment-data.xlsx");
  };

  // Export to PDF
  const handlePdf = () => {
    const doc = new jsPDF();
    doc.text("Installment Data", 14, 22);
    doc.autoTable({
      head: [
        ["Sr.No", "Installment No.","Student Name","Fees Date", "Course Name", "Course Duration","Course Fees", "Installment Amount"],
      ],
      body: userData.map((a, index) => [
        index + 1,
        a.installment_no,
        a.student_name,
        a.fees_date,
        a.course_name,
        a.duration,
        a.amount,
        a.iamount,
      ]),
      startY: 30,
    });
    doc.save("installment-data.pdf");
  };

  // CSV data for export
  const csvData = userData.map((a, index) => ({
    "Sr.No": index + 1,
    "Installment No.":a.installment_no,
    "Student Name":a.student_name,
    "Fees Date": a.fees_date,
    "Course Name": a.course_name,
    "Course Duration": a.duration,
    "Course Fees": a.amount,
    "Installmetn Amount":a.iamount,
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
      String(item.student_name).toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(item.installment_no).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.course_name).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.fees_date).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.duration).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.amount).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.iamount).toLowerCase().includes(searchTerm.toLowerCase()) ||
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
              <Breadcrumb.Item active>Fees Installment</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col md={8} className="d-flex justify-content-end mb-4">
            <Button variant="primary" onClick={() => setShow(true)}>
              Add Installment
            </Button>
          </Col>
        </Row>

        {/* Add Technology Modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingId ? " Update Fees Installment" : "Add Fees Installment"}
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
                    onChange={(e) => setStudent_Name(e.target.value)}
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
                  <Form.Label>Installment No.</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter installment no."
                    value={installment_no}
                    onChange={(e) => setInstallment(e.target.value)}
                    required
                  />
                </Col>

                <Col md={12}>
                  <Form.Label>Fees Date</Form.Label>
                  <Form.Control
                    type="date"
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
                    {categoriesdata.map((course) => (
                      <option key={course._id} value={course.course_name}>
                        {course.course_name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Col md={12}>
                  <Form.Label>Duration</Form.Label>
                  <Form.Select
                    aria-label="select duration"
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
                <Col md={12}>
  <Form.Label>Payment Method</Form.Label>
  <Form.Select
    aria-label="Select Payment Method"
    value={paymentMethod}
    onChange={(e) => setPaymentMethod(e.target.value)}
    required
  >
    <option value="">Choose Payment Method</option>
    <option value="Cash">Cash</option>
    <option value="Credit Card">Credit Card</option>
    <option value="Debit Card">Debit Card</option>
    <option value="UPI">UPI</option>
    <option value="Bank Transfer">Bank Transfer</option>
  </Form.Select>
</Col>
<Col md={12}>
                  <Form.Label>Installment Amount</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Amount"
                    value={iamount}
                    onChange={(e) => setInstallmentAmount(e.target.value)}
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
                  <th>Student Name</th>
                  <th>Installment No.</th>
                  <th>Course Name</th>
                  <th>Fees Date</th>
                  <th>Course Duration</th>
                  <th>Course Fees</th>
                  <th>Payment Method</th>
                  <th>Installment Amount</th>
                  <th className="no-print">Status</th>
                  <th className="no-print text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((a, index) => (
                  <tr key={index}>
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td>{a.student_name}</td>
                    <td>{a.installment_no}</td>
                    <td>{a.course_name}</td>
                    <td>{formatDate(a.fees_date)}</td>
                    <td>{a.duration}</td>
                    <td>{a.amount}</td>
                    <td>{a.payment_method}</td>
                    <td>{a.iamount}</td>
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
                      <button className="btn btn-info btn-sm"
                       onClick={() => handleGenerateReceipt(a._id)}>Generate Receipt</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
        {/* <div>
      <button onClick={handleGenerateReceipt}>Generate Receipt</button>
      {receiptUrl && (
        <div>
          <p>Receipt Generated: <a href={receiptUrl} target="_blank" rel="noopener noreferrer">Download Receipt</a></p>
        </div>
      )}
    </div> */}
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

export default Installment;
