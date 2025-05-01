import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Col, Container, Form, InputGroup, Row, Table } from "react-bootstrap";
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

const Batch = () => {
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [batch_name, setBatchName] = useState("");
    const [student_name, setStudentName] = useState("");
    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [status, setStatus] = useState("Active");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    // Helper function to format dates (removes time portion)
    const formatDate = (dateString) => {
        if (!dateString) return "";
        // If already in YYYY-MM-DD format
        if (typeof dateString === "string" && dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
            return dateString;
        }
        // If it's a Date object or ISO string
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
    };

    const capitalizeFirstLetter = (str) => {
        if (!str) return str;
        return str
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    };

    useEffect(() => {
        showUsers();
    }, []);

    const showUsers = () => {
        axios
            .get("http://localhost:8000/getAllBatches")
            .then((res) => {
                // Format dates to remove time when receiving data
                const formattedData = res.data.data.map(item => ({
                    ...item,
                    start_date: formatDate(item.start_date),
                    end_date: formatDate(item.end_date)
                }));
                setUserData(formattedData);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleClose = () => {
        setShow(false);
        setBatchName("");
        setStudentName("");
        setStartDate("");
        setEndDate("");
        setStatus("Active");
        setEditingId(null);
        setErrorMessage("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const newData = {
            batch_name: capitalizeFirstLetter(batch_name),
            student_name: capitalizeFirstLetter(student_name),
            start_date: formatDate(start_date), // Ensure no time is sent
            end_date: formatDate(end_date),     // Ensure no time is sent
            status: capitalizeFirstLetter(status),
        };

        if (editingId) {
            axios
                .put(`http://localhost:8000/updateBatch/${editingId}`, newData)
                .then(() => {
                    alert("Batch Updated Successfully!");
                    showUsers();
                    handleClose();
                })
                .catch((err) => {
                    if (err.response && err.response.status === 400) {
                        setErrorMessage("Batch already exists.");
                    } else {
                        console.error(err);
                    }
                })
                .finally(() => setIsSubmitting(false));
        } else {
            axios
                .post("http://localhost:8000/addBatch", newData)
                .then(() => {
                    alert("Batch Added Successfully!");
                    showUsers();
                    handleClose();
                })
                .catch((err) => {
                    if (err.response && err.response.status === 400) {
                        setErrorMessage("Batch already exists.");
                    } else {
                        console.error(err);
                    }
                })
                .finally(() => setIsSubmitting(false));
        }
    };

    const deletedata = (_id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            axios
                .delete(`http://localhost:8000/deleteBatch/${_id}`)
                .then(() => {
                    showUsers();
                })
                .catch((err) => console.error(err));
        }
    };

    const handleEdit = (batch) => {
        setEditingId(batch._id);
        setBatchName(batch.batch_name);
        setStudentName(batch.student_name);
        setStartDate(formatDate(batch.start_date)); // Format date when editing
        setEndDate(formatDate(batch.end_date));     // Format date when editing
        setStatus(batch.status);
        setShow(true);
        setErrorMessage("");
    };

    const handleExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            userData.map((a, index) => ({
                "Sr.No": index + 1,
                "Batch Name": a.batch_name,
                "Student Name": a.student_name,
                "Start Date": a.start_date, // Already formatted
                "End Date": a.end_date,      // Already formatted
                "Status": a.status
            }))
        );

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Batch Data");
        XLSX.writeFile(workbook, "Batch-data.xlsx");
    };

    const handlePdf = () => {
        const doc = new jsPDF();
        doc.text("Batch Data", 14, 22);
        doc.autoTable({
            head: [["Sr.No", "Batch Name", "Student Name", "Start Date", "End Date", "Status"]],
            body: userData.map((batch, index) => [
                index + 1,
                batch.batch_name,
                batch.student_name,
                batch.start_date, // Already formatted
                batch.end_date,   // Already formatted
                batch.status
            ]),
            startY: 30,
        });
        doc.save("Batch-data.pdf");
    };

    const csvData = userData.map((a, index) => ({
        "Sr.No": index + 1,
        "Batch Name": a.batch_name,
        "Student Name": a.student_name,
        "Start Date": a.start_date, // Already formatted
        "End Date": a.end_date,      // Already formatted
        "Status": a.status
    }));

    // Pagination logic remains the same
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(userData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = () => {
        const filteredData = userData.filter((item) => {
            return (
                (item.batch_name && item.batch_name.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.student_name && item.student_name.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.start_date && item.start_date.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.end_date && item.end_date.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.status && item.status.toString().toLowerCase().includes(searchTerm.toLowerCase()))
            );
        });
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
                            <Breadcrumb.Item href="/Head/">Home</Breadcrumb.Item>
                            <Breadcrumb.Item active>Batch</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col md={8} className="d-flex justify-content-end mb-4">
                        <Button variant="primary" onClick={() => setShow(true)}>
                            Add Batch
                        </Button>
                    </Col>
                </Row>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{editingId ? "Update Batch" : "Add Batch"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={12}>
                                    <Form.Label>Batch Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter batch Name"
                                        value={batch_name}
                                        onChange={(e) => setBatchName(e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col md={12}>
                                    <Form.Label>Student Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter student Name"
                                        value={student_name}
                                        onChange={(e) => setStudentName(e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Start Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={start_date}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>End Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={end_date}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
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
                                {errorMessage && (
                                    <Col md={12} className="text-danger">
                                        {errorMessage}
                                    </Col>
                                )}
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

                <Col md={8}>
                    <CSVLink data={csvData} filename={"Batch-data.csv"}>
                        <Button variant="secondary">CSV</Button>
                    </CSVLink>
                    <Button variant="secondary" onClick={handleExcel} className="ms-1">
                        Excel
                    </Button>
                    <Button variant="secondary" onClick={handlePdf} className="ms-1">
                        PDF
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => window.print()}
                        className="ms-1"
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
                                    <th>Batch Name</th>
                                    <th>Student Name</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Status</th>
                                    <th className="no-print text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((a, index) => (
                                    <tr key={index}>
                                        <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                        <td>{a.batch_name}</td>
                                        <td>{a.student_name}</td>
                                        <td>{a.start_date}</td>
                                        <td>{a.end_date}</td>
                                        <td>{a.status}</td>
                                        <td className="no-print d-flex justify-content-evenly">
                                            <Button
                                                variant="warning"
                                                className="no-print"
                                                onClick={() => handleEdit(a)}
                                            >
                                                <GrEdit />
                                            </Button>
                                            <Button
                                                variant="danger"
                                                className="no-print"
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
                            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, userData.length)} of {userData.length} entries
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

export default Batch;





// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Breadcrumb, Button, Col, Container, Form, InputGroup, Row, Table } from "react-bootstrap";
// import Pagination from "react-bootstrap/Pagination";
// import { AiFillDelete } from "react-icons/ai";
// import { GrEdit } from "react-icons/gr";
// import { CSVLink } from "react-csv";
// import * as XLSX from "xlsx";
// import Modal from "react-bootstrap/Modal";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import { FaSearch } from "react-icons/fa";

// const Batch = () => {
//     const [show, setShow] = useState(false);
//     const [batchData, setBatchData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(10);

//     // Batch Fields
//     //   const [batch_id, setBatchId] = useState("");
//     const [batch_name, setBatchName] = useState("");
//     const [start_date, setStartDate] = useState("");
//     //   const [student_name, setStudentName] = useState([]); // Array of student IDs
//     const [student_name, setStudentName] = useState([]); // Array of student IDs
//     const [end_date, setEndDate] = useState("");
//     const [status, setStatus] = useState("Active");
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [editingId, setEditingId] = useState(null);
//     // const [allstudent_name, setAllstudent_name] = useState([]); // Fetch from API

//     // Fetch Batch Data
//     useEffect(() => {
//         fetchBatches();
//         // fetchstudent_name(); // Load student options for dropdown
//     }, []);

//     const fetchBatches = () => {
//         axios.get("http://localhost:8000/getAllBatches")
//             .then((res) => setBatchData(res.data.data))
//             .catch((err) => console.error(err));
//     };

//     //   const fetchstudent_name = () => {
//     //     axios.get("http://localhost:8000/getstudent_name")
//     //       .then((res) => setAllstudent_name(res.data.data))
//     //       .catch((err) => console.error(err));
//     //   };

//     // Handle Modal Close
//     const handleClose = () => {
//         setShow(false);
//         resetForm();
//     };

//     const resetForm = () => {
//         // setBatchId("");
//         setBatchName("");
//         setStartDate("");
//         setStudentName("");
//         // setStudentName([]);
//         setEndDate("");
//         setStatus("Active");
//         setEditingId(null);
//     };

//     // Add/Update Batch
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);

//         const batch = {
//             //   batch_id,
//             batch_name,
//             start_date,
//             student_name,
//             end_date,
//             status,
//         };

//         const request = editingId
//             ? axios.put(`http://localhost:8000/updateBatch/${editingId}`, batch)
//             : axios.post("http://localhost:8000/addBatch", batch);

//         request
//             .then(() => {
//                 alert(`Batch ${editingId ? "Updated" : "Added"} Successfully!`);
//                 fetchBatches();
//                 handleClose();
//             })
//             .catch((err) => console.error(err))
//             .finally(() => setIsSubmitting(false));
//     };

//     // Delete Batch
//     const deleteBatch = (id) => {
//         if (window.confirm("Are you sure you want to delete this batch?")) {
//             axios.delete(`http://localhost:8000/deleteBatch/${id}`)
//                 .then(() => {
//                     alert("Batch Deleted!");
//                     fetchBatches();
//                 })
//                 .catch((err) => console.error(err));
//         }
//     };

//     // Edit Batch
//     const handleEdit = (batch) => {
//         setEditingId(batch._id);
//         // setBatchId(batch.batch_id);
//         setBatchName(batch.batch_name);
//         setStartDate(batch.start_date);
//         setStudentName(batch.student_name);
//         setEndDate(batch.end_date);
//         setStatus(batch.status);
//         setShow(true);
//     };

//     // Export Functions (Excel, PDF, CSV)
//     const handleExcel = () => {
//         const worksheet = XLSX.utils.json_to_sheet(
//             batchData.map((batch, index) => ({
//                 "Sr.No": index + 1,
//                 // "Batch ID": batch.batch_id,
//                 "Batch Name": batch.batch_name,
//                 "Start Date": batch.start_date,
//                 "End Date": batch.end_date,
//                 "Student Name": batch.student_name,
//                 // "student_name": batch.student_name.length,
//                 "Status": batch.status,
//             }))
//         );
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Batch Data");
//         XLSX.writeFile(workbook, "Batch-data.xlsx");
//     };

//     const handlePdf = () => {
//         const doc = new jsPDF();
//         doc.text("Batch Data", 14, 22);
//         doc.autoTable({
//             head: [["Sr.No", "Batch Name", "Start Date", "Student Name", "End Date", "Status"]],
//             body: batchData.map((batch, index) => [
//                 index + 1,
//                 // batch.batch_id,
//                 batch.batch_name,
//                 batch.start_date,
//                 batch.student_name,
//                 batch.end_date,
//                 batch.status,
//             ]),
//             startY: 30,
//         });
//         doc.save("Batch-data.pdf");
//     };

//     const csvData = batchData.map((batch, index) => ({
//         "Sr.No": index + 1,
//         // "Batch ID": batch.batch_id,
//         "Batch Name": batch.batch_name,
//         "Start Date": batch.start_date,
//         "End Date": batch.end_date,
//         "Student Name": batch.student_name,
//         // "student_name": batch.student_name.length,
//         "Status": batch.status,
//     }));

//     // Pagination
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = batchData.slice(indexOfFirstItem, indexOfLastItem);
//     const totalPages = Math.ceil(batchData.length / itemsPerPage);

//     // Search
//     const handleSearch = () => {
//         const filtered = batchData.filter((batch) => {
//           return (
//             (batch.batch_name && batch.duration.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
//             (batch.start_date && batch.amount.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
//             (batch.end_date && batch.amount.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
//             (batch.student_name && batch.amount.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
//             (batch.status && batch.status.toString().toLowerCase().includes(searchTerm.toLowerCase()))
//           );
//         });
//         setBatchData(filtered);
//       };


//     // const handleSearch = () => {
//     //     const filtered = batchData.filter((batch) =>
//     //         //   batch.batch_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     //         batch.batch_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     //         batch.start_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     //         batch.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     //         batch.end_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     //         batch.status.toLowerCase().includes(searchTerm.toLowerCase())
//     //     );
//     //     setBatchData(filtered);
//     // };

//     return (
//         <Container className="mt-5 pt-3">
//             <Row>
//                 <Col md={4}>
//                     <Breadcrumb>
//                         <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
//                         <Breadcrumb.Item active>Batches</Breadcrumb.Item>
//                     </Breadcrumb>
//                 </Col>
//                 <Col md={8} className="d-flex justify-content-end mb-4">
//                     <Button variant="primary" onClick={() => setShow(true)}>
//                         Add Batch
//                     </Button>
//                 </Col>
//             </Row>

//             {/* Batch Modal */}
//             <Modal show={show} onHide={handleClose} size="lg">
//                 <Modal.Header closeButton>
//                     <Modal.Title>{editingId ? "Edit Batch" : "Add Batch"}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form onSubmit={handleSubmit}>
//                         <Row>
//                             {/* <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Batch ID</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="BATCH_2024_01"
//                     value={batch_id}
//                     onChange={(e) => setBatchId(e.target.value)}
//                     required
//                   />
//                 </Form.Group>
//               </Col> */}
//                             <Col md={12}>
//                                 <Form.Group className="mb-3">
//                                     <Form.Label>Batch Name</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         // placeholder="Advanced Web Development"
//                                         placeholder="BATCH_2024_01"
//                                         value={batch_name}
//                                         onChange={(e) => setBatchName(e.target.value)}
//                                         required
//                                     />
//                                 </Form.Group>
//                             </Col>
//                             <Col md={6}>
//                                 <Form.Group className="mb-3">
//                                     <Form.Label>Start Date</Form.Label>
//                                     <Form.Control
//                                         type="date"
//                                         value={start_date}
//                                         onChange={(e) => setStartDate(e.target.value)}
//                                         required
//                                     />
//                                 </Form.Group>
//                             </Col>
//                             <Col md={6}>
//                                 <Form.Group className="mb-3">
//                                     <Form.Label>End Date</Form.Label>
//                                     <Form.Control
//                                         type="date"
//                                         value={end_date}
//                                         onChange={(e) => setEndDate(e.target.value)}
//                                         min={start_date} // Ensures end date >= start date
//                                         required
//                                     />
//                                 </Form.Group>
//                             </Col>
//                             <Col md={12}>
//                                 <Form.Label>Student Name</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="Enter student Name"
//                                     value={student_name}
//                                     onChange={(e) => setStudentName(e.target.value)}
//                                     // required
//                                 />
//                                 {/* <Form.Group className="mb-3">
//                   <Form.Label>student_name</Form.Label>
//                   <Form.Select
//                     multiple
//                     value={student_name}
//                     onChange={(e) =>
//                       setStudentName(Array.from(e.target.selectedOptions, (opt) => opt.value))
//                     }
//                   >
//                     {allstudent_name.map((student) => (
//                       <option key={student._id} value={student._id}>
//                         {student.name} ({student.email})
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group> */}
//                             </Col>
//                             <Col md={12} className="d-flex mt-3" >
//                                 <Form.Label className="me-2">Status</Form.Label>
//                                 <Form.Check
//                                     type="radio"
//                                     label="Active"
//                                     name="status"
//                                     value="Active"
//                                     checked={status === "Active"}
//                                     onChange={(e) => setStatus(e.target.value)}
//                                 />
//                                 <Form.Check
//                                     type="radio"
//                                     label="Inactive"
//                                     name="status"
//                                     value="Inactive"
//                                     checked={status === "Inactive"}
//                                     onChange={(e) => setStatus(e.target.value)}
//                                 />
//                             </Col>
//                         </Row>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Close
//                     </Button>
//                     <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
//                         {isSubmitting ? "Saving..." : "Save Changes"}
//                     </Button>
//                 </Modal.Footer>
//             </Modal>

//             {/* Export Buttons */}
//             <Row className="mb-3">
//                 <Col md={8}>
//                     <CSVLink data={csvData} filename="Batch-data.csv">
//                         <Button variant="secondary" className="me-2">CSV</Button>
//                     </CSVLink>
//                     <Button variant="secondary" className="me-2" onClick={handleExcel}>Excel</Button>
//                     <Button variant="secondary" className="me-2" onClick={handlePdf}>PDF</Button>
//                     {/* <Button variant="secondary" onClick={() => window.print()}>Print</Button> */}
//                     <Button
//                                 variant="secondary"
//                                 onClick={() => window.print()}
//                                 className="ms-1"
//                               >
//                                 Print
//                               </Button>
//                 </Col>
//                 <Col md={4} className="d-flex">
//                           <InputGroup className="mb-3">
//                             <Form.Control
//                               type="text"
//                               placeholder="Search for ...."
//                               value={searchTerm}
//                               className="ms-2"
//                               onChange={(e) => setSearchTerm(e.target.value)}
//                             //   onKeyPress={handleKeyPress}
//                               onChangeCapture={handleSearch}
//                             />
//                             <InputGroup.Text id="basic-addon2" className="bg-secondary">
//                               <FaSearch className="text-white" />
//                             </InputGroup.Text>
//                           </InputGroup>
//                         </Col>
//             </Row>

//             {/* Batch Table */}
//             <Table striped bordered hover responsive>
//                 <thead>
//                     <tr>
//                         <th>Sr.No</th>
//                         {/* <th>Batch ID</th> */}
//                         <th>Batch Name</th>
//                         <th>Start Date</th>
//                         <th>End Date</th>
//                         <th>Student Name</th>
//                         <th>Status</th>
//                         <th className="no-print">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {currentItems.map((batch, index) => (
//                         <tr key={batch._id}>
//                             <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
//                             {/* <td>{batch.batch_id}</td> */}
//                             <td>{batch.batch_name}</td>
//                             <td>{new Date(batch.start_date).toLocaleDateString()}</td>
//                             <td>{new Date(batch.end_date).toLocaleDateString()}</td>
//                             <td>{batch.student_name}</td>
//                             {/* <td>{batch.student_name.length}</td> */}
//                             <td>{batch.status}</td>
//                             <td className="no-print">
//                                 <Button variant="warning" size="sm" onClick={() => handleEdit(batch)}>
//                                     <GrEdit />
//                                 </Button>{" "}
//                                 <Button variant="danger" size="sm" onClick={() => deleteBatch(batch._id)}>
//                                     <AiFillDelete />
//                                 </Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>

//             {/* Pagination */}
//             <Row>
//                 <Col md={6}>
//                     Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, batchData.length)} of {batchData.length} entries
//                 </Col>
//                 <Col md={6} className="d-flex justify-content-end">
//                     <Pagination>
//                         <Pagination.Prev
//                             disabled={currentPage === 1}
//                             onClick={() => setCurrentPage(currentPage - 1)}
//                         />
//                         {[...Array(totalPages)].map((_, i) => (
//                             <Pagination.Item
//                                 key={i + 1}
//                                 active={i + 1 === currentPage}
//                                 onClick={() => setCurrentPage(i + 1)}
//                             >
//                                 {i + 1}
//                             </Pagination.Item>
//                         ))}
//                         <Pagination.Next
//                             disabled={currentPage === totalPages}
//                             onClick={() => setCurrentPage(currentPage + 1)}
//                         />
//                     </Pagination>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default Batch;


