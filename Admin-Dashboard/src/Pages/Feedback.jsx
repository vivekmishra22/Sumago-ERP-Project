import axios from "axios";
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
// import Feedback from "react-bootstrap/esm/Feedback";

const Feedback = () => {
    const [show, setShow] = useState(false);
    // const handleShow = () => setShow(true);

    const [userData, setUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Adjust as needed

    const [user_name, setUserName] = useState("");
    const [course_name, setCourseName] = useState("");
    const [trainer_name, setTrainerName] = useState("");
    const [current_date, setCurrentDate] = useState("");
    const [training_rating, setTrainingRating] = useState("");
    const [trainer_explanation, setTrainerExplanation] = useState("");
    const [materials_helpful, setMaterialsHelpful] = useState("");
    const [practical_exercises, setPracticalExercises] = useState("");
    const [confidence_using_skills, setConfidenceUsingSkills] = useState("");
    const [learning_expectations_met, setLearningExpectationsMet] = useState("");
    const [liked_most, setLikedMost] = useState("");
    const [improvements, setImprovements] = useState("");
    const [other_comments, setOtherComments] = useState("");

    //   const [trainer_name, setTrainerName] = useState("");
    //   const [trainer_name, setTrainerName] = useState("");
    //   const [trainer_name, setTrainerName] = useState("");
    //   const [status, setStatus] = useState("Active"); // Default status
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Search input value
    const [editingId, setEditingId] = useState(null); // Track which ID is being edited
    const [categories, setCategories] = useState([]);

    const capitalizeFirstLetter = (str) => {
        if (!str) return str;
        return str
            .split(" ") // Split the string into words
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
            .join(" "); // Join them back together
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
        const month = String(date.getMonth() + 1); // Months are zero-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Fetch Data from API
    useEffect(() => {
        showUsers();
    }, []);

    // useEffect(() => {
    //     axios
    //         .get("http://localhost:8000/getdataFeedbackCity")
    //         .then((res) => {
    //             const udata = res.data.data.filter((item) => item.status === "Active");
    //             setCategories(udata); // Assuming the response contains a `data` array
    //             console.log("Categories fetched:", res.data.data);
    //         })
    //         .catch((err) => {
    //             console.error("Error fetching categories:", err);
    //         });
    // }, []);

    const showUsers = () => {
        // setLoading(true);
        axios
            .get("http://localhost:8000/getFeedback")
            .then((res) => {
                setUserData(res.data.data);
                // setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                // setLoading(false);
            });
    };

    // Handle Modal Close
    const handleClose = () => {
        setShow(false);
        setUserName("");
        setCourseName("");
        setTrainerName("");
        setCurrentDate("");
        setTrainingRating("");
        setTrainerExplanation("");
        setMaterialsHelpful("");
        setPracticalExercises("");
        setConfidenceUsingSkills("");
        setLearningExpectationsMet("");
        setLikedMost("");
        setImprovements("");
        setOtherComments("");
        // setStatus("Active");
        setEditingId(null); // Reset editing state
    };

    // Add or Update Feedback
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Convert the date back to an ISO string format before submitting
        const updatedDate = new Date(current_date).toISOString(); // Convert date to ISO string

        const newData = {
            user_name: capitalizeFirstLetter(user_name),
            course_name: capitalizeFirstLetter(course_name),
            trainer_name: capitalizeFirstLetter(trainer_name),
            // current_date: capitalizeFirstLetter(current_date),
            current_date: updatedDate,
            training_rating: capitalizeFirstLetter(training_rating),
            trainer_explanation: capitalizeFirstLetter(trainer_explanation),
            materials_helpful: capitalizeFirstLetter(materials_helpful),
            practical_exercises: capitalizeFirstLetter(practical_exercises),
            confidence_using_skills: capitalizeFirstLetter(confidence_using_skills),
            learning_expectations_met: capitalizeFirstLetter(learning_expectations_met),
            liked_most: capitalizeFirstLetter(liked_most),
            improvements: capitalizeFirstLetter(improvements),
            other_comments: capitalizeFirstLetter(other_comments),
            // status: capitalizeFirstLetter(status),
        };

        if (editingId) {
            // Update existing Feedback
            axios
                .put(`http://localhost:8000/updateFeedback/${editingId}`, newData)
                .then(() => {
                    alert("Feedback Updated Successfully!");
                    showUsers();
                    handleClose();
                })
                .catch((err) => console.error(err))
                .finally(() => setIsSubmitting(false));
        } else {
            // Add new Feedback
            axios
                .post("http://localhost:8000/addFeedback", newData)
                .then(() => {
                    alert("Feedback Added Successfully!");
                    showUsers();
                    handleClose();
                })
                .catch((err) => console.error(err))
                .finally(() => setIsSubmitting(false));
        }
    };

    // Delete data
    const deletedata = (_id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            axios
                .delete(`http://localhost:8000/deleteFeedback/${_id}`)
                .then(() => {
                    alert("Feedback Deleted");
                    showUsers();
                })
                .catch((err) => console.error(err));
        }
    };

    const handleEdit = (item) => {
        setEditingId(item._id);
        setUserName(item.user_name);
        setCourseName(item.course_name);
        setTrainerName(item.trainer_name);
        // setCurrentDate(item.current_date);

        const date = new Date(item.current_date);
        const formattedDate = date.toISOString().split('T')[0];
        setCurrentDate(formattedDate);

        setTrainingRating(item.training_rating);
        setTrainerExplanation(item.trainer_explanation);
        setMaterialsHelpful(item.materials_helpful);
        setPracticalExercises(item.practical_exercises);
        setConfidenceUsingSkills(item.confidence_using_skills);
        setLearningExpectationsMet(item.learning_expectations_met);
        setLikedMost(item.liked_most);
        setImprovements(item.improvements);
        setOtherComments(item.other_comments);
        // setStatus(item.status);
        setShow(true);
    };

    // Export to Excel
    const handleExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            userData.map((a, index) => ({
                "Sr.No": index + 1,
                "User Name": a.user_name,
                "Course Name": a.course_name,
                "Trainer Name": a.trainer_name,
                "Current Date": a.current_date,
                "Training Rating": a.training_rating,
                "Trainer Explaination": a.trainer_explanation,
                "Materials Helpful": a.materials_helpful,
                "Practical Exercises": a.practical_exercises,
                "Confidence using Skills": a.confidence_using_skills,
                "Learning Expections Met": a.learning_expectations_met,
                "Liked Most": a.liked_most,
                "Improvements": a.improvements,
                "Other Comments": a.other_comments
            }))
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Feedback Data");
        XLSX.writeFile(workbook, "Feedback-data.xlsx");
    };

    // Export to PDF
    const handlePdf = () => {
        const doc = new jsPDF();
        doc.text("Feedback Data", 14, 22);
        doc.autoTable({
            head: [["Sr.No", "Feedback Name", "City Name"]],
            body: userData.map((a, index) => [
                index + 1,
                a.user_name,
                a.course_name,
                a.trainer_name,
                a.current_date,
                a.training_rating,
                a.trainer_explanation,
                a.materials_helpful,
                a.practical_exercises,
                a.confidence_using_skills,
                a.learning_expectations_met,
                a.liked_most,
                a.improvements,
                a.other_comments
            ]),
            startY: 30,
        });
        doc.save("Feedback-data.pdf");
    };

    // CSV data for export
    const csvData = userData.map((a, index) => ({
        "Sr.No": index + 1,
        "User Name": a.user_name,
        "Course Name": a.course_name,
        "Trainer Name": a.trainer_name,
        "Current Date": a.current_date,
        "Training Rating": a.training_rating,
        "Trainer Explaination": a.trainer_explanation,
        "Materials Helpful": a.materials_helpful,
        "Practical Exercises": a.practical_exercises,
        "Confidence using Skills": a.confidence_using_skills,
        "Learning Expections Met": a.learning_expectations_met,
        "Liked Most": a.liked_most,
        "Improvements": a.improvements,
        "Other Comments": a.other_comments
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

    const handleSearch = () => {
        const filteredData = userData.filter((item) => {
            const user_name = item.user_name?.toLowerCase() || "";
            const course_name = item.course_name?.toLowerCase() || "";
            const trainer_name = item.trainer_name?.toLowerCase() || "";
            const current_date = item.current_date?.toLowerCase() || "";
            const training_rating = item.training_rating?.toLowerCase() || "";
            const trainer_explanation = item.trainer_explanation?.toLowerCase() || "";
            const materials_helpful = item.materials_helpful?.toLowerCase() || "";
            const practical_exercises = item.practical_exercises?.toLowerCase() || "";
            const confidence_using_skills = item.confidence_using_skills?.toLowerCase() || "";
            const learning_expectations_met = item.learning_expectations_met?.toLowerCase() || "";
            const liked_most = item.liked_most?.toLowerCase() || "";
            const improvements = item.improvements?.toLowerCase() || "";
            const other_comments = item.other_comments?.toLowerCase() || "";
            // const status = item.status?.toLowerCase() || "";

            return (
                user_name.includes(searchTerm.toLowerCase()) ||
                course_name.includes(searchTerm.toLowerCase()) ||
                trainer_name.includes(searchTerm.toLowerCase()) ||
                current_date.includes(searchTerm.toLowerCase()) ||
                training_rating.includes(searchTerm.toLowerCase()) ||
                trainer_explanation.includes(searchTerm.toLowerCase()) ||
                materials_helpful.includes(searchTerm.toLowerCase()) ||
                practical_exercises.includes(searchTerm.toLowerCase()) ||
                confidence_using_skills.includes(searchTerm.toLowerCase()) ||
                learning_expectations_met.includes(searchTerm.toLowerCase()) ||
                liked_most.includes(searchTerm.toLowerCase()) ||
                improvements.includes(searchTerm.toLowerCase()) ||
                other_comments.includes(searchTerm.toLowerCase())
                // status.includes(searchTerm.toLowerCase())
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
                {/* Add City Button
        <h1 className="fw-bold text-center text-primary ">Feedback </h1>
        <Col md={12} className="d-flex justify-content-end mb-4">
          <Button variant="primary" onClick={handleShow}>
            Add Feedback
          </Button>
        </Col> */}

                <Row>
                    <Col md={4}>
                        <Breadcrumb>
                            <Breadcrumb.Item href="dashboard">Home</Breadcrumb.Item>
                            <Breadcrumb.Item active>Feedback</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col md={8} className="d-flex justify-content-end mb-4">
                        <Button variant="primary" onClick={() => setShow(true)}>
                            Add Feedback
                        </Button>
                    </Col>
                </Row>

                {/* Add Feedback Modal */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {editingId ? "Update Feedback" : "Add Feedback"} {/* Conditional title */}
                        </Modal.Title>
                        {/* <Modal.Title>Add Feedback</Modal.Title> */}
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={12} className="mt-2">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your Name"
                                        value={user_name}
                                        onChange={(e) => setUserName(e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col md={12} className="mt-2">
                                    <Form.Label>Course Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter course Name"
                                        value={course_name}
                                        onChange={(e) => setCourseName(e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col md={12} className="mt-2">
                                    <Form.Label>Trainer Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter trainer Name"
                                        value={trainer_name}
                                        onChange={(e) => setTrainerName(e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col md={12}>
                                    <Form.Label>Current Date</Form.Label>
                                    <Form.Control
                                        type="Date"
                                        placeholder="Enter current date"
                                        value={current_date}
                                        onChange={(e) => setCurrentDate(e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col md={12} className="d-flex mt-3">
                                    <Form.Label>How would you rate the overall training session?</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        label="Excellent"
                                        name="training_rating"
                                        value="Excellent"
                                        className="ps-5"
                                        checked={training_rating === "Excellent"}
                                        onChange={(e) => setTrainingRating(e.target.value)}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Good"
                                        name="training_rating"
                                        value="Good"
                                        className="ps-5"
                                        checked={training_rating === "Good"}
                                        onChange={(e) => setTrainingRating(e.target.value)}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Average"
                                        name="training_rating"
                                        value="Average"
                                        className="ps-5"
                                        checked={training_rating === "Average"}
                                        onChange={(e) => setTrainingRating(e.target.value)}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Poor"
                                        name="training_rating"
                                        value="Poor"
                                        className="ps-5"
                                        checked={training_rating === "Poor"}
                                        onChange={(e) => setTrainingRating(e.target.value)}
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
                    {/* <ButtonGroup aria-label="Export Buttons"> */}
                    <CSVLink data={csvData} filename={"Feedback-data.csv"} className="ms-1">
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
                    {/* </ButtonGroup> */}
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
                        <InputGroup.Text id="basic-addon2" className="bg-secondary">
                            <FaSearch className="text-white" />
                        </InputGroup.Text>
                    </InputGroup>
                </Col>

                {/* Table */}
                <Col md={12} lg={12} lx={12} lxx={12}>
                    <div style={{ overflowX: "auto" }}>
                        <Table striped bordered hover id="printable-table">
                            <thead>
                                <tr>
                                    <th>Sr.No</th>
                                    <th>Feedback Name</th>
                                    <th>City Name</th>
                                    <th>Address</th>
                                    <th className="no-print">Status</th>
                                    <th className="no-print text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((product, index) => {
                                    return (
                                        <tr key={product._id}>
                                            <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                            <td>{product.user_name}</td>
                                            <td>{product.course_name} </td>
                                            <td>{product.trainer_name} </td>
                                            <td className="no-print">{product.status}</td>
                                            <td className="no-print d-flex justify-content-evenly">
                                                <Button
                                                    variant="warning"
                                                    onClick={() => handleEdit(product)}
                                                >
                                                    <GrEdit />
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => deletedata(product._id)}
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

export default Feedback;
