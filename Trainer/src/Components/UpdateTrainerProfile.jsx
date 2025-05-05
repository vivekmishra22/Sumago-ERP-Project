import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";

const UpdateTrainerProfile = () => {

    const navigate = useNavigate("");

    const {_id} = useParams("");
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

  //    Capital
  // function capitalizeFirstLetter(input) {
  //   if (typeof input === "string") {
  //     return input
  //       .split(" ")
  //       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //       .join(" ");
  //   } else {
  //     console.error("Input is not a string!");
  //     return input; // Or handle accordingly
  //   }
  // }

  // fetchad data 
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


  // GetById fetchad
  useEffect(() => {
    axios
      .get(`http://localhost:8000/getbyIdTrainer_profile/${_id}`)
      .then(res => {
        console.log("Fetched Data: Enquiry Student", res.data);
        const data = res.data.data;

        // Populate state with fetched data
        setFull_Name(data.full_Name || " ");
        setImage(data.image || " null");
        setCountry(data.country || " ");
        setCityName(data.city_name || " ");
        setState(data.state || " ");
        setEmail(data.email || " ");
        setPhone(data.Phone || " ");
        setJob_title(data.job_title || " ");
        setBrief_bio(data.brief_bio || " ");
        setAreas(data.areas_specialization || " ");
        setDegree(data.degree_earned || " ");
        setCertifications(data.certifications || " ");
        setYear(data.year || " ");
        setJob_roles(data.job_roles || " ");
        setJob(data.job_duration || " ");
        setKey(data.key_responsibilities_achievements || " ");
        setProgramming(data.programming_languages || " ");
        setSoftware(data.software_expertise || " ");
        setHardware(data.hardware_networking_knowledge || " ");
        setTraining_tools(data.training_tools || " ");
        setCourses_taught(data.courses_taught || " ");
        setTraining_methods(data.training_methods || " ");
        setSeminars_conducted(data.seminars_conducted || " ");
        setLanguages_spoken(data.languages_spoken || " ");
        setAvailability(data.availability || " ");
        setGithub(data.github || " ");
        setLinkedIn(data.linkedIn || " ");
        setWebsite(data.website || " ");
        setStatus(data.status || " ");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [_id]); 

  const handleSubmit = (e) => {
      e.preventDefault();
  
      const userData = new FormData();
  
      // userData.append("full_Name", capitalizeFirstLetter(full_Name));
      // userData.append("job_title", capitalizeFirstLetter(job_title));
      // userData.append("Phone", Phone);
      // userData.append("status", capitalizeFirstLetter(status));
      // userData.append("Email", email);
      // userData.append("country", capitalizeFirstLetter(country));
      // userData.append("State", capitalizeFirstLetter(state));
      // userData.append("city_name", capitalizeFirstLetter(city_name));
      // userData.append("brief_bio", capitalizeFirstLetter(brief_bio));
      // userData.append("areas_specialization",capitalizeFirstLetter(areas_specialization));
      // userData.append("degree_earned", capitalizeFirstLetter(degree_earned));
      // userData.append("certifications", capitalizeFirstLetter(certifications));
      // userData.append("year", year);
      // userData.append("job_roles", capitalizeFirstLetter(job_roles));
      // userData.append("job_duration", capitalizeFirstLetter(job_duration));
      // userData.append("key_responsibilities_achievements", capitalizeFirstLetter(key_responsibilities_achievements));
      // userData.append("programming_languages", capitalizeFirstLetter(programming_languages));
      // userData.append("software_expertise", capitalizeFirstLetter(software_expertise));
      // userData.append("hardware_networking_knowledge", capitalizeFirstLetter(hardware_networking_knowledge));
      // userData.append("training_tools", capitalizeFirstLetter(training_tools));
      // userData.append("courses_taught", capitalizeFirstLetter(courses_taught));
      // userData.append("training_methods",capitalizeFirstLetter(training_methods));
      // userData.append("seminars_conducted",capitalizeFirstLetter(seminars_conducted));
      // userData.append("languages_spoken",capitalizeFirstLetter(languages_spoken));
      // userData.append("availability", capitalizeFirstLetter(availability));
      // userData.append("github", capitalizeFirstLetter(github));
      // userData.append("linkedIn", capitalizeFirstLetter(linkedIn));
      // userData.append("website", capitalizeFirstLetter(website));
      // userData.append("Image", image);

      userData.append("full_Name", full_Name);
      userData.append("job_title", job_title);
      userData.append("Phone", Phone);
      userData.append("status", status);
      userData.append("Email", email);
      userData.append("country", country);
      userData.append("State", state);
      userData.append("city_name", city_name);
      userData.append("brief_bio", brief_bio);
      userData.append("areas_specialization",areas_specialization);
      userData.append("degree_earned", degree_earned);
      userData.append("certifications", certifications);
      userData.append("year", year);
      userData.append("job_roles", job_roles);
      userData.append("job_duration", job_duration);
      userData.append("key_responsibilities_achievements", key_responsibilities_achievements);
      userData.append("programming_languages", programming_languages);
      userData.append("software_expertise", software_expertise);
      userData.append("hardware_networking_knowledge", hardware_networking_knowledge);
      userData.append("training_tools", training_tools);
      userData.append("courses_taught", courses_taught);
      userData.append("training_methods",training_methods);
      userData.append("seminars_conducted",seminars_conducted);
      userData.append("languages_spoken",languages_spoken);
      userData.append("availability", availability);
      userData.append("github", github);
      userData.append("linkedIn", linkedIn);
      userData.append("website", website);
      userData.append("Image", image);
  
      axios
      .put(`http://localhost:8000/UpdateTrainer_profile/${_id}`, userData)
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
            <h1 className="text-center text-dark pt-3">Update Trainer Profile</h1>
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
                      <Button type="submit" variant="primary" size="lg"
                      // onClick={() => 
                      //   navigate(`/Head/trainer_profile_add`)
                      //  }
                      >
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

export default UpdateTrainerProfile;


// import { Button, Card, Col, Container, Form, Row, Spinner, Alert } from "react-bootstrap";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// const UpdateTrainerProfile = () => {
//   const navigate = useNavigate();
//   const { _id } = useParams();

//   // Form state
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

//   // Location data
//   const [countries, setCountries] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [filteredStates, setFilteredStates] = useState([]);
//   const [filteredCities, setFilteredCities] = useState([]);

//   // UI state
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   // Helper functions
//   const capitalizeFirstLetter = (input) => {
//     if (typeof input === "string") {
//       return input
//         .split(" ")
//         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(" ");
//     }
//     return input;
//   };

//   // Fetch initial data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
        
//         // Fetch countries and cities in parallel
//         const [countriesRes, citiesRes] = await Promise.all([
//           axios.get("http://localhost:8000/getdataCountry"),
//           axios.get("http://localhost:8000/getdataCity")
//         ]);

//         const activeCountries = countriesRes.data.data.filter(item => item.status === "Active");
//         const activeCities = citiesRes.data.data.filter(item => item.status === "Active");

//         setCountries(activeCountries);
//         setCities(activeCities);

//         // Fetch trainer data if _id exists
//         if (_id) {
//           const trainerRes = await axios.get(`http://localhost:8000/getbyIdTrainer_profile/${_id}`);
//           const trainerData = trainerRes.data.data;
          
//           // Update form state
//           setFormData(prev => ({
//             ...prev,
//             ...trainerData
//           }));

//           // Filter states and cities based on trainer's location
//           if (trainerData.country) {
//             const countryStates = activeCountries.filter(
//               category => category.country === trainerData.country
//             );
//             setFilteredStates(countryStates);
//           }

//           if (trainerData.state) {
//             const stateCities = activeCities.filter(
//               city => city.state === trainerData.state
//             );
//             setFilteredCities(stateCities);
//           }
//         }
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch initial data");
//         console.error("Fetch error:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [_id]);

//   // Handlers
//   const handleCountryChange = (e) => {
//     const selectedCountry = e.target.value;
//     setFormData(prev => ({
//       ...prev,
//       country: selectedCountry,
//       state: "",
//       city_name: ""
//     }));

//     // Filter states based on selected country
//     const countryStates = countries.filter(
//       category => category.country === selectedCountry
//     );
//     setFilteredStates(countryStates);
//     setFilteredCities([]);
//   };

//   const handleStateChange = (e) => {
//     const selectedState = e.target.value;
//     setFormData(prev => ({
//       ...prev,
//       state: selectedState,
//       city_name: ""
//     }));

//     // Filter cities based on selected state
//     const stateCities = cities.filter(
//       city => city.state === selectedState
//     );
//     setFilteredCities(stateCities);
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, files } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === "file" ? files[0] : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const formDataToSend = new FormData();
      
//       // Append all form data with proper formatting
//       Object.entries(formData).forEach(([key, value]) => {
//         if (key === "image" && value) {
//           formDataToSend.append("Image", value);
//         } else if (typeof value === "string") {
//           formDataToSend.append(key, capitalizeFirstLetter(value));
//         } else if (value !== null) {
//           formDataToSend.append(key, value);
//         }
//       });

//       const response = await axios.put(
//         `http://localhost:8000/UpdateTrainer_profile/${_id}`,
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data"
//           }
//         }
//       );

//       setSuccess("Trainer profile updated successfully!");
//       setTimeout(() => navigate("/Head/trainer_profile_add"), 1500);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to update profile");
//       console.error("Update error:", err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="d-flex justify-content-center mt-5">
//         <Spinner animation="border" variant="primary" />
//       </div>
//     );
//   }

//   return (
//     <Container className="d-flex justify-content-center mt-5">
//       <Col md={12} sm={12} lg={10} xl={10}>
//         <h1 className="text-center text-dark pt-3">Update Trainer Profile</h1>
//         <div className="border-top border-5 mt-4 border-primary"></div>

//         {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
//         {success && <Alert variant="success" className="mt-3">{success}</Alert>}

//         <Card className="mt-3">
//           <Card.Body>
//             <Form onSubmit={handleSubmit}>
//               <Row>
//                 {/* Personal Information Section */}
//                 <Col md={12}>
//                   <h5 className="mb-3 text-primary">Personal Information</h5>
//                 </Col>
                
//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Group controlId="fullName">
//                     <Form.Label>Full Name:</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="full_Name"
//                       value={formData.full_Name}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Group controlId="profilePhoto">
//                     <Form.Label>Profile Photo:</Form.Label>
//                     <Form.Control
//                       type="file"
//                       name="image"
//                       onChange={handleInputChange}
//                     />
//                     {formData.image && typeof formData.image === "string" && (
//                       <small className="text-muted">Current: {formData.image}</small>
//                     )}
//                   </Form.Group>
//                 </Col>

//                 {/* Contact Information Section */}
//                 <Col md={12}>
//                   <h5 className="mb-3 text-primary">Contact Information</h5>
//                 </Col>

//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Group controlId="email">
//                     <Form.Label>Email:</Form.Label>
//                     <Form.Control
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Group controlId="phone">
//                     <Form.Label>Phone:</Form.Label>
//                     <Form.Control
//                       type="tel"
//                       name="Phone"
//                       value={formData.Phone}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>

//                 {/* Location Section */}
//                 <Col md={12}>
//                   <h5 className="mb-3 text-primary">Location</h5>
//                 </Col>

//                 <Col md={12} lg={4} className="pb-4">
//                   <Form.Group controlId="country">
//                     <Form.Label>Country:</Form.Label>
//                     <Form.Select
//                       name="country"
//                       value={formData.country}
//                       onChange={handleCountryChange}
//                       required
//                     >
//                       <option value="">Select Country</option>
//                       {countries.map(country => (
//                         <option key={country._id} value={country.country}>
//                           {country.country}
//                         </option>
//                       ))}
//                     </Form.Select>
//                   </Form.Group>
//                 </Col>

//                 <Col md={12} lg={4} className="pb-4">
//                   <Form.Group controlId="state">
//                     <Form.Label>State:</Form.Label>
//                     <Form.Select
//                       name="state"
//                       value={formData.state}
//                       onChange={handleStateChange}
//                       required
//                       disabled={!formData.country}
//                     >
//                       <option value="">Select State</option>
//                       {filteredStates.map(state => (
//                         <option key={state._id} value={state.state}>
//                           {state.state}
//                         </option>
//                       ))}
//                     </Form.Select>
//                   </Form.Group>
//                 </Col>

//                 <Col md={12} lg={4} className="pb-4">
//                   <Form.Group controlId="city">
//                     <Form.Label>City:</Form.Label>
//                     <Form.Select
//                       name="city_name"
//                       value={formData.city_name}
//                       onChange={handleInputChange}
//                       required
//                       disabled={!formData.state}
//                     >
//                       <option value="">Select City</option>
//                       {filteredCities.map(city => (
//                         <option key={city._id} value={city.city_name}>
//                           {city.city_name}
//                         </option>
//                       ))}
//                     </Form.Select>
//                   </Form.Group>
//                 </Col>

//                 {/* Professional Information Section */}
//                 <Col md={12}>
//                   <h5 className="mb-3 text-primary">Professional Information</h5>
//                 </Col>

//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Group controlId="jobTitle">
//                     <Form.Label>Job Title:</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="job_title"
//                       value={formData.job_title}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col md={12} className="pb-4">
//                   <Form.Group controlId="bio">
//                     <Form.Label>Brief Bio:</Form.Label>
//                     <Form.Control
//                       as="textarea"
//                       rows={3}
//                       name="brief_bio"
//                       value={formData.brief_bio}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>

//                 {/* Education Section */}
//                 <Col md={12}>
//                   <h5 className="mb-3 text-primary">Education</h5>
//                 </Col>

//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Group controlId="degree">
//                     <Form.Label>Degree Earned:</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="degree_earned"
//                       value={formData.degree_earned}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Group controlId="certifications">
//                     <Form.Label>Certifications:</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="certifications"
//                       value={formData.certifications}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>

//                 {/* Experience Section */}
//                 <Col md={12}>
//                   <h5 className="mb-3 text-primary">Experience</h5>
//                 </Col>

//                 <Col md={12} lg={4} className="pb-4">
//                   <Form.Group controlId="experience">
//                     <Form.Label>Years Experience:</Form.Label>
//                     <Form.Control
//                       type="number"
//                       name="year"
//                       value={formData.year}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col md={12} lg={4} className="pb-4">
//                   <Form.Group controlId="jobRoles">
//                     <Form.Label>Job Roles:</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="job_roles"
//                       value={formData.job_roles}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col md={12} lg={4} className="pb-4">
//                   <Form.Group controlId="jobDuration">
//                     <Form.Label>Job Duration:</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="job_duration"
//                       value={formData.job_duration}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col md={12} className="pb-4">
//                   <Form.Group controlId="responsibilities">
//                     <Form.Label>Key Responsibilities & Achievements:</Form.Label>
//                     <Form.Control
//                       as="textarea"
//                       rows={3}
//                       name="key_responsibilities_achievements"
//                       value={formData.key_responsibilities_achievements}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>

//                 {/* Skills Section */}
//                 <Col md={12}>
//                   <h5 className="mb-3 text-primary">Skills</h5>
//                 </Col>

//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Group controlId="programming">
//                     <Form.Label>Programming Languages:</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="programming_languages"
//                       value={formData.programming_languages}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Group controlId="software">
//                     <Form.Label>Software Expertise:</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="software_expertise"
//                       value={formData.software_expertise}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Group controlId="hardware">
//                     <Form.Label>Hardware Networking Knowledge:</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="hardware_networking_knowledge"
//                       value={formData.hardware_networking_knowledge}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Group controlId="tools">
//                     <Form.Label>Training Tools:</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="training_tools"
//                       value={formData.training_tools}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>

//                 {/* Training Section */}
//                 <Col md={12}>
//                   <h5 className="mb-3 text-primary">Training Information</h5>
//                 </Col>

//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Group controlId="courses">
//                     <Form.Label>Courses Taught:</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="courses_taught"
//                       value={formData.courses_taught}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Group controlId="methods">
//                     <Form.Label>Training Methods:</Form.Label>
//                     <div className="d-flex flex-wrap">
//                       {["Classroom", "Online", "Hands-on"].map(method => (
//                         <Form.Check
//                           key={method}
//                           type="radio"
//                           label={method}
//                           name="training_methods"
//                           value={method}
//                           className="me-3"
//                           checked={formData.training_methods === method}
//                           onChange={handleInputChange}
//                         />
//                       ))}
//                     </div>
//                   </Form.Group>
//                 </Col>

//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Group controlId="seminars">
//                     <Form.Label>Seminars Conducted:</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="seminars_conducted"
//                       value={formData.seminars_conducted}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Group controlId="languages">
//                     <Form.Label>Languages Spoken:</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="languages_spoken"
//                       value={formData.languages_spoken}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>

//                 {/* Availability Section */}
//                 <Col md={12}>
//                   <h5 className="mb-3 text-primary">Availability</h5>
//                 </Col>

//                 <Col md={12} lg={6} className="pb-4">
//                   <Form.Group controlId="availability">
//                     <Form.Label>Availability:</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="availability"
//                       value={formData.availability}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>

//                 {/* Social Links Section */}
//                 <Col md={12}>
//                   <h5 className="mb-3 text-primary">Social Links</h5>
//                 </Col>

//                 <Col md={12} lg={4} className="pb-4">
//                   <Form.Group controlId="github">
//                     <Form.Label>GitHub:</Form.Label>
//                     <Form.Control
//                       type="url"
//                       name="github"
//                       value={formData.github}
//                       onChange={handleInputChange}
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col md={12} lg={4} className="pb-4">
//                   <Form.Group controlId="linkedin">
//                     <Form.Label>LinkedIn:</Form.Label>
//                     <Form.Control
//                       type="url"
//                       name="linkedIn"
//                       value={formData.linkedIn}
//                       onChange={handleInputChange}
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col md={12} lg={4} className="pb-4">
//                   <Form.Group controlId="website">
//                     <Form.Label>Website:</Form.Label>
//                     <Form.Control
//                       type="url"
//                       name="website"
//                       value={formData.website}
//                       onChange={handleInputChange}
//                     />
//                   </Form.Group>
//                 </Col>

//                 {/* Status Section */}
//                 <Col md={12}>
//                   <h5 className="mb-3 text-primary">Status</h5>
//                 </Col>

//                 <Col md={12} className="pb-4">
//                   <Form.Group controlId="status">
//                     <div className="d-flex align-items-center">
//                       <Form.Label className="me-3 mb-0">Status:</Form.Label>
//                       {["Active", "Inactive"].map(status => (
//                         <Form.Check
//                           key={status}
//                           type="radio"
//                           label={status}
//                           name="status"
//                           value={status}
//                           className="me-3"
//                           checked={formData.status === status}
//                           onChange={handleInputChange}
//                         />
//                       ))}
//                     </div>
//                   </Form.Group>
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
//                         <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
//                         <span className="ms-2">Updating...</span>
//                       </>
//                     ) : "Update Profile"}
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

// export default UpdateTrainerProfile;