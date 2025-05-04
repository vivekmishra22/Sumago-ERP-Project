import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const Update_Enquiry_FollowUp = () => {

  const navigate = useNavigate("");
  const {_id} = useParams("");
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

  //    Capital
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

  // fetchad data 
  useEffect(() => {

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setCurrentDate(formattedDate);

    // University
    axios
      .get("http://localhost:8000/getdataUniversity")
      .then((res) => {
        const udata = res.data.data.filter((item) => item.status === "Active");
        setCategoriesUData(udata);
        console.log("Categories fetched:", res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });

    // City
    axios
      .get("http://localhost:8000/getdataCity")
      .then((res) => {
        const ctdata = res.data.data.filter((item) => item.status === "Active");
        setCategoriesCTData(ctdata); // Assuming the response contains a `data` array
        console.log("Categories fetched:", res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });

    // College
    axios
      .get("http://localhost:8000/getdataCollege")
      .then((res) => {
        const codata = res.data.data.filter((item) => item.status === "Active");
        setCategoriesCData(codata);
        console.log("Categories fetched:", res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });

    // Education
    axios
      .get("http://localhost:8000/getdataEducation")
      .then((res) => {
        const edata = res.data.data.filter((item) => item.status === "Active");
        setCategoriesEData(edata);
        console.log("Categories fetched:", res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });

    // Course
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

    // Office City
    axios
      .get("http://localhost:8000/getdataOfficeCity")
      .then((res) => {
        const odata = res.data.data.filter((item) => item.status === "Active");
        setCategoriesOData(odata); // Assuming the response contains a data array
        console.log("Categories fetched:", res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);


  //  Fetch user date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // GetById fetchad
  useEffect(() => {
    axios
      .get(`http://localhost:8000/getbyIdEnquiry_Student/${_id}`)
      .then(res => {
        console.log("Fetched Data: Enquiry Student", res.data);
        const data = res.data.data;

        // Populate state with fetched data
        setStudent_name(data.student_name || " ");
        setUniversityName(data.university_name || " ");
        setCollegeName(data.guest_lecture_batch || " ");
        setCityName(data.city_name || " ");
        setMobile_number(data.mobile_number || " ");
        setWhatsApp_number(data.whatsApp_number || " ");
        setDate_birth(formatDate(data.date_birth || " "));
        setGmail(data.gmail || " ");
        setBlood_Group(data.blood_Group || " ");
        setEducationName(data.education_name || " ");
        setMarital_status(data.marital_status || " ");
        setOfficeCityName(data.office_city_name || " ");
        setTemporary_address(data.temporary_address || " ");
        setPermanent_address(data.temporary_address || " ");
        setMode_education(data.mode_education || " ");
        setName(data.name || " ");
        setDuration(data.duration || " ");
        setAmount(data.amount || " ");
        setPlacement_reference(data.placement_reference || " ");
        setsystem(data.system || " ");
        setTshirt(data.tshirt || " ");
        setBatch_slot(data.batch_slot || " ");
        setCurrentDate(formatDate(data.current_date || " "));
        setEnd_Date(formatDate(data.end_date || " "));
        setAdmission(data.admission || " ");
        setStatus(data.status || " ");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [_id]); 

  const handleSubmit = (e) => {
    e.preventDefault();
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

    axios
      .put(`http://localhost:8000/UpdateEnquiry_Student/${_id}`, userData)

      .then((res) => {
        console.log(res.data);
        alert("Data updated successfully");
        navigate("/Head/enquiry_follow_up");
        setStudent_name("");
        setUniversityName("");
        setCollegeName("");
        setCityName("");
        setMobile_number("");
        setWhatsApp_number("");
        setDate_birth(new Date(date_birth).toISOString().split("T")[0]);
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
        setAdmission("");
        setCurrentDate("");
        setEnd_Date(new Date(end_date).toISOString().split("T")[0]);
        setStatus("");
      })
      .catch((error) => {
        console.error("Error updating :", error);
      });
  };

  console.log("Rendering UpdateGuest");
  return (
    <Container className="d-flex justify-content-center mt-5">
      <Col md={12} sm={12} lg={10} lx={10} lxx={10}>
        <h1 className="text-center text-dark pt-3">Update Student Enquiry </h1>
        <div className="border-top border-5 mt-4  border-primary"></div>
        <Card className="">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>

                {/* Student Name */}
                <Col md={12} lg={6} lx={6} lxx={6} className="pb-4">
                  <Form.Label>Student Name : </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Full Name"
                    value={student_name}
                    required
                    onChange={(e) => setStudent_name(e.target.value)}
                  />
                </Col>

                {/* City */}
                <Col md={12} lg={6} lx={6} lxx={6} className="pb-4">
                  <Form.Label>City Name :</Form.Label>
                  <Form.Select
                    aria-label="Select College Name"
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
                <Col md={12} lg={6} lx={6} lxx={6} className="pb-4">
                  <Form.Label>University Name :</Form.Label>
                  <Form.Select
                    aria-label="Select university"
                    value={university_name}
                    onChange={(e) => setUniversityName(e.target.value)}
                    required
                  >
                    <option value="">Choose a university</option>
                    {categoriesUdata.map((university) => (
                      <option
                        key={university._id}
                        value={university.university_name}
                      >
                        {university.university_name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                {/* College  */}
                <Col md={12} lg={6} lx={6} lxx={6} className="pb-4">
                  <Form.Label>College Name :</Form.Label>

                  <Form.Select
                    aria-label="Select College Name"
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
                <Col md={12} lg={6} lx={6} lxx={6} className=" pb-4">
                  <Form.Label>Gmail :</Form.Label>
                  <Form.Control
                    type="gmail"
                    placeholder="Enter Gmail"
                    value={gmail}
                    required
                    onChange={(e) => setGmail(e.target.value)}
                  />
                </Col>

                {/* Mobile No  */}
                <Col md={12} lg={6} lx={6} lxx={6} className="pb-4">
                  <Form.Label>Mobile No :</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Mobile No"
                    value={mobile_number}
                    required
                    onChange={(e) => setMobile_number(e.target.value)}
                  />
                </Col>

                {/* Whatsapp No */}
                <Col md={12} lg={6} lx={6} lxx={6} className="pb-4">
                  <Form.Label>WhatsApp No :</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter WhatsApp No"
                    value={whatsApp_number}
                    required
                    onChange={(e) => setWhatsApp_number(e.target.value)}
                  />
                </Col>

                {/* Date Birthe */}
                <Col md={12} lg={6} lx={6} lxx={6} className="pb-4">
                  <Form.Label>Date Of Birth :</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter Birth Date"
                    value={date_birth}
                    required
                    onChange={(e) => setDate_birth(e.target.value)}
                  />
                </Col>

                {/* Education Name */}
                <Col md={12} lg={6} lx={6} lxx={6} className="pb-4">
                  <Form.Label>Education Name :</Form.Label>

                  <Form.Select
                    aria-label="Select education"
                    value={education_name}
                    onChange={(e) => setEducationName(e.target.value)}
                    required
                  >
                    <option value="">Choose a education</option>
                    {categoriesEdata.map((education) => (
                      <option
                        key={education._id}
                        value={education.education_name}
                      >
                        {education.education_name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                {/* Mode Education */}
                <Col md={12} lg={6} lx={6} lxx={6} className="pb-4">
                  <Form.Label>Mode Education :</Form.Label>

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

                {/* Offce name */}
                <Col md={12} lg={6} lx={6} lxx={6} className="pb-4">
                  <Form.Label>Office City Name :</Form.Label>
                  <Form.Select
                    aria-label="Select city"
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
                <Col md={12} lg={6} lx={6} lxx={6} className="pb-4">
                  <Form.Label>Course Name :</Form.Label>
                  <Form.Select
                    aria-label="select Course"
                    value={name}
                    onChange={(e) => {
                      const selectedCourse = e.target.value;
                      setName(selectedCourse);

                      // Filter durations based on selected course
                      const courseDurations = categories.filter(
                        (category) => category.name === selectedCourse
                      );

                      setFilteredDurations(courseDurations);

                      // Reset duration and amount when course changes
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

                {/* Temporrary Address */}
                <Col md={12} className="pb-4">
                  <Form.Label>Temporary Address :</Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    rows={1}
                    placeholder="Enter Temporary Address"
                    value={temporary_address}
                    required
                    onChange={(e) => setTemporary_address(e.target.value)}
                  />
                </Col>

                {/* Permanent Address */}
                <Col md={12} className="pb-4">
                  <Form.Label>Permanent Address :</Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    rows={1}
                    placeholder="Enter Permanent Address"
                    value={permanent_address}
                    required
                    onChange={(e) => setPermanent_address(e.target.value)}
                  />
                </Col>

                {/* Duration */}
                <Col md={12} lg={6} lx={6} lxx={6} className="pb-4">
                  <Form.Label>Duration :</Form.Label>
                  <Form.Select
                    aria-label="select Duration"
                    value={duration}
                    onChange={(e) => {
                      const selectedDuration = e.target.value;
                      setDuration(selectedDuration);

                      // Find the corresponding amount based on the selected duration
                      const selectedCategory = filteredDurations.find(
                        (category) => category.duration === selectedDuration
                      );

                      // If a matching category is found, set the amount
                      if (selectedCategory) {
                        setAmount(selectedCategory.amount);
                      }
                    }}
                    required
                    disabled={!name} // Disable if no course is selected
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
                <Col md={12} lg={6} lx={6} lxx={6} className="pb-4">
                  <Form.Label>Amount :</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Amount will auto-fill"
                    value={amount}
                    readOnly // Make it read-only since it's auto-filled
                    required
                  />
                </Col>

                {/* Marital Status */}
                <Col md={12} lg={6} lx={6} lxx={6} className="pb-4 ">
                  <Form.Label>Marital Status :</Form.Label>

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
                <Col md={12} lg={6} lx={6} lxx={6} className=" pb-4">
                  <Form.Label className="" required>
                    Blood Group :
                  </Form.Label>

                  <Col md={12}  lg={6} lx={6} lxx={6}
                   className="d-flex">
                    <Form.Check
                      type="radio"
                      label="A+"
                      name="blood_Group"
                      value="A+"
                      checked={blood_Group === "A+"}
                      onChange={(e) => setBlood_Group(e.target.value)}
                      // className="ps-3"
                    />
                    <Form.Check
                      type="radio"
                      label="A-"
                      name="blood_Group"
                      value="A-"
                      checked={blood_Group === "A-"}
                      onChange={(e) => setBlood_Group(e.target.value)}
                      // className="ps-5"
                    />
                    <Form.Check
                      type="radio"
                      label="AB+"
                      name="blood_Group"
                      value="AB+"
                      checked={blood_Group === "AB+"}
                      onChange={(e) => setBlood_Group(e.target.value)}
                      // className="ps-5"
                    />
                    <Form.Check
                      type="radio"
                      label="AB-"
                      name="blood_Group"
                      value="AB-"
                      checked={blood_Group === "AB-"}
                      onChange={(e) => setBlood_Group(e.target.value)}
                      // className="ps-5"
                    />
                    <Form.Check
                      type="radio"
                      label="B+"
                      name="blood_Group"
                      value="B+"
                      checked={blood_Group === "B+"}
                      onChange={(e) => setBlood_Group(e.target.value)}
                      // className="ps-5"
                    />
                    <Form.Check
                      type="radio"
                      label="B-"
                      name="blood_Group"
                      value="B-"
                      checked={blood_Group === "B-"}
                      onChange={(e) => setBlood_Group(e.target.value)}
                      // className="ps-5"
                    />
                    <Form.Check
                      type="radio"
                      label="O+"
                      name="blood_Group"
                      value="O+"
                      checked={blood_Group === "O+"}
                      onChange={(e) => setBlood_Group(e.target.value)}
                      // className="ps-5"
                    />
                    <Form.Check
                      type="radio"
                      label="O-"
                      name="blood_Group"
                      value="O-"
                      checked={blood_Group === "O-"}
                      onChange={(e) => setBlood_Group(e.target.value)}
                      // className="ps-5"
                    />
                  </Col>
                </Col>

                {/* Placement Reference */}
                <Col md={12} lg={6} lx={6} lxx={6} className="pb-4">
                  <Form.Label>Placement Reference :</Form.Label>

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

                {/* system */}
                <Col md={12} lg={6} lx={6} lxx={6} className="pb-4">
                  <Form.Label>system :</Form.Label>

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
                <Col md={12} lg={6} lx={6} lxx={6} className="pb-4 ">
                  <Form.Label>Batch Slot :</Form.Label>
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
                <Col md={12} lg={6} lx={6} lxx={6} className="pb-4 ">
                  <Form.Label>Tshirt :</Form.Label>
                  <div className="d-flex">
                    <Form.Check
                      type="radio"
                      label="S"
                      name="tshirt"
                      value="S"
                      checked={tshirt === "S"}
                      onChange={(e) => setTshirt(e.target.value)}
                      // className="ps-5"
                    />
                    <Form.Check
                      type="radio"
                      label="M"
                      name="tshirt"
                      value="M"
                      checked={tshirt === "M"}
                      onChange={(e) => setTshirt(e.target.value)}
                      // className="ps-5"
                    />
                    <Form.Check
                      type="radio"
                      label="L"
                      name="tshirt"
                      value="L"
                      checked={tshirt === "L"}
                      onChange={(e) => setTshirt(e.target.value)}
                      // className="ps-5"
                    />
                    <Form.Check
                      type="radio"
                      label="XL"
                      name="tshirt"
                      value="XL"
                      checked={tshirt === "XL"}
                      onChange={(e) => setTshirt(e.target.value)}
                      // className="ps-5"
                    />
                    <Form.Check
                      type="radio"
                      label="XXL"
                      name="tshirt"
                      value="XXL"
                      checked={tshirt === "XXL"}
                      onChange={(e) => setTshirt(e.target.value)}
                      // className="ps-5"
                    />
                    <Form.Check
                      type="radio"
                      label="2XL    "
                      name="tshirt"
                      value="2XL"
                      checked={tshirt === "2XL"}
                      onChange={(e) => setTshirt(e.target.value)}
                      // className="ps-5"
                    />
                  </div>
                </Col>

                {/* Currend date  */}
                <Col md={12} lg={6} lx={6} lxx={6}>
                  <Form.Label>Current Date :</Form.Label>
                  <Form.Control
                    type="date"
                    value={current_date}
                    onChange={(e) => setCurrentDate(e.target.value)}
                    required
                    readOnly
                  />
                </Col>

                {/* Follow Up Date */}
                <Col md={12} lg={6} lx={6} lxx={6} className="pb-4">
                  <Form.Label>Enquiry Follow Up End Date :</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter Follow Up End Date"
                    value={end_date}
                    required
                    onChange={(e) => setEnd_Date(e.target.value)}
                  />
                </Col>

                {/* Admission  */}
                <Col md={12} className="d-flex mt-3">
                  <Form.Label>Admission Status</Form.Label>
                  <Form.Check
                    type="radio"
                    label="Pending Admission"
                    name="admission"
                    value="Pending Admission"
                    checked={admission === "Pending Admission"}
                    onChange={(e) => setAdmission(e.target.value)}
                    className="ps-5"
                  />
                  <Form.Check
                    type="radio"
                    label="Confirm Admission"
                    name="admission"
                    value="Confirm Admission"
                    checked={admission === "Confirm Admission"}
                    onChange={(e) => setAdmission(e.target.value)}
                    className="ps-5"
                  />
                </Col>

                {/* State */}
                <Col md={12} className="d-flex mt-3">
                  <Form.Label>Status</Form.Label>
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

                {/* Submit */}
                <Col md={12} className="d-flex justify-content-center">
                  <Button
                    type="submit"
                    className="mt-4 w-25 "
                    //   onClick={() => navigate("/Head/enquiry_student")}
                    // onClick={() => navigate(`/Head/enquiry_follow_up/${_id}`)}
                    // onClick={() => navigate(`/Head/enquiry_follow_up/${_id}`)}

                  >
                    Submit
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

export default Update_Enquiry_FollowUp;

// import React, { useEffect, useState } from "react";
// import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// const Update_Enquiry_FollowUp = () => {
//   const navigate = useNavigate();
//   const { _id } = useParams("");
//   const [loading, setLoading] = useState(false);

//   // Form state
//   const [student_name, setStudent_name] = useState("");
//   const [university_name, setUniversityName] = useState("");
//   const [college_name, setCollegeName] = useState("");
//   const [city_name, setCityName] = useState("");
//   const [mobile_number, setMobile_number] = useState("");
//   const [whatsApp_number, setWhatsApp_number] = useState("");
//   const [date_birth, setDate_birth] = useState("");
//   const [gmail, setGmail] = useState("");
//   const [blood_Group, setBlood_Group] = useState("");
//   const [education_name, setEducationName] = useState("");
//   const [marital_status, setMarital_status] = useState("");
//   const [office_city_name, setOfficeCityName] = useState("");
//   const [temporary_address, setTemporary_address] = useState("");
//   const [permanent_address, setPermanent_address] = useState("");
//   const [mode_education, setMode_education] = useState("");
//   const [name, setName] = useState("");
//   const [duration, setDuration] = useState("");
//   const [amount, setAmount] = useState("");
//   const [placement_reference, setPlacement_reference] = useState("");
//   const [system, setsystem] = useState("");
//   const [tshirt, setTshirt] = useState("");
//   const [batch_slot, setBatch_slot] = useState("");
//   const [status, setStatus] = useState("Active");
//   const [filteredDurations, setFilteredDurations] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [categoriesOData, setCategoriesOData] = useState([]);
//   const [categoriesUdata, setCategoriesUData] = useState([]);
//   const [categoriesCdata, setCategoriesCData] = useState([]);
//   const [categoriesEdata, setCategoriesEData] = useState([]);
//   const [categoriesCtdata, setCategoriesCTData] = useState([]);
//   const [current_date, setCurrentDate] = useState("");
//   const [end_date, setEnd_Date] = useState("");
//   const [admission, setAdmission] = useState("");

//   // Capitalize first letter
//   const capitalizeFirstLetter = (input) => {
//     if (typeof input === "string") {
//       return input
//         .split(" ")
//         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(" ");
//     }
//     return input;
//   };

//   // Format date for display
//   const formatDateForInput = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   // Fetch initial data
//   useEffect(() => {
//     const today = new Date();
//     const formattedDate = today.toISOString().split('T')[0];
//     setCurrentDate(formattedDate);

//     const fetchData = async () => {
//       try {
//         const endpoints = [
//           { url: "http://localhost:8000/getdataUniversity", setter: setCategoriesUData },
//           { url: "http://localhost:8000/getdataCity", setter: setCategoriesCTData },
//           { url: "http://localhost:8000/getdataCollege", setter: setCategoriesCData },
//           { url: "http://localhost:8000/getdataEducation", setter: setCategoriesEData },
//           { url: "http://localhost:8000/getdataCourse", setter: setCategories },
//           { url: "http://localhost:8000/getdataOfficeCity", setter: setCategoriesOData }
//         ];

//         const responses = await Promise.all(
//           endpoints.map(endpoint => 
//             axios.get(endpoint.url).then(res => ({
//               data: res.data.data.filter(item => item.status === "Active"),
//               setter: endpoint.setter
//             }))
//           )
//         );

//         responses.forEach(({ data, setter }) => setter(data));
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   // Fetch user data by ID
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8000/getbyIdEnquiry_Student/${_id}`);
//         const data = res.data.data;

//         setStudent_name(data.student_name || "");
//         setUniversityName(data.university_name || "");
//         setCollegeName(data.college_name || "");
//         setCityName(data.city_name || "");
//         setMobile_number(data.mobile_number || "");
//         setWhatsApp_number(data.whatsApp_number || "");
//         setDate_birth(formatDateForInput(data.date_birth || ""));
//         setGmail(data.gmail || "");
//         setBlood_Group(data.blood_Group || "");
//         setEducationName(data.education_name || "");
//         setMarital_status(data.marital_status || "");
//         setOfficeCityName(data.office_city_name || "");
//         setTemporary_address(data.temporary_address || "");
//         setPermanent_address(data.permanent_address || "");
//         setMode_education(data.mode_education || "");
//         setName(data.name || "");
//         setDuration(data.duration || "");
//         setAmount(data.amount || "");
//         setPlacement_reference(data.placement_reference || "");
//         setsystem(data.system || "");
//         setTshirt(data.tshirt || "");
//         setBatch_slot(data.batch_slot || "");
//         setCurrentDate(formatDateForInput(data.current_date || ""));
//         setEnd_Date(formatDateForInput(data.end_date || ""));
//         setAdmission(data.admission || "");
//         setStatus(data.status || "");

//         // Filter durations if course is already selected
//         if (data.name) {
//           const courseDurations = categories.filter(
//             category => category.name === data.name
//           );
//           setFilteredDurations(courseDurations);
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, [_id, categories]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const userData = {
//       student_name: capitalizeFirstLetter(student_name),
//       university_name: capitalizeFirstLetter(university_name),
//       college_name: capitalizeFirstLetter(college_name),
//       city_name: capitalizeFirstLetter(city_name),
//       mobile_number,
//       whatsApp_number,
//       date_birth,
//       gmail,
//       blood_Group: capitalizeFirstLetter(blood_Group),
//       education_name: capitalizeFirstLetter(education_name),
//       marital_status: capitalizeFirstLetter(marital_status),
//       office_city_name: capitalizeFirstLetter(office_city_name),
//       temporary_address: capitalizeFirstLetter(temporary_address),
//       permanent_address: capitalizeFirstLetter(permanent_address),
//       mode_education: capitalizeFirstLetter(mode_education),
//       duration: capitalizeFirstLetter(duration),
//       amount,
//       placement_reference: capitalizeFirstLetter(placement_reference),
//       name: capitalizeFirstLetter(name),
//       system: capitalizeFirstLetter(system),
//       tshirt: capitalizeFirstLetter(tshirt),
//       batch_slot: capitalizeFirstLetter(batch_slot),
//       current_date,
//       end_date,
//       admission: capitalizeFirstLetter(admission),
//       status: capitalizeFirstLetter(status),
//     };

//     try {
//       await axios.put(`http://localhost:8000/UpdateEnquiry_Student/${_id}`, userData);
//       alert("Data updated successfully");
//       navigate("/Head/enquiry_follow_up");
//     } catch (error) {
//       console.error("Error updating data:", error);
//       alert("Error updating data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="d-flex justify-content-center mt-5">
//       <Col md={12} sm={12} lg={10} xl={10} xxl={10}>
//         <h1 className="text-center text-dark pt-3">Update Student Enquiry</h1>
//         <div className="border-top border-5 mt-4 border-primary"></div>
//         <Card>
//           <Card.Body>
//             <Form onSubmit={handleSubmit}>
//               <Row>
//                 {/* Student Name */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Student Name : </Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter Full Name"
//                     value={student_name}
//                     required
//                     onChange={(e) => setStudent_name(e.target.value)}
//                   />
//                 </Col>

//                 {/* City */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>City Name :</Form.Label>
//                   <Form.Select
//                     aria-label="Select College Name"
//                     value={city_name}
//                     onChange={(e) => setCityName(e.target.value)}
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
//                   <Form.Label>University Name :</Form.Label>
//                   <Form.Select
//                     aria-label="Select university"
//                     value={university_name}
//                     onChange={(e) => setUniversityName(e.target.value)}
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
//                   <Form.Label>College Name :</Form.Label>
//                   <Form.Select
//                     aria-label="Select College Name"
//                     value={college_name}
//                     onChange={(e) => setCollegeName(e.target.value)}
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
//                   <Form.Label>Gmail :</Form.Label>
//                   <Form.Control
//                     type="email"
//                     placeholder="Enter Gmail"
//                     value={gmail}
//                     required
//                     onChange={(e) => setGmail(e.target.value)}
//                   />
//                 </Col>

//                 {/* Mobile No */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Mobile No :</Form.Label>
//                   <Form.Control
//                     type="number"
//                     placeholder="Enter Mobile No"
//                     value={mobile_number}
//                     required
//                     onChange={(e) => setMobile_number(e.target.value)}
//                   />
//                 </Col>

//                 {/* WhatsApp No */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>WhatsApp No :</Form.Label>
//                   <Form.Control
//                     type="number"
//                     placeholder="Enter WhatsApp No"
//                     value={whatsApp_number}
//                     required
//                     onChange={(e) => setWhatsApp_number(e.target.value)}
//                   />
//                 </Col>

//                 {/* Date of Birth */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Date Of Birth :</Form.Label>
//                   <Form.Control
//                     type="date"
//                     placeholder="Enter Birth Date"
//                     value={date_birth}
//                     required
//                     onChange={(e) => setDate_birth(e.target.value)}
//                   />
//                 </Col>

//                 {/* Education Name */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Education Name :</Form.Label>
//                   <Form.Select
//                     aria-label="Select education"
//                     value={education_name}
//                     onChange={(e) => setEducationName(e.target.value)}
//                     required
//                   >
//                     <option value="">Choose a education</option>
//                     {categoriesEdata.map((education) => (
//                       <option key={education._id} value={education.education_name}>
//                         {education.education_name}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Col>

//                 {/* Mode Education */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Mode Education :</Form.Label>
//                   <div className="d-flex">
//                     <Form.Check
//                       type="radio"
//                       label="Online"
//                       name="mode_education"
//                       value="Online"
//                       checked={mode_education === "Online"}
//                       onChange={(e) => setMode_education(e.target.value)}
//                       className="ps-5"
//                     />
//                     <Form.Check
//                       type="radio"
//                       label="Offline"
//                       name="mode_education"
//                       value="Offline"
//                       checked={mode_education === "Offline"}
//                       onChange={(e) => setMode_education(e.target.value)}
//                       className="ps-5"
//                     />
//                   </div>
//                 </Col>

//                 {/* Office City */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Office City Name :</Form.Label>
//                   <Form.Select
//                     aria-label="Select city"
//                     value={office_city_name}
//                     onChange={(e) => setOfficeCityName(e.target.value)}
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
//                   <Form.Label>Course Name :</Form.Label>
//                   <Form.Select
//                     aria-label="select Course"
//                     value={name}
//                     onChange={(e) => {
//                       const selectedCourse = e.target.value;
//                       setName(selectedCourse);
//                       const courseDurations = categories.filter(
//                         category => category.name === selectedCourse
//                       );
//                       setFilteredDurations(courseDurations);
//                       setDuration("");
//                       setAmount("");
//                     }}
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
//                 <Col md={12} className="pb-4">
//                   <Form.Label>Temporary Address :</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={2}
//                     placeholder="Enter Temporary Address"
//                     value={temporary_address}
//                     required
//                     onChange={(e) => setTemporary_address(e.target.value)}
//                   />
//                 </Col>

//                 {/* Permanent Address */}
//                 <Col md={12} className="pb-4">
//                   <Form.Label>Permanent Address :</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={2}
//                     placeholder="Enter Permanent Address"
//                     value={permanent_address}
//                     required
//                     onChange={(e) => setPermanent_address(e.target.value)}
//                   />
//                 </Col>

//                 {/* Duration */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Duration :</Form.Label>
//                   <Form.Select
//                     aria-label="select Duration"
//                     value={duration}
//                     onChange={(e) => {
//                       const selectedDuration = e.target.value;
//                       setDuration(selectedDuration);
//                       const selectedCategory = filteredDurations.find(
//                         category => category.duration === selectedDuration
//                       );
//                       if (selectedCategory) {
//                         setAmount(selectedCategory.amount);
//                       }
//                     }}
//                     required
//                     disabled={!name}
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
//                   <Form.Label>Amount :</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Amount will auto-fill"
//                     value={amount}
//                     readOnly
//                     required
//                   />
//                 </Col>

//                 {/* Marital Status */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Marital Status :</Form.Label>
//                   <div className="d-flex">
//                     <Form.Check
//                       type="radio"
//                       label="Single"
//                       name="marital_status"
//                       value="Single"
//                       checked={marital_status === "Single"}
//                       onChange={(e) => setMarital_status(e.target.value)}
//                       className="ps-5"
//                     />
//                     <Form.Check
//                       type="radio"
//                       label="Married"
//                       name="marital_status"
//                       value="Married"
//                       checked={marital_status === "Married"}
//                       onChange={(e) => setMarital_status(e.target.value)}
//                       className="ps-5"
//                     />
//                   </div>
//                 </Col>

//                 {/* Blood Group */}
//                 <Col md={12} className="pb-4">
//                   <Form.Label>Blood Group :</Form.Label>
//                   <Row>
//                     {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
//                       <Col key={group} xs={6} sm={4} md={3} lg={3}>
//                         <Form.Check
//                           type="radio"
//                           label={group}
//                           name="blood_Group"
//                           value={group}
//                           checked={blood_Group === group}
//                           onChange={(e) => setBlood_Group(e.target.value)}
//                         />
//                       </Col>
//                     ))}
//                   </Row>
//                 </Col>

//                 {/* Placement Reference */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Placement Reference :</Form.Label>
//                   <div className="d-flex">
//                     <Form.Check
//                       type="radio"
//                       label="Yes"
//                       name="placement_reference"
//                       value="Yes"
//                       checked={placement_reference === "Yes"}
//                       onChange={(e) => setPlacement_reference(e.target.value)}
//                       className="ps-5"
//                     />
//                     <Form.Check
//                       type="radio"
//                       label="No"
//                       name="placement_reference"
//                       value="No"
//                       checked={placement_reference === "No"}
//                       onChange={(e) => setPlacement_reference(e.target.value)}
//                       className="ps-5"
//                     />
//                   </div>
//                 </Col>

//                 {/* System */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>System :</Form.Label>
//                   <div className="d-flex">
//                     <Form.Check
//                       type="radio"
//                       label="Office system"
//                       name="system"
//                       value="Office system"
//                       checked={system === "Office system"}
//                       onChange={(e) => setsystem(e.target.value)}
//                       className="ps-4"
//                     />
//                     <Form.Check
//                       type="radio"
//                       label="Owned a Laptop"
//                       name="system"
//                       value="Owned a Laptop"
//                       checked={system === "Owned a Laptop"}
//                       onChange={(e) => setsystem(e.target.value)}
//                       className="ps-4"
//                     />
//                   </div>
//                 </Col>

//                 {/* Batch Slot */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Batch Slot :</Form.Label>
//                   <div className="d-flex">
//                     <Form.Check
//                       type="radio"
//                       label="Morning (10 to 2)"
//                       name="batch_slot"
//                       value="Morning (10 to 2)"
//                       checked={batch_slot === "Morning (10 to 2)"}
//                       onChange={(e) => setBatch_slot(e.target.value)}
//                       className="ps-4"
//                     />
//                     <Form.Check
//                       type="radio"
//                       label="Afternoon (2 to 6)"
//                       name="batch_slot"
//                       value="Afternoon (2 to 6)"
//                       checked={batch_slot === "Afternoon (2 to 6)"}
//                       onChange={(e) => setBatch_slot(e.target.value)}
//                       className="ps-4"
//                     />
//                   </div>
//                 </Col>

//                 {/* Tshirt */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Tshirt :</Form.Label>
//                   <Row>
//                     {["S", "M", "L", "XL", "XXL", "2XL"].map((size) => (
//                       <Col key={size} xs={4} sm={4} md={4} lg={4}>
//                         <Form.Check
//                           type="radio"
//                           label={size}
//                           name="tshirt"
//                           value={size}
//                           checked={tshirt === size}
//                           onChange={(e) => setTshirt(e.target.value)}
//                         />
//                       </Col>
//                     ))}
//                   </Row>
//                 </Col>

//                 {/* Current Date */}
//                 <Col md={12} lg={6}>
//                   <Form.Label>Current Date :</Form.Label>
//                   <Form.Control
//                     type="date"
//                     value={current_date}
//                     onChange={(e) => setCurrentDate(e.target.value)}
//                     required
//                     readOnly
//                   />
//                 </Col>

//                 {/* Follow Up Date */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Enquiry Follow Up End Date :</Form.Label>
//                   <Form.Control
//                     type="date"
//                     placeholder="Enter Follow Up End Date"
//                     value={end_date}
//                     required
//                     onChange={(e) => setEnd_Date(e.target.value)}
//                   />
//                 </Col>

//                 {/* Admission Status */}
//                 <Col md={12} className="d-flex mt-3">
//                   <Form.Label>Admission Status :</Form.Label>
//                   <Form.Check
//                     type="radio"
//                     label="Pending Admission"
//                     name="admission"
//                     value="Pending Admission"
//                     checked={admission === "Pending Admission"}
//                     onChange={(e) => setAdmission(e.target.value)}
//                     className="ps-5"
//                   />
//                   <Form.Check
//                     type="radio"
//                     label="Confirm Admission"
//                     name="admission"
//                     value="Confirm Admission"
//                     checked={admission === "Confirm Admission"}
//                     onChange={(e) => setAdmission(e.target.value)}
//                     className="ps-5"
//                   />
//                 </Col>

//                 {/* Status */}
//                 <Col md={12} className="d-flex mt-3">
//                   <Form.Label>Status :</Form.Label>
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

//                 {/* Submit Button */}
//                 <Col md={12} className="d-flex justify-content-center">
//                   <Button
//                     type="submit"
//                     className="mt-4 w-25"
//                     disabled={loading}
//                   >
//                     {loading ? "Updating..." : "Submit"}
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

// export default Update_Enquiry_FollowUp;