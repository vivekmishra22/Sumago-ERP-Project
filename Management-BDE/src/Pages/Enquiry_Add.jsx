import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Enquiry_Add = () => {
  const navigate = useNavigate("");
  const [student_name, setStudent_name] = useState("");
  const [university_name, setUniversityName] = useState("");
  const [college_name, setCollegeName] = useState("");
  const [city_name, setCityName] = useState("");
  const [mobile_number, setMobile_number] = useState("");
  const [whatsApp_number, setWhatsApp_number] = useState("");
  const [date_birth, setDate_birth] = useState("");
  const [gmail, setGmail] = useState("");
  const [blood_Group, setBlood_Group] = useState("");
  const [education_name, setEducationName] = useState("");
  const [marital_status, setMarital_status] = useState("");
  const [office_city_name, setOfficeCityName] = useState("");
  const [temporary_address, setTemporary_address] = useState("");
  const [permanent_address, setPermanent_address] = useState("");
  const [mode_education, setMode_education] = useState("");
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [amount, setAmount] = useState("");
  const [placement_reference, setPlacement_reference] = useState("");
  const [system, setsystem] = useState("");
  const [tshirt, setTshirt] = useState("");
  const [batch_slot, setBatch_slot] = useState("");
  const [status, setStatus] = useState("Active");
  const [filteredDurations, setFilteredDurations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesOData, setCategoriesOData] = useState([]);
  const [categoriesUdata, setCategoriesUData] = useState([]);
  const [categoriesCdata, setCategoriesCData] = useState([]);
  const [categoriesEdata, setCategoriesEData] = useState([]);
  const [categoriesCtdata, setCategoriesCTData] = useState([]);
  const [current_date, setCurrentDate] = useState("");
  const [end_date, setEnd_Date] = useState("");
  const [admission, setAdmission] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Capitalize first letter of each word
  function capitalizeFirstLetter(input) {
    if (typeof input === "string") {
      return input
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    return input;
  }

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setCurrentDate(formattedDate);

    // Fetch all required data
    const fetchData = async () => {
      try {
        const endpoints = [
          { url: "getdataUniversity", setter: setCategoriesUData },
          { url: "getdataCity", setter: setCategoriesCTData },
          { url: "getdataCollege", setter: setCategoriesCData },
          { url: "getdataEducation", setter: setCategoriesEData },
          { url: "getdataCourse", setter: setCategories },
          { url: "getdataOfficeCity", setter: setCategoriesOData }
        ];

        const requests = endpoints.map(endpoint => 
          axios.get(`http://localhost:8000/${endpoint.url}`)
            .then(res => {
              const filteredData = res.data.data.filter(item => item.status === "Active");
              endpoint.setter(filteredData);
            })
        );

        await Promise.all(requests);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!admission) {
      alert("Please select an admission status");
      setIsSubmitting(false);
      return;
    }

    const userData = {
      student_name: capitalizeFirstLetter(student_name),
      university_name: capitalizeFirstLetter(university_name),
      college_name: capitalizeFirstLetter(college_name),
      city_name: capitalizeFirstLetter(city_name),
      mobile_number,
      whatsApp_number,
      date_birth,
      gmail,
      blood_Group: capitalizeFirstLetter(blood_Group),
      education_name: capitalizeFirstLetter(education_name),
      marital_status: capitalizeFirstLetter(marital_status),
      office_city_name: capitalizeFirstLetter(office_city_name),
      temporary_address: capitalizeFirstLetter(temporary_address),
      permanent_address: capitalizeFirstLetter(permanent_address),
      mode_education: capitalizeFirstLetter(mode_education),
      duration: capitalizeFirstLetter(duration),
      amount,
      placement_reference: capitalizeFirstLetter(placement_reference),
      name: capitalizeFirstLetter(name),
      system: capitalizeFirstLetter(system),
      tshirt: capitalizeFirstLetter(tshirt),
      batch_slot: capitalizeFirstLetter(batch_slot),
      current_date,
      end_date,
      admission: capitalizeFirstLetter(admission),
      status: capitalizeFirstLetter(status),
    };

    try {
      const endpoint = admission === "Confirm Admission" 
        ? "addEnquiry_Student" 
        : "addEnquiry_FollowUp";

      const response = await axios.post(`http://localhost:8000/${endpoint}`, userData);
      console.log("Response:", response.data);
      
      alert("Data Added Successfully!");
      resetForm();
      
      navigate(admission === "Confirm Admission" 
        ? "/Head/enquiry_student" 
        : "/Head/enquiry_follow_up");
    } catch (err) {
      console.error("Error submitting data:", err);
      if (err.response) {
        alert(`Error: ${err.response.data.message || "Server error"}`);
      } else if (err.request) {
        alert("Network error. Please check your connection.");
      } else {
        alert("Error in form submission. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStudent_name("");
    setUniversityName("");
    setCollegeName("");
    setCityName("");
    setMobile_number("");
    setWhatsApp_number("");
    setDate_birth("");
    setGmail("");
    setBlood_Group("");
    setEducationName("");
    setMarital_status("");
    setOfficeCityName("");
    setTemporary_address("");
    setPermanent_address("");
    setMode_education("");
    setName("");
    setDuration("");
    setAmount("");
    setPlacement_reference("");
    setsystem("");
    setTshirt("");
    setBatch_slot("");
    setEnd_Date("");
    setAdmission("");
    setStatus("Active");
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Col md={12} sm={12} lg={10} lx={10} lxx={10}>
        <h1 className="text-center text-dark pt-3">Student Enquiry</h1>
        <div className="border-top border-5 mt-4 border-primary"></div>
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                {/* Student Name */}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Student Name:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Full Name"
                    value={student_name}
                    required
                    onChange={(e) => setStudent_name(e.target.value)}
                  />
                </Col>

                {/* City */}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>City Name:</Form.Label>
                  <Form.Select
                    value={city_name}
                    onChange={(e) => setCityName(e.target.value)}
                    required
                  >
                    <option value="">Choose a City</option>
                    {categoriesCtdata.map((city) => (
                      <option key={city._id} value={city.city_name}>
                        {city.city_name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                {/* University */}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>University Name:</Form.Label>
                  <Form.Select
                    value={university_name}
                    onChange={(e) => setUniversityName(e.target.value)}
                    required
                  >
                    <option value="">Choose a university</option>
                    {categoriesUdata.map((university) => (
                      <option key={university._id} value={university.university_name}>
                        {university.university_name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                {/* College */}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>College Name:</Form.Label>
                  <Form.Select
                    value={college_name}
                    onChange={(e) => setCollegeName(e.target.value)}
                    required
                  >
                    <option value="">Choose a College</option>
                    {categoriesCdata.map((college) => (
                      <option key={college._id} value={college.college_name}>
                        {college.college_name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                {/* Gmail */}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Gmail:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Gmail"
                    value={gmail}
                    required
                    onChange={(e) => setGmail(e.target.value)}
                  />
                </Col>

                {/* Mobile No */}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Mobile No:</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Mobile No"
                    value={mobile_number}
                    required
                    onChange={(e) => setMobile_number(e.target.value)}
                  />
                </Col>

                {/* WhatsApp No */}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>WhatsApp No:</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter WhatsApp No"
                    value={whatsApp_number}
                    required
                    onChange={(e) => setWhatsApp_number(e.target.value)}
                  />
                </Col>

                {/* Date of Birth */}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Date Of Birth:</Form.Label>
                  <Form.Control
                    type="date"
                    value={date_birth}
                    required
                    onChange={(e) => setDate_birth(e.target.value)}
                  />
                </Col>

                {/* Education Name */}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Education Name:</Form.Label>
                  <Form.Select
                    value={education_name}
                    onChange={(e) => setEducationName(e.target.value)}
                    required
                  >
                    <option value="">Choose an education</option>
                    {categoriesEdata.map((education) => (
                      <option key={education._id} value={education.education_name}>
                        {education.education_name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                {/* Mode Education */}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Mode Education:</Form.Label>
                  <div className="d-flex">
                    <Form.Check
                      type="radio"
                      label="Online"
                      name="mode_education"
                      value="Online"
                      checked={mode_education === "Online"}
                      onChange={(e) => setMode_education(e.target.value)}
                      className="ps-5"
                    />
                    <Form.Check
                      type="radio"
                      label="Offline"
                      name="mode_education"
                      value="Offline"
                      checked={mode_education === "Offline"}
                      onChange={(e) => setMode_education(e.target.value)}
                      className="ps-5"
                    />
                  </div>
                </Col>

                {/* Office City Name */}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Office City Name:</Form.Label>
                  <Form.Select
                    value={office_city_name}
                    onChange={(e) => setOfficeCityName(e.target.value)}
                    required
                  >
                    <option value="">Choose a city</option>
                    {categoriesOData.map((city) => (
                      <option key={city._id} value={city.office_city_name}>
                        {city.office_city_name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                {/* Course Name */}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Course Name:</Form.Label>
                  <Form.Select
                    value={name}
                    onChange={(e) => {
                      const selectedCourse = e.target.value;
                      setName(selectedCourse);
                      const courseDurations = categories.filter(
                        category => category.name === selectedCourse
                      );
                      setFilteredDurations(courseDurations);
                      setDuration("");
                      setAmount("");
                    }}
                    required
                  >
                    <option value="">Choose Course Name</option>
                    {categories.map((course) => (
                      <option key={course._id} value={course.name}>
                        {course.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                {/* Temporary Address */}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Temporary Address:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    placeholder="Enter Temporary Address"
                    value={temporary_address}
                    required
                    onChange={(e) => setTemporary_address(e.target.value)}
                  />
                </Col>

                {/* Permanent Address */}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Permanent Address:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    placeholder="Enter Permanent Address"
                    value={permanent_address}
                    required
                    onChange={(e) => setPermanent_address(e.target.value)}
                  />
                </Col>

                {/* Duration */}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Duration:</Form.Label>
                  <Form.Select
                    value={duration}
                    onChange={(e) => {
                      const selectedDuration = e.target.value;
                      setDuration(selectedDuration);
                      const selectedCategory = filteredDurations.find(
                        category => category.duration === selectedDuration
                      );
                      if (selectedCategory) {
                        setAmount(selectedCategory.amount);
                      }
                    }}
                    required
                    disabled={!name}
                  >
                    <option value="">Choose Duration</option>
                    {filteredDurations.map((category) => (
                      <option key={category._id} value={category.duration}>
                        {category.duration}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                {/* Amount */}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Amount:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Amount will auto-fill"
                    value={amount}
                    readOnly
                    required
                  />
                </Col>

                {/* Marital Status */}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Marital Status:</Form.Label>
                  <div className="d-flex">
                    <Form.Check
                      type="radio"
                      label="Single"
                      name="marital_status"
                      value="Single"
                      checked={marital_status === "Single"}
                      onChange={(e) => setMarital_status(e.target.value)}
                      className="ps-5"
                    />
                    <Form.Check
                      type="radio"
                      label="Married"
                      name="marital_status"
                      value="Married"
                      checked={marital_status === "Married"}
                      onChange={(e) => setMarital_status(e.target.value)}
                      className="ps-5"
                    />
                  </div>
                </Col>

                {/* Blood Group */}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Blood Group:</Form.Label>
                  <div className="d-flex flex-wrap">
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                      <Form.Check
                        key={group}
                        type="radio"
                        label={group}
                        name="blood_Group"
                        value={group}
                        checked={blood_Group === group}
                        onChange={(e) => setBlood_Group(e.target.value)}
                        className="pe-3"
                      />
                    ))}
                  </div>
                </Col>

                {/* Placement Reference */}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Placement Reference:</Form.Label>
                  <div className="d-flex">
                    <Form.Check
                      type="radio"
                      label="Yes"
                      name="placement_reference"
                      value="Yes"
                      checked={placement_reference === "Yes"}
                      onChange={(e) => setPlacement_reference(e.target.value)}
                      className="ps-5"
                    />
                    <Form.Check
                      type="radio"
                      label="No"
                      name="placement_reference"
                      value="No"
                      checked={placement_reference === "No"}
                      onChange={(e) => setPlacement_reference(e.target.value)}
                      className="ps-5"
                    />
                  </div>
                </Col>

                {/* System */}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>System:</Form.Label>
                  <div className="d-flex">
                    <Form.Check
                      type="radio"
                      label="Office system"
                      name="system"
                      value="Office system"
                      checked={system === "Office system"}
                      onChange={(e) => setsystem(e.target.value)}
                      className="ps-4"
                    />
                    <Form.Check
                      type="radio"
                      label="Owned a Laptop"
                      name="system"
                      value="Owned a Laptop"
                      checked={system === "Owned a Laptop"}
                      onChange={(e) => setsystem(e.target.value)}
                      className="ps-4"
                    />
                  </div>
                </Col>

                {/* Batch Slot */}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Batch Slot:</Form.Label>
                  <div className="d-flex">
                    <Form.Check
                      type="radio"
                      label="Morning (10 to 2)"
                      name="batch_slot"
                      value="Morning (10 to 2)"
                      checked={batch_slot === "Morning (10 to 2)"}
                      onChange={(e) => setBatch_slot(e.target.value)}
                      className="ps-4"
                    />
                    <Form.Check
                      type="radio"
                      label="Afternoon (2 to 6)"
                      name="batch_slot"
                      value="Afternoon (2 to 6)"
                      checked={batch_slot === "Afternoon (2 to 6)"}
                      onChange={(e) => setBatch_slot(e.target.value)}
                      className="ps-4"
                    />
                  </div>
                </Col>

                {/* Tshirt */}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Tshirt:</Form.Label>
                  <div className="d-flex flex-wrap">
                    {["S", "M", "L", "XL", "XXL", "2XL"].map((size) => (
                      <Form.Check
                        key={size}
                        type="radio"
                        label={size}
                        name="tshirt"
                        value={size}
                        checked={tshirt === size}
                        onChange={(e) => setTshirt(e.target.value)}
                        className="pe-3"
                      />
                    ))}
                  </div>
                </Col>

                {/* Current Date */}
                <Col md={12} lg={6}>
                  <Form.Label>Current Date:</Form.Label>
                  <Form.Control
                    type="date"
                    value={current_date}
                    readOnly
                    required
                  />
                </Col>

                {/* Follow Up Date */}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Enquiry Follow Up End Date:</Form.Label>
                  <Form.Control
                    type="date"
                    value={end_date}
                    onChange={(e) => setEnd_Date(e.target.value)}
                  />
                </Col>

                {/* Admission Status */}
                <Col md={12} className="d-flex mt-3">
                  <Form.Label>Admission Status:</Form.Label>
                  <Form.Check
                    type="radio"
                    label="Pending Admission"
                    name="admission"
                    value="Pending Admission"
                    checked={admission === "Pending Admission"}
                    onChange={(e) => setAdmission(e.target.value)}
                    disabled={admission}
                    className="ps-5"
                  />
                  <Form.Check
                    type="radio"
                    label="Confirm Admission"
                    name="admission"
                    value="Confirm Admission"
                    checked={admission === "Confirm Admission"}
                    onChange={(e) => setAdmission(e.target.value)}
                    disabled={admission}
                    className="ps-5"
                  />
                </Col>

                {/* Status */}
                <Col md={12} className="d-flex mt-3">
                  <Form.Label>Status:</Form.Label>
                  <Form.Check
                    type="radio"
                    label="Active"
                    name="status"
                    value="Active"
                    checked={status === "Active"}
                    onChange={(e) => setStatus(e.target.value)}
                    className="ps-5"
                  />
                  <Form.Check
                    type="radio"
                    label="Inactive"
                    name="status"
                    value="Inactive"
                    checked={status === "Inactive"}
                    onChange={(e) => setStatus(e.target.value)}
                    className="ps-5"
                  />
                </Col>

                {/* Submit Button */}
                <Col md={12} className="d-flex justify-content-center">
                  <Button
                    type="submit"
                    className="mt-4 w-25"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
};

export default Enquiry_Add;






// import React, { useEffect, useState } from "react";
// import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Enquiry_Add = () => {
//   const navigate = useNavigate();
//   // Form state
//   const [formData, setFormData] = useState({
//     student_name: "",
//     university_name: "",
//     college_name: "",
//     city_name: "",
//     mobile_number: "",
//     whatsApp_number: "",
//     date_birth: "",
//     gmail: "",
//     blood_Group: "",
//     education_name: "",
//     marital_status: "",
//     office_city_name: "",
//     temporary_address: "",
//     permanent_address: "",
//     mode_education: "",
//     name: "",
//     duration: "",
//     amount: "",
//     placement_reference: "",
//     system: "",
//     tshirt: "",
//     batch_slot: "",
//     status: "Active",
//     current_date: "",
//     end_date: "",
//     admission: ""
//   });

//   // Dropdown options state
//   const [filteredDurations, setFilteredDurations] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [categoriesOData, setCategoriesOData] = useState([]);
//   const [categoriesUdata, setCategoriesUData] = useState([]);
//   const [categoriesCdata, setCategoriesCData] = useState([]);
//   const [categoriesEdata, setCategoriesEData] = useState([]);
//   const [categoriesCtdata, setCategoriesCTData] = useState([]);
  
//   // UI state
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState(null);

//   // Capitalize first letter of each word
//   const capitalizeFirstLetter = (input) => {
//     if (typeof input === "string") {
//       return input
//         .split(" ")
//         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(" ");
//     }
//     return input;
//   };

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Handle course selection change
//   const handleCourseChange = (e) => {
//     const selectedCourse = e.target.value;
//     setFormData(prev => ({
//       ...prev,
//       name: selectedCourse,
//       duration: "",
//       amount: ""
//     }));

//     const courseDurations = categories.filter(
//       category => category.name === selectedCourse
//     );
//     setFilteredDurations(courseDurations);
//   };

//   // Handle duration selection change
//   const handleDurationChange = (e) => {
//     const selectedDuration = e.target.value;
//     const selectedCategory = filteredDurations.find(
//       category => category.duration === selectedDuration
//     );

//     setFormData(prev => ({
//       ...prev,
//       duration: selectedDuration,
//       amount: selectedCategory ? selectedCategory.amount : ""
//     }));
//   };

//   // Fetch all required data on component mount
//   useEffect(() => {
//     const today = new Date();
//     const formattedDate = today.toISOString().split('T')[0];
//     setFormData(prev => ({ ...prev, current_date: formattedDate }));

//     const fetchData = async () => {
//       try {
//         const endpoints = [
//           { url: "getdataUniversity", setter: setCategoriesUData },
//           { url: "getdataCity", setter: setCategoriesCTData },
//           { url: "getdataCollege", setter: setCategoriesCData },
//           { url: "getdataEducation", setter: setCategoriesEData },
//           { url: "getdataCourse", setter: setCategories },
//           { url: "getdataOfficeCity", setter: setCategoriesOData }
//         ];

//         const requests = endpoints.map(endpoint => 
//           axios.get(`http://localhost:8000/${endpoint.url}`)
//             .then(res => {
//               const filteredData = res.data.data.filter(item => item.status === "Active");
//               endpoint.setter(filteredData);
//             })
//         );

//         await Promise.all(requests);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to load form options. Please refresh the page.");
//       }
//     };

//     fetchData();
//   }, []);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError(null);

//     if (!formData.admission) {
//       setError("Please select an admission status");
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       // Prepare data with capitalized fields
//       const submissionData = Object.fromEntries(
//         Object.entries(formData).map(([key, value]) => [
//           key, 
//           typeof value === "string" ? capitalizeFirstLetter(value) : value
//         ])
//       );

//       const endpoint = formData.admission === "Confirm Admission" 
//         ? "addEnquiry_Student" 
//         : "addEnquiry_FollowUp";

//       const response = await axios.post(
//         `http://localhost:8000/${endpoint}`,
//         submissionData
//       );

//       if (response.data.success) {
//         alert("Data Added Successfully!");
//         resetForm();
//         navigate(formData.admission === "Confirm Admission" 
//           ? "/Head/enquiry_student" 
//           : "/Head/enquiry_follow_up");
//       } else {
//         throw new Error(response.data.message || "Failed to add data");
//       }
//     } catch (err) {
//       console.error("Submission error:", err);
//       setError(
//         err.response?.data?.message ||
//         err.message ||
//         "Error submitting form. Please try again."
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Reset form to initial state
//   const resetForm = () => {
//     setFormData({
//       student_name: "",
//       university_name: "",
//       college_name: "",
//       city_name: "",
//       mobile_number: "",
//       whatsApp_number: "",
//       date_birth: "",
//       gmail: "",
//       blood_Group: "",
//       education_name: "",
//       marital_status: "",
//       office_city_name: "",
//       temporary_address: "",
//       permanent_address: "",
//       mode_education: "",
//       name: "",
//       duration: "",
//       amount: "",
//       placement_reference: "",
//       system: "",
//       tshirt: "",
//       batch_slot: "",
//       status: "Active",
//       current_date: new Date().toISOString().split('T')[0],
//       end_date: "",
//       admission: ""
//     });
//     setFilteredDurations([]);
//   };

//   return (
//     <Container className="d-flex justify-content-center mt-5">
//       <Col md={12} sm={12} lg={10} xl={10}>
//         <h1 className="text-center text-dark pt-3">Student Enquiry</h1>
//         <div className="border-top border-5 mt-4 border-primary"></div>
        
//         {error && (
//           <div className="alert alert-danger mt-3">
//             {error}
//           </div>
//         )}

//         <Card className="">
//           <Card.Body>
//             <Form onSubmit={handleSubmit}>
//               <Row>
//                 {/* Student Name */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Student Name:</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="student_name"
//                     placeholder="Enter Full Name"
//                     value={formData.student_name}
//                     required
//                     onChange={handleChange}
//                   />
//                 </Col>

//                 {/* City */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>City Name:</Form.Label>
//                   <Form.Select
//                     name="city_name"
//                     value={formData.city_name}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">Choose a City</option>
//                     {categoriesCtdata.map((city) => (
//                       <option key={city._id} value={city.city_name}>
//                         {city.city_name}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Col>

//                 {/* University */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>University Name:</Form.Label>
//                   <Form.Select
//                     name="university_name"
//                     value={formData.university_name}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">Choose a university</option>
//                     {categoriesUdata.map((university) => (
//                       <option key={university._id} value={university.university_name}>
//                         {university.university_name}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Col>

//                 {/* College */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>College Name:</Form.Label>
//                   <Form.Select
//                     name="college_name"
//                     value={formData.college_name}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">Choose a College</option>
//                     {categoriesCdata.map((college) => (
//                       <option key={college._id} value={college.college_name}>
//                         {college.college_name}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Col>

//                 {/* Gmail */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Email:</Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="gmail"
//                     placeholder="Enter Email"
//                     value={formData.gmail}
//                     required
//                     onChange={handleChange}
//                   />
//                 </Col>

//                 {/* Mobile No */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Mobile No:</Form.Label>
//                   <Form.Control
//                     type="tel"
//                     name="mobile_number"
//                     placeholder="Enter Mobile No"
//                     value={formData.mobile_number}
//                     required
//                     onChange={handleChange}
//                   />
//                 </Col>

//                 {/* WhatsApp No */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>WhatsApp No:</Form.Label>
//                   <Form.Control
//                     type="tel"
//                     name="whatsApp_number"
//                     placeholder="Enter WhatsApp No"
//                     value={formData.whatsApp_number}
//                     required
//                     onChange={handleChange}
//                   />
//                 </Col>

//                 {/* Date of Birth */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Date Of Birth:</Form.Label>
//                   <Form.Control
//                     type="date"
//                     name="date_birth"
//                     value={formData.date_birth}
//                     required
//                     onChange={handleChange}
//                   />
//                 </Col>

//                 {/* Education Name */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Education Name:</Form.Label>
//                   <Form.Select
//                     name="education_name"
//                     value={formData.education_name}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">Choose an education</option>
//                     {categoriesEdata.map((education) => (
//                       <option key={education._id} value={education.education_name}>
//                         {education.education_name}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Col>

//                 {/* Mode Education */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Mode Education:</Form.Label>
//                   <div className="d-flex">
//                     <Form.Check
//                       type="radio"
//                       label="Online"
//                       name="mode_education"
//                       value="Online"
//                       checked={formData.mode_education === "Online"}
//                       onChange={handleChange}
//                       className="ps-5"
//                     />
//                     <Form.Check
//                       type="radio"
//                       label="Offline"
//                       name="mode_education"
//                       value="Offline"
//                       checked={formData.mode_education === "Offline"}
//                       onChange={handleChange}
//                       className="ps-5"
//                     />
//                   </div>
//                 </Col>

//                 {/* Office City Name */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Office City Name:</Form.Label>
//                   <Form.Select
//                     name="office_city_name"
//                     value={formData.office_city_name}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">Choose a city</option>
//                     {categoriesOData.map((city) => (
//                       <option key={city._id} value={city.office_city_name}>
//                         {city.office_city_name}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Col>

//                 {/* Course Name */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Course Name:</Form.Label>
//                   <Form.Select
//                     name="name"
//                     value={formData.name}
//                     onChange={handleCourseChange}
//                     required
//                   >
//                     <option value="">Choose Course Name</option>
//                     {categories.map((course) => (
//                       <option key={course._id} value={course.name}>
//                         {course.name}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Col>

//                 {/* Temporary Address */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Temporary Address:</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={3}
//                     name="temporary_address"
//                     placeholder="Enter Temporary Address"
//                     value={formData.temporary_address}
//                     required
//                     onChange={handleChange}
//                   />
//                 </Col>

//                 {/* Permanent Address */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Permanent Address:</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={3}
//                     name="permanent_address"
//                     placeholder="Enter Permanent Address"
//                     value={formData.permanent_address}
//                     required
//                     onChange={handleChange}
//                   />
//                 </Col>

//                 {/* Duration */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Duration:</Form.Label>
//                   <Form.Select
//                     name="duration"
//                     value={formData.duration}
//                     onChange={handleDurationChange}
//                     required
//                     disabled={!formData.name}
//                   >
//                     <option value="">Choose Duration</option>
//                     {filteredDurations.map((category) => (
//                       <option key={category._id} value={category.duration}>
//                         {category.duration}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Col>

//                 {/* Amount */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Amount:</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="amount"
//                     placeholder="Amount will auto-fill"
//                     value={formData.amount}
//                     readOnly
//                     required
//                   />
//                 </Col>

//                 {/* Marital Status */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Marital Status:</Form.Label>
//                   <div className="d-flex">
//                     <Form.Check
//                       type="radio"
//                       label="Single"
//                       name="marital_status"
//                       value="Single"
//                       checked={formData.marital_status === "Single"}
//                       onChange={handleChange}
//                       className="ps-5"
//                     />
//                     <Form.Check
//                       type="radio"
//                       label="Married"
//                       name="marital_status"
//                       value="Married"
//                       checked={formData.marital_status === "Married"}
//                       onChange={handleChange}
//                       className="ps-5"
//                     />
//                   </div>
//                 </Col>

//                 {/* Blood Group */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Blood Group:</Form.Label>
//                   <div className="d-flex flex-wrap">
//                     {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
//                       <Form.Check
//                         key={group}
//                         type="radio"
//                         label={group}
//                         name="blood_Group"
//                         value={group}
//                         checked={formData.blood_Group === group}
//                         onChange={handleChange}
//                         className="pe-3"
//                       />
//                     ))}
//                   </div>
//                 </Col>

//                 {/* Placement Reference */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Placement Reference:</Form.Label>
//                   <div className="d-flex">
//                     <Form.Check
//                       type="radio"
//                       label="Yes"
//                       name="placement_reference"
//                       value="Yes"
//                       checked={formData.placement_reference === "Yes"}
//                       onChange={handleChange}
//                       className="ps-5"
//                     />
//                     <Form.Check
//                       type="radio"
//                       label="No"
//                       name="placement_reference"
//                       value="No"
//                       checked={formData.placement_reference === "No"}
//                       onChange={handleChange}
//                       className="ps-5"
//                     />
//                   </div>
//                 </Col>

//                 {/* System */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>System:</Form.Label>
//                   <div className="d-flex">
//                     <Form.Check
//                       type="radio"
//                       label="Office system"
//                       name="system"
//                       value="Office system"
//                       checked={formData.system === "Office system"}
//                       onChange={handleChange}
//                       className="ps-4"
//                     />
//                     <Form.Check
//                       type="radio"
//                       label="Owned a Laptop"
//                       name="system"
//                       value="Owned a Laptop"
//                       checked={formData.system === "Owned a Laptop"}
//                       onChange={handleChange}
//                       className="ps-4"
//                     />
//                   </div>
//                 </Col>

//                 {/* Batch Slot */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Batch Slot:</Form.Label>
//                   <div className="d-flex">
//                     <Form.Check
//                       type="radio"
//                       label="Morning (10 to 2)"
//                       name="batch_slot"
//                       value="Morning (10 to 2)"
//                       checked={formData.batch_slot === "Morning (10 to 2)"}
//                       onChange={handleChange}
//                       className="ps-4"
//                     />
//                     <Form.Check
//                       type="radio"
//                       label="Afternoon (2 to 6)"
//                       name="batch_slot"
//                       value="Afternoon (2 to 6)"
//                       checked={formData.batch_slot === "Afternoon (2 to 6)"}
//                       onChange={handleChange}
//                       className="ps-4"
//                     />
//                   </div>
//                 </Col>

//                 {/* Tshirt */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Tshirt Size:</Form.Label>
//                   <div className="d-flex flex-wrap">
//                     {["S", "M", "L", "XL", "XXL", "2XL"].map((size) => (
//                       <Form.Check
//                         key={size}
//                         type="radio"
//                         label={size}
//                         name="tshirt"
//                         value={size}
//                         checked={formData.tshirt === size}
//                         onChange={handleChange}
//                         className="pe-3"
//                       />
//                     ))}
//                   </div>
//                 </Col>

//                 {/* Current Date */}
//                 <Col md={12} lg={6}>
//                   <Form.Label>Current Date:</Form.Label>
//                   <Form.Control
//                     type="date"
//                     name="current_date"
//                     value={formData.current_date}
//                     readOnly
//                     required
//                   />
//                 </Col>

//                 {/* Follow Up Date */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Enquiry Follow Up End Date:</Form.Label>
//                   <Form.Control
//                     type="date"
//                     name="end_date"
//                     value={formData.end_date}
//                     onChange={handleChange}
//                   />
//                 </Col>

//                 {/* Admission Status */}
//                 <Col md={12} className="d-flex mt-3">
//                   <Form.Label>Admission Status:</Form.Label>
//                   <Form.Check
//                     type="radio"
//                     label="Pending Admission"
//                     name="admission"
//                     value="Pending Admission"
//                     checked={formData.admission === "Pending Admission"}
//                     onChange={handleChange}
//                     disabled={formData.admission}
//                     className="ps-5"
//                   />
//                   <Form.Check
//                     type="radio"
//                     label="Confirm Admission"
//                     name="admission"
//                     value="Confirm Admission"
//                     checked={formData.admission === "Confirm Admission"}
//                     onChange={handleChange}
//                     disabled={formData.admission}
//                     className="ps-5"
//                   />
//                 </Col>

//                 {/* Status */}
//                 <Col md={12} className="d-flex mt-3">
//                   <Form.Label>Status:</Form.Label>
//                   <Form.Check
//                     type="radio"
//                     label="Active"
//                     name="status"
//                     value="Active"
//                     checked={formData.status === "Active"}
//                     onChange={handleChange}
//                     className="ps-5"
//                   />
//                   <Form.Check
//                     type="radio"
//                     label="Inactive"
//                     name="status"
//                     value="Inactive"
//                     checked={formData.status === "Inactive"}
//                     onChange={handleChange}
//                     className="ps-5"
//                   />
//                 </Col>

//                 {/* Submit Button */}
//                 <Col md={12} className="d-flex justify-content-center mt-4">
//                   <Button
//                     type="submit"
//                     variant="primary"
//                     size="lg"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                         Submitting...
//                       </>
//                     ) : (
//                       "Submit"
//                     )}
//                   </Button>
//                 </Col>
//               </Row>
//             </Form>
//           </Card.Body>
//         </Card>
//       </Col>
//     </Container>
//   );
// };

// export default Enquiry_Add;