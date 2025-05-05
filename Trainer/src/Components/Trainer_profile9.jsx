import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Trainer_profile = () => {

  const navigate = useNavigate("");
  const [full_Name, setFull_Name] = useState("");
  const [image, setImage] = useState(null);
  const [job_title, setJob_title] = useState("");
  const [Phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city_name, setCityName] = useState("");
  const [brief_bio, setBrief_bio] = useState("");
  const [areas_specialization, setAreas] = useState("");
  const [degree_earned, setDegree] = useState("");
  const [certifications, setCertifications] = useState("");
  const [year, setYear] = useState("");
  const [job_roles, setJob_roles] = useState("");
  const [job_duration, setJob] = useState("");
  const [key_responsibilities_achievements, setKey] = useState("");
  const [programming_languages, setProgramming] = useState("");
  const [software_expertise, setSoftware] = useState("");
  const [hardware_networking_knowledge, setHardware] = useState("");
  const [training_tools, setTraining_tools] = useState("");
  const [courses_taught, setCourses_taught] = useState("");
  const [training_methods, setTraining_methods] = useState("");
  const [seminars_conducted, setSeminars_conducted] = useState("");
  const [languages_spoken, setLanguages_spoken] = useState("");
  const [availability, setAvailability] = useState("");
  const [github, setGithub] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState("Active");

  const [categories, setCategories] = useState([]);
  const [categoriesStdata, setCategoriesStData] = useState([]);
  const [filteredstate, setFilteredState] = useState([]);

//   const [isSubmitting, setIsSubmitting] = useState(false);

// // In handleSubmit:
// setIsSubmitting(true);
// axios.post(..."")
//   .then(..."")
//   .catch(..."")
//   .finally(() => setIsSubmitting(false));

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

  // Get data country and city_name
  useEffect(() => {
    // Country
    axios
      .get("http://localhost:8000/getdataCountry")
      .then((res) => {
        const csdata = res.data.data.filter((item) => item.status === "Active");
        setCategoriesStData(csdata);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });

    // City
    axios
      .get("http://localhost:8000/getdataCity")
      .then((res) => {
        const cdata = res.data.data.filter((item) => item.status === "Active");
        setCategories(cdata); 
        console.log("Categories fetched:", res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const userData = new FormData();

    userData.append("full_Name", capitalizeFirstLetter(full_Name));
    userData.append("job_title", capitalizeFirstLetter(job_title));
    userData.append("Phone", Phone);
    userData.append("status", capitalizeFirstLetter(status));
    userData.append("Email", email);
    userData.append("country", capitalizeFirstLetter(country));
    userData.append("State", capitalizeFirstLetter(state));
    userData.append("city_name", capitalizeFirstLetter(city_name));
    userData.append("brief_bio", capitalizeFirstLetter(brief_bio));
    userData.append("areas_specialization",capitalizeFirstLetter(areas_specialization));
    userData.append("degree_earned", capitalizeFirstLetter(degree_earned));
    userData.append("certifications", capitalizeFirstLetter(certifications));
    userData.append("year", year);
    userData.append("job_roles", capitalizeFirstLetter(job_roles));
    userData.append("job_duration", capitalizeFirstLetter(job_duration));
    userData.append("key_responsibilities_achievements", capitalizeFirstLetter(key_responsibilities_achievements));
    userData.append("programming_languages", capitalizeFirstLetter(programming_languages));
    userData.append("software_expertise", capitalizeFirstLetter(software_expertise));
    userData.append("hardware_networking_knowledge", capitalizeFirstLetter(hardware_networking_knowledge));
    userData.append("training_tools", capitalizeFirstLetter(training_tools));
    userData.append("courses_taught", capitalizeFirstLetter(courses_taught));
    userData.append("training_methods",capitalizeFirstLetter(training_methods));
    userData.append("seminars_conducted",capitalizeFirstLetter(seminars_conducted));
    userData.append("languages_spoken",capitalizeFirstLetter(languages_spoken));
    userData.append("availability", capitalizeFirstLetter(availability));
    userData.append("github", capitalizeFirstLetter(github));
    userData.append("linkedIn", capitalizeFirstLetter(linkedIn));
    userData.append("website", capitalizeFirstLetter(website));
    userData.append("Image", image);

    axios
      .post("http://localhost:8000/addTrainer_profile", userData)
      .then((res) => {
        console.log("hi", res.data);
        alert("Data Added Successfully!");
        
        // Navigate to a different page after successful submission
        navigate("/Head/trainer_profile_add"); 
        setFull_Name("");
        setImage(null);
        setCountry("");
        setState("");
        setCityName("");
        setEmail("");
        setPhone("");
        setJob_title("");
        setBrief_bio("");
        setAreas("");
        setDegree("");
        setCertifications("");
        setYear("");
        setJob_roles("");
        setJob("");
        setKey("");
        setProgramming("");
        setSoftware("");
        setHardware("");
        setTraining_tools("");
        setCourses_taught("");
        setTraining_methods("");
        setSeminars_conducted("");
        setLanguages_spoken("");
        setAvailability("");
        setGithub("");
        setLinkedIn("");
        setWebsite("");
        setStatus("Active");
      })
      // .catch((err) => {
      //   console.log(err);
      //   alert("Error adding data. Please try again.");
      // });
      .catch((err) => {
        console.log(err);
        alert(`Error adding data: ${err.response?.data?.message || err.message}`);
      });
  }

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Col md={12} sm={12} lg={10} xl={10}>
        <h1 className="text-center text-dark pt-3">Trainer Profile</h1>
        <div className="border-top border-5 mt-4 border-primary"></div>

        <Card className="">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                {/* Full Name 1 */}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Full Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="full_Name"
                    placeholder="Enter Full Name"
                    value={full_Name}
                    required
                    onChange={(e) => setFull_Name(e.target.value)}
                  />
                </Col>

                {/* Profile Photo 2*/}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Profile Photo:</Form.Label>
                  <Form.Control
                    // name="image"
                    placeholder="Profile Photo"
                    required
                    type="file"
                    // value={image}
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </Col>

                {/* country 3*/}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Country:</Form.Label>
                  <Form.Select
                    aria-label="Select country"
                    value={country}
                    onChange={(e) => {
                      const selectedCountry = e.target.value;
                      setCountry(selectedCountry);

                      // Filter states based on selected country
                      const countryStates = categoriesStdata.filter(
                        (category) => category.country === selectedCountry
                      );

                      setFilteredState(countryStates);
                      setState(""); // Reset state when country changes
                    }}
                    required
                  >
                    <option value="">Choose Country</option>
                    {categoriesStdata.map((countryItem) => (
                      <option key={countryItem._id} value={countryItem.country}>
                        {countryItem.country}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                {/* State 4*/}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>State:</Form.Label>
                  <Form.Select
                    aria-label="Select state"
                    value={state}
                    onChange={(e) => {
                      const selectedState = e.target.value;
                      setState(selectedState);
                    }}
                    required
                    disabled={!country} // Disable if no country is selected
                  >
                    <option value="">Choose State</option>
                    {filteredstate.map((stateItem) => (
                      <option key={stateItem._id} value={stateItem.state}>
                        {stateItem.state}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                {/* city_name 5*/}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label> City :</Form.Label>
                  <Form.Select
                    aria-label="Select city"
                    value={city_name}
                    onChange={(e) => setCityName(e.target.value)}
                    required
                  >
                    <option value="">Choose a city</option>
                    {categories.map((city) => (
                      <option key={city._id} value={city.city_name}>
                        {city.city_name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                {/* email 6*/}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Col>

                {/* Phone No 7*/}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Phone No:</Form.Label>
                  <Form.Control
                    type="number"
                    name="Phone"
                    placeholder="Enter Mobile No"
                    value={Phone}
                    required
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Col>

                {/*  Job Title 8*/}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Job Title No:</Form.Label>
                  <Form.Control
                    type="text"
                    name="job_title"
                    placeholder="Enter Job Title"
                    value={job_title}
                    required
                    onChange={(e) => setJob_title(e.target.value)}
                  />
                </Col>

                {/* Brief Bio 9*/}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Brief Bio:</Form.Label>
                  <Form.Control
                    type="text"
                    name="brief_bio"
                    placeholder="Enter brief_bio"
                    value={brief_bio}
                    required
                    onChange={(e) => setBrief_bio(e.target.value)}
                  />
                </Col>

                {/* Areas Specialization 10*/}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Areas Specialization:</Form.Label>
                  <Form.Control
                    type="text"
                    name="areas_specialization"
                    placeholder="Enter Areas Specialization"
                    value={areas_specialization}
                    required
                    onChange={(e) =>
                      setAreas(e.target.value)
                    }
                  />
                </Col>

                {/* Degree Earned 11*/}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Degree Earned:</Form.Label>
                  <Form.Control
                    type="text"
                    name="degree_earned"
                    placeholder="Enter Degree Earned"
                    value={degree_earned}
                    required
                    onChange={(e) => setDegree(e.target.value)}
                  />
                </Col>

                {/* Certifications 12*/}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Certifications:</Form.Label>
                  <Form.Control
                    type="text"
                    name="certifications"
                    placeholder="Enter Certifications"
                    value={certifications}
                    required
                    onChange={(e) => setCertifications(e.target.value)}
                  />
                </Col>

                {/* Years Experience 13*/}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Years Experience:</Form.Label>
                  <Form.Control
                    type="number"
                    name="year"
                    placeholder="Enter Years Experience"
                    value={year}
                    required
                    onChange={(e) =>
                      setYear(e.target.value)
                    }
                  />
                </Col>

                {/* Job Roles 14*/}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Job Roles:</Form.Label>
                  <Form.Control
                    type="text"
                    name="job_roles"
                    placeholder="Enter Job Roles"
                    value={job_roles}
                    required
                    onChange={(e) => setJob_roles(e.target.value)}
                  />
                </Col>

                {/* Job Duration 15*/}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Job Duration:</Form.Label>
                  <Form.Control
                    type="text"
                    name="job_duration"
                    placeholder="Enter Job Duration"
                    value={job_duration}
                    required
                    onChange={(e) => setJob(e.target.value)}
                  />
                </Col>

                {/* Key Responsibilities Achievements 16*/}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Key Responsibilities Achievements:</Form.Label>
                  <Form.Control
                    type="text"
                    name="key_responsibilities_achievements"
                    placeholder="Enter Key Responsibilities Achievements"
                    value={key_responsibilities_achievements}
                    required
                    onChange={(e) =>
                      setKey(
                        e.target.value
                      )
                    }
                  />
                </Col>

                {/* Programming Languages 17*/}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Programming Languages:</Form.Label>
                  <Form.Control
                    type="text"
                    name="programming_languages"
                    placeholder="Enter Programming Languages "
                    value={programming_languages}
                    required
                    onChange={(e) =>
                      setProgramming(
                        e.target.value
                      )
                    }
                  />
                </Col>

                {/* Software Expertise 18*/}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Software Expertise:</Form.Label>
                  <Form.Control
                    type="text"
                    name="software_expertise"
                    placeholder="Software Expertise "
                    value={software_expertise}
                    required
                    onChange={(e) =>
                      setSoftware(e.target.value)
                    }
                  />
                </Col>

                {/* Hardware Networking Knowledge 19*/}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Hardware Networking Knowledge:</Form.Label>
                  <Form.Control
                    type="text"
                    name="hardware_networking_knowledge"
                    placeholder="Hardware Networking Knowledge "
                    value={hardware_networking_knowledge}
                    required
                    onChange={(e) =>
                      setHardware(
                        e.target.value
                      )
                    }
                  />
                </Col>

                {/* Training Tools 20*/}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Training Tools:</Form.Label>
                  <Form.Control
                    type="text"
                    name="training_tools"
                    placeholder="Hardware Training Tools "
                    value={training_tools}
                    required
                    onChange={(e) => setTraining_tools(e.target.value)}
                  />
                </Col>

                {/* Courses Taught 21*/}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Courses Taught:</Form.Label>
                  <Form.Control
                    type="text"
                    name="courses_taught"
                    placeholder="Courses Taught "
                    value={courses_taught}
                    required
                    onChange={(e) => setCourses_taught(e.target.value)}
                  />
                </Col>

                {/* Training Methods 22*/}
                <Col md={12} lg={6}className=" pb-4">
                  <Form.Label>Training Methods:</Form.Label>
                  <div className=" d-flex">
                    <Form.Check
                      type="radio"
                      label="Classroom"
                      name="training_methods"
                      value="Classroom"
                      className="ps-5"
                      checked={training_methods === "Classroom"}
                      onChange={(e) => setTraining_methods(e.target.value)}
                    />
                    <Form.Check
                      type="radio"
                      label="Online"
                      name="training_methods"
                      value="Online"
                      className="ps-5"
                      checked={training_methods === "Online"}
                      onChange={(e) => setTraining_methods(e.target.value)}
                    />
                    <Form.Check
                      type="radio"
                      label="Hands-on"
                      name="training_methods"
                      value="Hands-on"
                      className="ps-5"
                      checked={training_methods === "Hands-on"}
                      onChange={(e) => setTraining_methods(e.target.value)}
                    />
                  </div>
                </Col>

                {/* Seminars Conducted 23*/}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Seminars Conducted:</Form.Label>
                  <Form.Control
                    type="text"
                    name="seminars_conducted"
                    placeholder="Seminars Conducted "
                    value={seminars_conducted}
                    required
                    onChange={(e) =>
                      setSeminars_conducted(e.target.value)
                    }
                  />
                </Col>

                {/* Languages Spoken 24*/}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Languages Spoken:</Form.Label>
                  <Form.Control
                    type="text"
                    name="languages_spoken"
                    placeholder="Languages Spoken "
                    value={languages_spoken}
                    required
                    onChange={(e) =>
                      setLanguages_spoken(e.target.value)
                    }
                  />
                </Col>

                {/* Availability 25*/}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Availability:</Form.Label>
                  <Form.Control
                    type="text"
                    name="availability"
                    placeholder="Availability "
                    value={availability}
                    required
                    onChange={(e) => setAvailability(e.target.value)}
                  />
                </Col>

                {/* Github 26*/}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Github:</Form.Label>
                  <Form.Control
                    type="text"
                    name="github"
                    placeholder="Github "
                    value={github}
                    required
                    onChange={(e) => setGithub(e.target.value)}
                  />
                </Col>

                {/* LinkedIn 27*/}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>LinkedIn:</Form.Label>
                  <Form.Control
                    type="text"
                    name="linkedIn"
                    placeholder="LinkedIn "
                    value={linkedIn}
                    required
                    onChange={(e) => setLinkedIn(e.target.value)}
                  />
                </Col>

                {/* Website 28*/}
                <Col md={12} lg={6} className="pb-4">
                  <Form.Label>Website:</Form.Label>
                  <Form.Control
                    type="text"
                    name="website"
                    placeholder="Website "
                    value={website}
                    required
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </Col>

                {/* Status 29*/}
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
                <Col md={12} className="d-flex justify-content-center mt-4">
                  <Button type="submit" variant="primary" size="lg">
                    Submit
                  </Button>

{/* <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
  {isSubmitting ? 'Submitting...' : 'Submit'}
</Button> */}
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
};

export default Trainer_profile;


// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Button, Col, Container, Form, Row, Card, Spinner } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const Trainer_profile = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     full_Name: "",
//     image: null,
//     job_title: "",
//     Phone: "",
//     email: "",
//     country: "",
//     state: "",
//     city_name: "",
//     brief_bio: "",
//     areas_specialization: "",
//     degree_earned: "",
//     certifications: "",
//     year: "",
//     job_roles: "",
//     job_duration: "",
//     key_responsibilities_achievements: "",
//     programming_languages: "",
//     software_expertise: "",
//     hardware_networking_knowledge: "",
//     training_tools: "",
//     courses_taught: "",
//     training_methods: "",
//     seminars_conducted: "",
//     languages_spoken: "",
//     availability: "",
//     github: "",
//     linkedIn: "",
//     website: "",
//     status: "Active"
//   });
  
//   const [categories, setCategories] = useState([]);
//   const [categoriesStdata, setCategoriesStData] = useState([]);
//   const [filteredstate, setFilteredState] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState({});

//   function capitalizeFirstLetter(input) {
//     if (typeof input === "string") {
//       return input
//         .split(" ")
//         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(" ");
//     }
//     return input;
//   }

//   // Get data country and city_name
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Country
//         const countryRes = await axios.get("http://localhost:8000/getdataCountry");
//         const csdata = countryRes.data.data.filter((item) => item.status === "Active");
//         setCategoriesStData(csdata);

//         // City
//         const cityRes = await axios.get("http://localhost:8000/getdataCity");
//         const cdata = cityRes.data.data.filter((item) => item.status === "Active");
//         setCategories(cdata);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
    
//     if (name === "image") {
//       setFormData(prev => ({ ...prev, [name]: files[0] }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.full_Name) newErrors.full_Name = "Full Name is required";
//     if (!formData.email) newErrors.email = "Email is required";
//     else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Email is invalid";
//     if (!formData.Phone) newErrors.Phone = "Phone is required";
//     if (!formData.image) newErrors.image = "Profile photo is required";
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;
    
//     setIsSubmitting(true);
    
//     try {
//       const userData = new FormData();
      
//       // Append all form data to FormData
//       Object.entries(formData).forEach(([key, value]) => {
//         if (key === "image") {
//           if (value) userData.append("Image", value);
//         } else {
//           userData.append(key, typeof value === "string" ? capitalizeFirstLetter(value) : value);
//         }
//       });

//       const response = await axios.post("http://localhost:8000/addTrainer_profile", userData, {
//         headers: {
//           "Content-Type": "multipart/form-data"
//         }
//       });

//       if (response.data.success) {
//         alert("Data Added Successfully!");
//         navigate("/Head/trainer_profiles"); // Navigate to the listing page
//       }
//     } catch (err) {
//       console.error("Submission error:", err);
//       alert(`Error: ${err.response?.data?.message || "Failed to submit data"}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Container className="d-flex justify-content-center mt-5">
//       <Col md={12} sm={12} lg={10} xl={10}>
//         <h1 className="text-center text-dark pt-3">Trainer Profile</h1>
//         <div className="border-top border-5 mt-4 border-primary"></div>

//         <Card className="">
//           <Card.Body>
//             <Form onSubmit={handleSubmit}>
//               <Row>
//                 {/* Full Name */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Full Name:</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="full_Name"
//                     placeholder="Enter Full Name"
//                     value={formData.full_Name}
//                     required
//                     onChange={handleChange}
//                     isInvalid={!!errors.full_Name}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.full_Name}
//                   </Form.Control.Feedback>
//                 </Col>

//                 {/* Profile Photo */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Profile Photo:</Form.Label>
//                   <Form.Control
//                     name="image"
//                     type="file"
//                     onChange={handleChange}
//                     required
//                     isInvalid={!!errors.image}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.image}
//                   </Form.Control.Feedback>
//                 </Col>

//                 {/* Country */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Country:</Form.Label>
//                   <Form.Select
//                     name="country"
//                     value={formData.country}
//                     onChange={(e) => {
//                       handleChange(e);
//                       const selectedCountry = e.target.value;
//                       const countryStates = categoriesStdata.filter(
//                         (category) => category.country === selectedCountry
//                       );
//                       setFilteredState(countryStates);
//                       setFormData(prev => ({ ...prev, state: "" }));
//                     }}
//                     required
//                   >
//                     <option value="">Choose Country</option>
//                     {categoriesStdata.map((countryItem) => (
//                       <option key={countryItem._id} value={countryItem.country}>
//                         {countryItem.country}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Col>

//                 {/* State */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>State:</Form.Label>
//                   <Form.Select
//                     name="state"
//                     value={formData.state}
//                     onChange={handleChange}
//                     required
//                     disabled={!formData.country}
//                   >
//                     <option value="">Choose State</option>
//                     {filteredstate.map((stateItem) => (
//                       <option key={stateItem._id} value={stateItem.state}>
//                         {stateItem.state}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Col>

//                 {/* City */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>City:</Form.Label>
//                   <Form.Select
//                     name="city_name"
//                     value={formData.city_name}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">Choose a city</option>
//                     {categories.map((city) => (
//                       <option key={city._id} value={city.city_name}>
//                         {city.city_name}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Col>

//                 {/* Email */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Email:</Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     placeholder="Enter Email"
//                     value={formData.email}
//                     required
//                     onChange={handleChange}
//                     isInvalid={!!errors.email}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.email}
//                   </Form.Control.Feedback>
//                 </Col>

//                 {/* Phone No */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Phone No:</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="Phone"
//                     placeholder="Enter Mobile No"
//                     value={formData.Phone}
//                     required
//                     onChange={handleChange}
//                     isInvalid={!!errors.Phone}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.Phone}
//                   </Form.Control.Feedback>
//                 </Col>

//                 {/* Job Title */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Job Title:</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="job_title"
//                     placeholder="Enter Job Title"
//                     value={formData.job_title}
//                     required
//                     onChange={handleChange}
//                   />
//                 </Col>

//                 {/* Brief Bio */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Brief Bio:</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={3}
//                     name="brief_bio"
//                     placeholder="Enter brief bio"
//                     value={formData.brief_bio}
//                     required
//                     onChange={handleChange}
//                   />
//                 </Col>

//                 {/* Areas Specialization */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Areas Specialization:</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="areas_specialization"
//                     placeholder="Enter Areas Specialization"
//                     value={formData.areas_specialization}
//                     required
//                     onChange={handleChange}
//                   />
//                 </Col>

//                 {/* Degree Earned */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Degree Earned:</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="degree_earned"
//                     placeholder="Enter Degree Earned"
//                     value={formData.degree_earned}
//                     required
//                     onChange={handleChange}
//                   />
//                 </Col>

//                 {/* Certifications */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Certifications:</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="certifications"
//                     placeholder="Enter Certifications"
//                     value={formData.certifications}
//                     required
//                     onChange={handleChange}
//                   />
//                 </Col>

//                 {/* Years Experience */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Years Experience:</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="year"
//                     placeholder="Enter Years Experience"
//                     value={formData.year}
//                     required
//                     onChange={handleChange}
//                   />
//                 </Col>

//                 {/* Job Roles */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Job Roles:</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="job_roles"
//                     placeholder="Enter Job Roles"
//                     value={formData.job_roles}
//                     required
//                     onChange={handleChange}
//                   />
//                 </Col>

//                 {/* Job Duration */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Job Duration:</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="job_duration"
//                     placeholder="Enter Job Duration"
//                     value={formData.job_duration}
//                     required
//                     onChange={handleChange}
//                   />
//                 </Col>

//                 {/* Key Responsibilities Achievements */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Key Responsibilities Achievements:</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={3}
//                     name="key_responsibilities_achievements"
//                     placeholder="Enter Key Responsibilities Achievements"
//                     value={formData.key_responsibilities_achievements}
//                     required
//                     onChange={handleChange}
//                   />
//                 </Col>

//                 {/* Programming Languages */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Programming Languages:</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="programming_languages"
//                     placeholder="Enter Programming Languages"
//                     value={formData.programming_languages}
//                     required
//                     onChange={handleChange}
//                   />
//                 </Col>

//                 {/* Software Expertise */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Software Expertise:</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="software_expertise"
//                     placeholder="Software Expertise"
//                     value={formData.software_expertise}
//                     required
//                     onChange={handleChange}
//                   />
//                 </Col>

//                 {/* Hardware Networking Knowledge */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Hardware Networking Knowledge:</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="hardware_networking_knowledge"
//                     placeholder="Hardware Networking Knowledge"
//                     value={formData.hardware_networking_knowledge}
//                     required
//                     onChange={handleChange}
//                   />
//                 </Col>

//                 {/* Training Tools */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Training Tools:</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="training_tools"
//                     placeholder="Training Tools"
//                     value={formData.training_tools}
//                     required
//                     onChange={handleChange}
//                   />
//                 </Col>

//                 {/* Courses Taught */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Courses Taught:</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="courses_taught"
//                     placeholder="Courses Taught"
//                     value={formData.courses_taught}
//                     required
//                     onChange={handleChange}
//                   />
//                 </Col>

//                 {/* Training Methods */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Training Methods:</Form.Label>
//                   <div className="d-flex">
//                     {["Classroom", "Online", "Hands-on"].map((method) => (
//                       <Form.Check
//                         key={method}
//                         type="radio"
//                         label={method}
//                         name="training_methods"
//                         value={method}
//                         className="ps-5"
//                         checked={formData.training_methods === method}
//                         onChange={handleChange}
//                       />
//                     ))}
//                   </div>
//                 </Col>

//                 {/* Seminars Conducted */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Seminars Conducted:</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="seminars_conducted"
//                     placeholder="Seminars Conducted"
//                     value={formData.seminars_conducted}
//                     required
//                     onChange={handleChange}
//                   />
//                 </Col>

//                 {/* Languages Spoken */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Languages Spoken:</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="languages_spoken"
//                     placeholder="Languages Spoken"
//                     value={formData.languages_spoken}
//                     required
//                     onChange={handleChange}
//                   />
//                 </Col>

//                 {/* Availability */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Availability:</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="availability"
//                     placeholder="Availability"
//                     value={formData.availability}
//                     required
//                     onChange={handleChange}
//                   />
//                 </Col>

//                 {/* Github */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Github:</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="github"
//                     placeholder="Github"
//                     value={formData.github}
//                     onChange={handleChange}
//                   />
//                 </Col>

//                 {/* LinkedIn */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>LinkedIn:</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="linkedIn"
//                     placeholder="LinkedIn"
//                     value={formData.linkedIn}
//                     onChange={handleChange}
//                   />
//                 </Col>

//                 {/* Website */}
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Label>Website:</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="website"
//                     placeholder="Website"
//                     value={formData.website}
//                     onChange={handleChange}
//                   />
//                 </Col>

//                 {/* Status */}
//                 <Col md={12} className="d-flex mt-3">
//                   <Form.Label>Status:</Form.Label>
//                   {["Active", "Inactive"].map((statusOption) => (
//                     <Form.Check
//                       key={statusOption}
//                       type="radio"
//                       label={statusOption}
//                       name="status"
//                       value={statusOption}
//                       className="ps-5"
//                       checked={formData.status === statusOption}
//                       onChange={handleChange}
//                     />
//                   ))}
//                 </Col>

//                 {/* Submit Button */}
//                 <Col md={12} className="d-flex justify-content-center mt-4">
//                   <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
//                     {isSubmitting ? (
//                       <>
//                         <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
//                         <span className="ms-2">Submitting...</span>
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

// export default Trainer_profile;