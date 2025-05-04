import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
const Enquiry_Add = () => {
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
  const [course_name, setCourse_Name] = useState("");
  const [duration, setDuration] = useState("");
  const [amount, setAmount] = useState("");
  const [placement_reference, setPlacement_reference] = useState("");
  const [system, setsystem] = useState("");
  const [tshirt, setTshirt] = useState("");
  const [batch_slot, setBatch_slot] = useState("");
  const [status, setStatus] = useState("");
  const [categoriesdata, setCategoriesData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesOData, setCategoriesOData] = useState([]);
  const [categoriesUdata, setCategoriesUData] = useState([]);
  const [categoriesCdata, setCategoriesCData] = useState([]);
  const [categoriesEdata, setCategoriesEData] = useState([]);
  const [categoriesCtdata, setCategoriesCTData] = useState([]);

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

  useEffect(() => {

    // University
    axios.get("http://localhost:8000/getdataUniversity")
      .then((res) => {
        const udata = res.data.data.filter((item) => item.status === "Active");
        setCategoriesUData(udata);
        console.log("Categories fetched:", res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
    
      // City
      axios.get("http://localhost:8000/getdataCity")
      .then((res) => {
        const ctdata = res.data.data.filter((item) => item.status === "Active");
        setCategoriesCTData(ctdata); // Assuming the response contains a `data` array
        console.log("Categories fetched:", res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });

    // College
      axios.get("http://localhost:8000/getdataCollege")
      .then((res) => {
        const codata = res.data.data.filter((item) => item.status === "Active");
        setCategoriesCData(codata);
        console.log("Categories fetched:", res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });

    // Education
    axios.get("http://localhost:8000/getdataEducation")
    .then((res) => {
      const edata = res.data.data.filter((item) => item.status === "Active");
      setCategoriesEData(edata);
      console.log("Categories fetched:", res.data.data);
    })
    .catch((err) => {
      console.error("Error fetching categories:", err);
    });

    // Duration
    axios.get("http://localhost:8000/getdataDuration")
      .then((res) => {
        const ddata = res.data.data.filter((item) => item.status === "Active");
        setCategoriesData(ddata);
        console.log("Categories fetched:", res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });

    // Course
    axios.get("http://localhost:8000/getdataCourse")
      .then((res) => {
        const cdata = res.data.data.filter((item) => item.status === "Active");
        setCategories(cdata);
        console.log("Categories fetched:", res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });

    // Office City
    axios.get("http://localhost:8000/getdataOfficeCity")
      .then((res) => {
        const odata = res.data.data.filter((item) => item.status === "Active");
        setCategoriesOData(odata); // Assuming the response contains a data array
        console.log("Categories fetched:", res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  //   Add the Data
  function handleSubmit(e) {
    e.preventDefault();

    // const updatedDate = new Date(date_birth).toISOString();
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
      course_name: capitalizeFirstLetter(course_name),
      system: capitalizeFirstLetter(system),
      tshirt: capitalizeFirstLetter(tshirt),
      batch_slot: capitalizeFirstLetter(batch_slot),
      status: capitalizeFirstLetter(status),
    };

    axios.post("http://localhost:8000/addEnquiry_Student", userData)
      .then((res) => {
        console.log("hi", res.data);
        // setUserData(res.data.userdata)
        alert("Data Add Successfully!");
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
        setCourse_Name("");
        setDuration("");
        setAmount("");
        setPlacement_reference("");
        setsystem("");
        setTshirt("");
        setBatch_slot("");
        setStatus("Active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Container className="d-flex justify-content-center mt-5">
        <Col md={10} lg={10} lx={10} lxx={10}>
          <h1 className="text-center text-dark pt-3">Student Enquiry  </h1>
          <div className="border-top border-5 mt-4  border-primary"></div>
          <Card className="">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  {/* Student Name */}
                  <Col md={6} className="pb-4">
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
                  <Col md={6} className="pb-4">
                    <Form.Label>City Name :</Form.Label>
                    <Form.Select
                    aria-label="Select College Name"
                    value={city_name}
                    onChange={(e) => setCityName(e.target.value)}
                    required
                  >
                    <option value="">Choose a City</option>
                    {categoriesCtdata.map((city) => (
                      <option
                        key={city._id}
                        value={city.city_name}
                      >
                        {city.city_name}
                      </option>
                    ))}
                  </Form.Select>
                  </Col>

                  

                  {/* University */}
                  <Col md={6} className="pb-4">
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
                  <Col md={6} className="pb-4">
                    <Form.Label>College Name :</Form.Label>
                    
                    <Form.Select
                    aria-label="Select College Name"
                    value={college_name}
                    onChange={(e) => setCollegeName(e.target.value)}
                    required
                    
                  >
                    <option value="">Choose a city</option>
                    {categoriesCdata.map((college) => (
                      <option
                        key={college._id}
                        value={college.college_name}
                      >
                        {college.college_name}
                      </option>
                    ))}
                  </Form.Select>
                  </Col>

                  {/* Gmail */}
                  <Col md={6} className=" pb-4">
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
                  <Col md={6} className="pb-4">
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
                  <Col md={6} className="pb-4">
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
                  <Col md={6} className="pb-4">
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
                  <Col md={6} className="pb-4">
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
                  <Col md={6} className="pb-4">
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
                  <Col md={6} className="pb-4">
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
                  <Col md={6} className="pb-4">
                    <Form.Label>Course Name :</Form.Label>
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
                  <Col md={6} className="pb-4">
                    <Form.Label>Duration :</Form.Label>
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

                  {/* Amount */}
                  <Col md={6} className="pb-4">
                    <Form.Label>Amount :</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </Col>

                   {/* Marital Status */}
                   <Col md={6} className="pb-4 ">
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
                  <Col md={6} className=" pb-4">
                    <Form.Label className="" required>
                      Blood Group :
                    </Form.Label>

                      <div className="d-flex">
                    <Form.Check
                      type="radio"
                      label="A+"
                      name="blood_Group"
                      value="A+"
                      checked={blood_Group === "A+"}
                      onChange={(e) => setBlood_Group(e.target.value)}
                      className="ps-3"
                    />
                    <Form.Check
                      type="radio"
                      label="A-"
                      name="blood_Group"
                      value="A-"
                      checked={blood_Group === "A-"}
                      onChange={(e) => setBlood_Group(e.target.value)}
                      className="ps-5"
                    />
                    <Form.Check
                      type="radio"
                      label="B+"
                      name="blood_Group"
                      value="B+"
                      checked={blood_Group === "B+"}
                      onChange={(e) => setBlood_Group(e.target.value)}
                      className="ps-5"
                    />
                    <Form.Check
                      type="radio"
                      label="B-"
                      name="blood_Group"
                      value="B-"
                      checked={blood_Group === "B-"}
                      onChange={(e) => setBlood_Group(e.target.value)}
                      className="ps-5"
                    />
                    <Form.Check
                      type="radio"
                      label="O+"
                      name="blood_Group"
                      value="O+"
                      checked={blood_Group === "O+"}
                      onChange={(e) => setBlood_Group(e.target.value)}
                      className="ps-5"
                    />
                    <Form.Check
                      type="radio"
                      label="O-"
                      name="blood_Group"
                      value="O-"
                      checked={blood_Group === "O-"}
                      onChange={(e) => setBlood_Group(e.target.value)}
                      className="ps-5"
                    />
                    </div>
                  </Col>

                  {/* Placement Reference */}
                  <Col md={6} className="pb-4">
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
                  <Col md={6} className="pb-4">
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
                  <Col md={6} className="pb-4 ">
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
                  <Col md={6} className="pb-4 ">
                    <Form.Label>Tshirt :</Form.Label>
                    <div className="d-flex">
                      <Form.Check
                        type="radio"
                        label="S"
                        name="tshirt"
                        value="S"
                        checked={tshirt === "S"}
                        onChange={(e) => setTshirt(e.target.value)}
                        className="ps-5"
                      />
                      <Form.Check
                        type="radio"
                        label="M"
                        name="tshirt"
                        value="M"
                        checked={tshirt === "M"}
                        onChange={(e) => setTshirt(e.target.value)}
                        className="ps-5"
                      />
                      <Form.Check
                        type="radio"
                        label="L"
                        name="tshirt"
                        value="L"
                        checked={tshirt === "L"}
                        onChange={(e) => setTshirt(e.target.value)}
                        className="ps-5"
                      />
                      <Form.Check
                        type="radio"
                        label="XL"
                        name="tshirt"
                        value="XL"
                        checked={tshirt === "XL"}
                        onChange={(e) => setTshirt(e.target.value)}
                        className="ps-5"
                      />
                      <Form.Check
                        type="radio"
                        label="XXL"
                        name="tshirt"
                        value="XXL"
                        checked={tshirt === "XXL"}
                        onChange={(e) => setTshirt(e.target.value)}
                        className="ps-5"
                      />
                      <Form.Check
                        type="radio"
                        label="2XL    "
                        name="tshirt"
                        value="2XL"
                        checked={tshirt === "2XL"}
                        onChange={(e) => setTshirt(e.target.value)}
                        className="ps-5"
                      />
                    </div>
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

                  <Col md={12} className="d-flex justify-content-center">
                    <Button type="submit" className="mt-4 w-25 " onClick={handleSubmit}>
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default Enquiry_Add;
