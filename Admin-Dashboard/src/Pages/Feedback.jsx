import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Breadcrumb,
    Button,
    Col,
    Container,
    Form,
    InputGroup,
    Row,
    Table,
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

const Feedback = () => {
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const [user_name, setUserName] = useState("");
    const [course_name, setCourseName] = useState("");
    const [trainer_name, setTrainerName] = useState("");
    const [current_date, setCurrentDate] = useState("");
    const [training_rating, setTrainingRating] = useState("");
    const [trainer_explanation, setTrainerExplanation] = useState("");
    const [materials_helpful, setMaterialsHelpful] = useState("");
    const [practical_exercises, setPracticalExercises] = useState("");
    const [confidence_using_skills, setConfidenceUsingSkills] = useState("");
    const [trainer_approachability, setTrainerApproachability] = useState("");
    const [trainer_pacing, setTrainerPacing] = useState("");
    const [confidence_in_computer_skills, setConfidenceInComputerSkills] = useState("");
    const [learning_expectations_met, setLearningExpectationsMet] = useState("");
    const [liked_most, setLikedMost] = useState("");
    const [improvements, setImprovements] = useState("");
    const [other_comments, setOtherComments] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingId, setEditingId] = useState(null);

    const capitalizeFirstLetter = (str) => {
        if (!str) return str;
        return str
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB"); // DD/MM/YYYY
    };

    useEffect(() => {
        showUsers();
    }, []);

    const showUsers = () => {
        axios
            .get("http://localhost:8000/getFeedback")
            .then((res) => {
                setUserData(res.data.data);
                setOriginalData(res.data.data);
            })
            .catch((err) => {
                console.error(err);
                alert("Failed to fetch feedback data. Please try again later.");
            });
    };

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
        setTrainerApproachability("");
        setTrainerPacing("");
        setConfidenceInComputerSkills("");
        setLearningExpectationsMet("");
        setLikedMost("");
        setImprovements("");
        setOtherComments("");
        setEditingId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const updatedDate = new Date(current_date).toISOString();

        const newData = {
            user_name: capitalizeFirstLetter(user_name),
            course_name: capitalizeFirstLetter(course_name),
            trainer_name: capitalizeFirstLetter(trainer_name),
            current_date: updatedDate,
            training_rating: capitalizeFirstLetter(training_rating),
            trainer_explanation: capitalizeFirstLetter(trainer_explanation),
            materials_helpful: capitalizeFirstLetter(materials_helpful),
            practical_exercises: capitalizeFirstLetter(practical_exercises),
            confidence_using_skills: capitalizeFirstLetter(confidence_using_skills),
            trainer_approachability: capitalizeFirstLetter(trainer_approachability),
            trainer_pacing: capitalizeFirstLetter(trainer_pacing),
            confidence_in_computer_skills: capitalizeFirstLetter(confidence_in_computer_skills),
            learning_expectations_met: capitalizeFirstLetter(
                learning_expectations_met
            ),
            liked_most: capitalizeFirstLetter(liked_most),
            improvements: capitalizeFirstLetter(improvements),
            other_comments: capitalizeFirstLetter(other_comments),
        };

        if (editingId) {
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
        setCurrentDate(new Date(item.current_date).toISOString().split("T")[0]);
        setTrainingRating(item.training_rating);
        setTrainerExplanation(item.trainer_explanation);
        setMaterialsHelpful(item.materials_helpful);
        setPracticalExercises(item.practical_exercises);
        setConfidenceUsingSkills(item.confidence_using_skills);
        setTrainerApproachability(item.trainer_approachability);
        setTrainerPacing(item.trainer_pacing);
        setConfidenceInComputerSkills(item.confidence_in_computer_skills);
        setLearningExpectationsMet(item.learning_expectations_met);
        setLikedMost(item.liked_most);
        setImprovements(item.improvements);
        setOtherComments(item.other_comments);
        setShow(true);
    };

    const handleExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            userData.map((a, index) => ({
                "Sr.No": index + 1,
                "User Name": a.user_name,
                "Course Name": a.course_name,
                "Trainer Name": a.trainer_name,
                "Current Date": a.current_date,
                "Training Rating": a.training_rating,
                "Trainer Explanation": a.trainer_explanation,
                "Materials Helpful": a.materials_helpful,
                "Practical Exercises": a.practical_exercises,
                "Confidence using Skills": a.confidence_using_skills,
                "Trainer Approachability": a.trainer_approachability,
                "Trainer Pacing": a.trainer_pacing,
                "Confidence in Computer Skills": a.confidence_in_computer_skills,
                "Learning Expectations Met": a.learning_expectations_met,
                "Liked Most": a.liked_most,
                "Improvements": a.improvements,
                "Other Comments": a.other_comments,
            }))
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Feedback Data");
        XLSX.writeFile(workbook, "Feedback-data.xlsx");
    };

    const handlePdf = () => {
        const doc = new jsPDF();
        doc.text("Feedback Data", 14, 22);
        doc.autoTable({
            head: [
                [
                    "Sr.No",
                    "User Name",
                    "Course Name",
                    "Trainer Name",
                    "Current Date",
                    "Training Rating",
                    "Trainer Explanation",
                    "Materials Helpful",
                    "Practical Exercises",
                    "Confidence using Skills",
                    "Trainer Approachability",
                    "Trainer Pacing",
                    "Confidence in Computer Skills",
                    "Learning Expectations Met",
                    "Liked Most",
                    "Improvements",
                    "Other Comments",
                ],
            ],
            body: userData.map((a, index) => [
                index + 1,
                a.user_name,
                a.course_name,
                a.trainer_name,
                formatDate(a.current_date),
                a.training_rating,
                a.trainer_explanation,
                a.materials_helpful,
                a.practical_exercises,
                a.confidence_using_skills,
                a.trainer_approachability,
                a.trainer_pacing,
                a.confidence_in_computer_skills,
                a.learning_expectations_met,
                a.liked_most,
                a.improvements,
                a.other_comments,
            ]),
            startY: 30,
        });
        doc.save("Feedback-data.pdf");
    };

    const csvData = userData.map((a, index) => ({
        "Sr.No": index + 1,
        "User Name": a.user_name,
        "Course Name": a.course_name,
        "Trainer Name": a.trainer_name,
        "Current Date": a.current_date,
        "Training Rating": a.training_rating,
        "Trainer Explanation": a.trainer_explanation,
        "Materials Helpful": a.materials_helpful,
        "Practical Exercises": a.practical_exercises,
        "Confidence using Skills": a.confidence_using_skills,
        "Trainer Approachability": a.trainer_approachability,
        "Trainer Pacing": a.trainer_pacing,
        "Confidence in Computer Skills": a.confidence_in_computer_skills,
        "Learning Expectations Met": a.learning_expectations_met,
        "Liked Most": a.liked_most,
        Improvements: a.improvements,
        "Other Comments": a.other_comments,
    }));

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(userData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const paginationItems = Array.from({ length: totalPages }, (_, index) => (
        <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
        >
            {index + 1}
        </Pagination.Item>
    ));

    const showingFrom = indexOfFirstItem + 1;
    const showingTo = Math.min(indexOfLastItem, userData.length);
    const totalEntries = userData.length;

    const handleSearch = () => {
        const searchLower = searchTerm.toLowerCase();
        const filteredData = originalData.filter((item) => {
            return (
                item.user_name?.toLowerCase().includes(searchLower) ||
                item.course_name?.toLowerCase().includes(searchLower) ||
                item.trainer_name?.toLowerCase().includes(searchLower) ||
                item.current_date?.toLowerCase().includes(searchLower) ||
                item.training_rating?.toLowerCase().includes(searchLower) ||
                item.trainer_explanation?.toLowerCase().includes(searchLower) ||
                item.materials_helpful?.toLowerCase().includes(searchLower) ||
                item.practical_exercises?.toLowerCase().includes(searchLower) ||
                item.confidence_using_skills?.toLowerCase().includes(searchLower) ||
                item.trainer_approachability?.toLowerCase().includes(searchLower) ||
                item.trainer_pacing?.toLowerCase().includes(searchLower) ||
                item.confidence_in_computer_skills?.toLowerCase().includes(searchLower) ||
                item.learning_expectations_met?.toLowerCase().includes(searchLower) ||
                item.liked_most?.toLowerCase().includes(searchLower) ||
                item.improvements?.toLowerCase().includes(searchLower) ||
                item.other_comments?.toLowerCase().includes(searchLower)
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

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {editingId ? "Update Feedback" : "Add Feedback"}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={6} className="mt-2">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your Name"
                                        value={user_name}
                                        onChange={(e) => setUserName(e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col md={6} className="mt-2">
                                    <Form.Label>Course Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter course Name"
                                        value={course_name}
                                        onChange={(e) => setCourseName(e.target.value)}
                                        required
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col md={6}>
                                    <Form.Label>Trainer Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter trainer Name"
                                        value={trainer_name}
                                        onChange={(e) => setTrainerName(e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col md={6}>
                                    <Form.Label>Current Date</Form.Label>
                                    <Form.Control
                                        type="Date"
                                        placeholder="Enter current date"
                                        value={current_date}
                                        onChange={(e) => setCurrentDate(e.target.value)}
                                        required
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12} className="mt-3">
                                    <Form.Label className="d-block">
                                        How would you rate the overall training session?
                                    </Form.Label>
                                    <div className="d-flex gap-4">
                                        <Form.Check
                                            type="radio"
                                            label="Excellent"
                                            name="training_rating"
                                            value="Excellent"
                                            checked={training_rating === "Excellent"}
                                            onChange={(e) => setTrainingRating(e.target.value)}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Good"
                                            name="training_rating"
                                            value="Good"
                                            checked={training_rating === "Good"}
                                            onChange={(e) => setTrainingRating(e.target.value)}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Average"
                                            name="training_rating"
                                            value="Average"
                                            checked={training_rating === "Average"}
                                            onChange={(e) => setTrainingRating(e.target.value)}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Poor"
                                            name="training_rating"
                                            value="Poor"
                                            checked={training_rating === "Poor"}
                                            onChange={(e) => setTrainingRating(e.target.value)}
                                        />
                                    </div>
                                </Col>
                                <Col md={12} className="mt-3">
                                    <Form.Label className="d-block">
                                        How well did the trainer explain the concepts?
                                    </Form.Label>
                                    <div className="d-flex gap-2">
                                        <Form.Check
                                            type="radio"
                                            label="Very Clearly"
                                            name="trainer_explanation"
                                            value="Very Clearly"
                                            checked={trainer_explanation === "Very Clearly"}
                                            onChange={(e) => setTrainerExplanation(e.target.value)}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Clearly"
                                            name="trainer_explanation"
                                            value="Clearly"
                                            checked={trainer_explanation === "Clearly"}
                                            onChange={(e) => setTrainerExplanation(e.target.value)}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Somewhat Clearly"
                                            name="trainer_explanation"
                                            value="Somewhat Clearly"
                                            checked={trainer_explanation === "Somewhat Clearly"}
                                            onChange={(e) => setTrainerExplanation(e.target.value)}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Not Clearly"
                                            name="trainer_explanation"
                                            value="Not Clearly"
                                            checked={trainer_explanation === "Not Clearly"}
                                            onChange={(e) => setTrainerExplanation(e.target.value)}
                                        />
                                    </div>
                                </Col>
                                <Col md={12} className="mt-3">
                                    <Form.Label className="d-block">
                                        Were the training materials and resources helpful?
                                    </Form.Label>
                                    <div className="d-flex gap-4">
                                        <Form.Check
                                            type="radio"
                                            label="Yes"
                                            name="materials_helpful"
                                            value="Yes"
                                            checked={materials_helpful === "Yes"}
                                            onChange={(e) => setMaterialsHelpful(e.target.value)}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="No"
                                            name="materials_helpful"
                                            value="No"
                                            checked={materials_helpful === "No"}
                                            onChange={(e) => setMaterialsHelpful(e.target.value)}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Somewhat"
                                            name="materials_helpful"
                                            value="Somewhat"
                                            checked={materials_helpful === "Somewhat"}
                                            onChange={(e) => setMaterialsHelpful(e.target.value)}
                                        />
                                    </div>
                                </Col>
                                <Col md={12} className="mt-3">
                                    <Form.Label className="d-block">
                                        Did the trainer provide practical examples and hands-on
                                        exercises?
                                    </Form.Label>
                                    <div className="d-flex gap-4">
                                        <Form.Check
                                            type="radio"
                                            label="Yes"
                                            name="practical_exercises"
                                            value="Yes"
                                            checked={practical_exercises === "Yes"}
                                            onChange={(e) => setPracticalExercises(e.target.value)}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="No"
                                            name="practical_exercises"
                                            value="No"
                                            checked={practical_exercises === "No"}
                                            onChange={(e) => setPracticalExercises(e.target.value)}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Somewhat"
                                            name="practical_exercises"
                                            value="Somewhat"
                                            checked={practical_exercises === "Somewhat"}
                                            onChange={(e) => setPracticalExercises(e.target.value)}
                                        />
                                    </div>
                                </Col>
                                <Col md={12} className="mt-3">
                                    <Form.Label className="d-block">
                                        How would you rate the trainer’s knowledge of the subject?
                                    </Form.Label>
                                    <div className="d-flex gap-4">
                                        <Form.Check
                                            type="radio"
                                            label="Excellent"
                                            name="confidence_using_skills"
                                            value="Excellent"
                                            checked={confidence_using_skills === "Excellent"}
                                            onChange={(e) => setConfidenceUsingSkills(e.target.value)}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Good"
                                            name="confidence_using_skills"
                                            value="Good"
                                            checked={confidence_using_skills === "Good"}
                                            onChange={(e) => setConfidenceUsingSkills(e.target.value)}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Average"
                                            name="confidence_using_skills"
                                            value="Average"
                                            checked={confidence_using_skills === "Average"}
                                            onChange={(e) => setConfidenceUsingSkills(e.target.value)}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Poor"
                                            name="confidence_using_skills"
                                            value="Poor"
                                            checked={confidence_using_skills === "Poor"}
                                            onChange={(e) => setConfidenceUsingSkills(e.target.value)}
                                        />
                                    </div>
                                </Col>
                                <Col md={12} className="mt-3">
                                    <Form.Label className="d-block">
                                        Was the trainer approachable and open to questions?
                                    </Form.Label>
                                    <div className="d-flex gap-4">
                                        <Form.Check
                                            type="radio"
                                            label="Always"
                                            name="trainer_approachability"
                                            value="Always"
                                            checked={trainer_approachability === "Always"}
                                            onChange={(e) => setTrainerApproachability(e.target.value)}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Sometimes"
                                            name="trainer_approachability"
                                            value="Sometimes"
                                            checked={trainer_approachability === "Sometimes"}
                                            onChange={(e) => setTrainerApproachability(e.target.value)}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Rarely"
                                            name="trainer_approachability"
                                            value="Rarely"
                                            checked={trainer_approachability === "Rarely"}
                                            onChange={(e) => setTrainerApproachability(e.target.value)}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Never"
                                            name="trainer_approachability"
                                            value="Never"
                                            checked={trainer_approachability === "Never"}
                                            onChange={(e) => setTrainerApproachability(e.target.value)}
                                        />
                                    </div>
                                </Col>
                                <Col md={12} className="mt-3">
                                    <Form.Label className="d-block">
                                        Did the trainer pace the training appropriately?
                                    </Form.Label>
                                    <div className="d-flex gap-4">
                                        <Form.Check
                                            type="radio"
                                            label="Too Fast"
                                            name="trainer_pacing"
                                            value="Too Fast"
                                            checked={trainer_pacing === "Too Fast"}
                                            onChange={(e) => setTrainerPacing(e.target.value)}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Just Right"
                                            name="trainer_pacing"
                                            value="Just Right"
                                            checked={trainer_pacing === "Just Right"}
                                            onChange={(e) => setTrainerPacing(e.target.value)}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Too Slow"
                                            name="trainer_pacing"
                                            value="Too Slow"
                                            checked={trainer_pacing === "Too Slow"}
                                            onChange={(e) => setTrainerPacing(e.target.value)}
                                        />
                                    </div>
                                </Col>
                                <Col md={12} className="mt-3">
                                    <Form.Label className="d-block">
                                        Do you feel more confident using the computer skills taught?
                                    </Form.Label>
                                    <div className="d-flex gap-4">
                                        <Form.Check
                                            type="radio"
                                            label="Yes"
                                            name="confidence_in_computer_skills"
                                            value="Yes"
                                            checked={confidence_in_computer_skills === "Yes"}
                                            onChange={(e) => setConfidenceInComputerSkills(e.target.value)}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="No"
                                            name="confidence_in_computer_skills"
                                            value="No"
                                            checked={confidence_in_computer_skills === "No"}
                                            onChange={(e) => setConfidenceInComputerSkills(e.target.value)}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Somewhat"
                                            name="confidence_in_computer_skills"
                                            value="Somewhat"
                                            checked={confidence_in_computer_skills === "Somewhat"}
                                            onChange={(e) => setConfidenceInComputerSkills(e.target.value)}
                                        />
                                    </div>
                                </Col>
                                <Col md={12} className="mt-3">
                                    <Form.Label className="d-block">
                                        Were your learning expectations met?
                                    </Form.Label>
                                    <div className="d-flex gap-4">
                                        <Form.Check
                                            type="radio"
                                            label="Yes"
                                            name="learning_expectations_met"
                                            value="Yes"
                                            checked={learning_expectations_met === "Yes"}
                                            onChange={(e) => setLearningExpectationsMet(e.target.value)}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="No"
                                            name="learning_expectations_met"
                                            value="No"
                                            checked={learning_expectations_met === "No"}
                                            onChange={(e) => setLearningExpectationsMet(e.target.value)}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Partially"
                                            name="learning_expectations_met"
                                            value="Partially"
                                            checked={learning_expectations_met === "Partially"}
                                            onChange={(e) => setLearningExpectationsMet(e.target.value)}
                                        />
                                    </div>
                                </Col>
                                <Col md={12} className="mt-3">
                                    <Form.Label>What did you like most about the training?</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        ria-label="With textarea"
                                        rows={2}
                                        placeholder="Enter you liked most about the training"
                                        value={liked_most}
                                        onChange={(e) => setLikedMost(e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col md={12} className="mt-3">
                                    <Form.Label>What improvements would you suggest?</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        ria-label="With textarea"
                                        rows={2}
                                        placeholder="Enter improvements would you suggest"
                                        value={improvements}
                                        onChange={(e) => setImprovements(e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col md={12} className="mt-3">
                                    <Form.Label>Any other comments or feedback?</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        ria-label="With textarea"
                                        rows={3}
                                        placeholder="Enter any other feedback"
                                        value={other_comments}
                                        onChange={(e) => setOtherComments(e.target.value)}
                                        required
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
                    <CSVLink
                        data={csvData}
                        filename={"Feedback-data.csv"}
                        className="ms-1"
                    >
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

                <Col md={12} lg={12} lx={12} lxx={12}>
                    <div style={{ overflowX: "auto" }}>
                        <Table striped bordered hover id="printable-table">
                            <thead>
                                <tr>
                                    <th>Sr.No</th>
                                    <th>Name</th>
                                    <th>Course Name</th>
                                    <th>Trainer Name</th>
                                    <th>Current Date</th>
                                    <th>Training Rating</th>
                                    <th>Trainer Explanation</th>
                                    <th>Materials Helpful</th>
                                    <th>practical_exercises</th>
                                    <th>Confidence_using_Skills</th>
                                    <th>Trainer Approachability</th>
                                    <th>Trainer Pacing</th>
                                    <th>Confidence_in Computer Skills</th>
                                    <th>Learning_expectations_met</th>
                                    <th>Liked_most</th>
                                    <th>Improvements</th>
                                    <th>Other Feedback</th>
                                    <th className="no-print text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((product, index) => (
                                    <tr key={product._id}>
                                        <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                        <td>{product.user_name}</td>
                                        <td>{product.course_name}</td>
                                        <td>{product.trainer_name}</td>
                                        <td>{formatDate(product.current_date)}</td>
                                        <td>{product.training_rating}</td>
                                        <td>{product.trainer_explanation}</td>
                                        <td>{product.materials_helpful}</td>
                                        <td>{product.practical_exercises}</td>
                                        <td>{product.confidence_using_skills}</td>
                                        <td>{product.trainer_approachability}</td>
                                        <td>{product.trainer_pacing}</td>
                                        <td>{product.confidence_in_computer_skills}</td>
                                        <td>{product.learning_expectations_met}</td>
                                        <td>{product.liked_most}</td>
                                        <td>{product.improvements}</td>
                                        <td>{product.other_comments}</td>
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
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Col>

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
                            {paginationItems}
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
