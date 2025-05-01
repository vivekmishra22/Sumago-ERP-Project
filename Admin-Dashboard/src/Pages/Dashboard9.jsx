import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { BsFillLaptopFill } from "react-icons/bs";
import { FaListAlt, FaUniversity } from "react-icons/fa";
import { FaArrowRightLong, FaDiagramProject, FaIndianRupeeSign, FaMountainCity,  FaUserGraduate, FaUserPlus, FaUserTie } from "react-icons/fa6";
import { IoBagCheckSharp } from "react-icons/io5";
import { MdFeedback, MdLibraryBooks } from "react-icons/md";
import { TbBulbFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

const Dashboard = () => {

  const [university_name ,setUniversityCount] = useState("");
  const [college_name, setCollegeCount] = useState("");
  const [city_name, setCityCount] = useState("");
  const [ education_name ,setEducationCount] = useState("");
  const [technology_name ,setTechnologyCount] = useState("");
  const [welcome_kit, setWelcomeKitCount] = useState("");
  const [student_name ,setEnquiry_Studentcount] = useState("");


  useEffect (() =>{

    // University Conut 
    axios.get("http://localhost:8000/getdataUniversity")
    .then((res) =>{
      const universitycount = res.data.data.filter((item) => item.status === "Active");
      setUniversityCount(universitycount.length);
      console.log("record fetched",res.data.universitycount)
    })

    // College Conut
    axios.get("http://localhost:8000/getdataCollege")
    .then((res) =>{
      const collegecount = res.data.data.filter((item) => item.status === "Active");
      setCollegeCount(collegecount.length);
      console.log("record fetched",res.data.collegecount)
    })

    // City Conut
    axios.get("http://localhost:8000/getdataCity")
    .then((res) =>{
      const citycount = res.data.data.filter((item) => item.status === "Active");
      setCityCount(citycount.length);
      console.log("record fetched",res.data.citycount)
    })

    // Education Count
    axios.get("http://localhost:8000/getdataEducation")
    .then((res) =>{
      const educationcount = res.data.data.filter((item) => item.status === "Active");
      setEducationCount(educationcount.length);
      console.log("record fetched",res.data.educationcount)
    })

    // Technology Count
    axios.get("http://localhost:8000/getdata")
    .then((res) =>{
      const technologyoncount = res.data.data.filter((item) => item.status === "Active");
      setTechnologyCount(technologyoncount.length);
      console.log("record fetched",res.data.technologyoncount)
    })

    // Welcome Kit  Count
    axios.get("http://localhost:8000/getkititem")
    .then((res) =>{
      const kitcount = res.data.data.filter((item) => item.status === "Active");
      setWelcomeKitCount(kitcount.length);
      console.log("record fetched",res.data.kitcount)
    })

    // Enquiry_Student Conut 
    axios.get("http://localhost:8000/getEnquiry_Student")
    .then((res) =>{
      const Enquiry_Studentcount = res.data.data.filter((item) => item.status === "Active");
      setEnquiry_Studentcount(Enquiry_Studentcount.length);
      console.log("record fetched",res.data.Enquiry_Studentcount)
    })

    .catch((err) => console.log(err));
  })

  return (
    <>
      <Container className="mt-5 pt-3">
        <Row className="g-4">
        
        {/* card 1 */}
       
        <Col md={6} lg={3} xs={12}>
        <Link to="/Head/university" className=" text-decoration-none  ">
            <Card className="h-100 shadow p-0"  style={{ borderLeft: '5px solid  rgb(61, 152, 250)' }}>
              <Card.Body>
              <Row>
                  <Col md={8}>
                  <Card.Title className="fs-5 fw-bold ">
                      {university_name}
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                  <FaUniversity   className="fs-1 ms-0 p-0 me-3 dashboarde-color  "/>
                  </Col>
                  <Card.Text style={{color:"rgb(61, 152, 250)"}} className=" fs-6  fw-bold d-flex gap-2">
                    University List <FaArrowRightLong  className="my-1"/> 
                    </Card.Text>
                </Row>
              </Card.Body>
            </Card>
          </Link>
          </Col>

        {/* card 2 */}
          <Col md={6} lg={3} xs={12}>
          <Link to="/Head/college" className=" text-decoration-none  ">
            <Card className="h-100  shadow p-0 "  style={{ borderLeft: '5px solid rgb(32, 190, 79)' }}>
              <Card.Body>
                <Row className=" ">
                  <Col md={8}>
                  <Card.Title className="fs-5 fw-bold">
                      {college_name}
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                  <FaUniversity  className="fs-1 ms-0 p-0 me-3 dashboarde-color " />
                  </Col>
                  <Card.Text style={{color:"rgb(32, 190, 79)"}} className=" fs-6  d-flex gap-2 fw-bold ">
                      College List <FaArrowRightLong  className="my-1"/>
                    </Card.Text>
                </Row>
              </Card.Body>
            </Card>
            </Link>
          </Col>

        {/* card 3 */}
        <Col md={6} lg={3} xs={12}>
        <Link to="/Head/city" className=" text-decoration-none  ">
            <Card className="h-100 shadow p-0"  style={{ borderLeft: '5px solid  rgb(6, 194, 178)'}} >
              <Card.Body>
              <Row>
                  <Col md={8}>
                  <Card.Title className="fs-5 fw-bold ">
                      {city_name}
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                 <FaMountainCity  className="fs-1 ms-0 p-0 me-3 dashboarde-color "/>
                 </Col>
                 <Card.Text style={{color:"rgb(6, 194, 178)"}} className=" fs-6  d-flex gap-2 fw-bold " >
                    City List <FaArrowRightLong  className="my-1"/>
                    </Card.Text>
                </Row>
                </Card.Body>
            </Card>
            </Link>
          </Col>

        {/* card 4 */}
        <Col md={6} lg={3} xs={12}>
        <Link to="/Head/education" className=" text-decoration-none  ">
            <Card className="h-100 shadow p-0 " style={{ borderLeft: '5px solid  rgb(206, 187, 20)' }}>
              <Card.Body>
              <Row>
                  <Col md={8}>
                  <Card.Title className="fs-5 fw-bold ">
                      {education_name}
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                  <FaUserGraduate    className="fs-1 ms-0 p-0 me-3 dashboarde-color "/>
                  </Col>
                  <Card.Text style={{color:"rgb(206, 187, 20)"}} className=" fs-6  d-flex gap-2 fw-bold ">
                    Education List <FaArrowRightLong  className="my-1"/>
                    </Card.Text>
                </Row>
              </Card.Body>
            </Card>
            </Link>
          </Col>

          {/* card 5 */}
          <Col md={6} lg={3} xs={12}>
          <Link to="/Head/technology" className=" text-decoration-none  ">
            <Card className="h-100 shadow p-0"  style={{ borderLeft: '5px solid  rgb(61, 152, 250)' }}>
              <Card.Body>
              <Row>
                  <Col md={8}>
                  <Card.Title className="fs-5 fw-bold ">
                      {technology_name}
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                  <TbBulbFilled  className="fs-1 ms-0 p-0 me-3 dashboarde-color "/>
                  </Col>
                  <Card.Text style={{color:"rgb(61, 152, 250)"}} className=" fs-6  d-flex gap-2 fw-bold ">
                    Technology List <FaArrowRightLong  className="my-1"/>
                    </Card.Text>
                </Row>
              </Card.Body>
            </Card>
            </Link>
          </Col>

          {/* card 6 */}
          <Col md={6} lg={3} xs={12}>
          <Link to="/Head/WelcomeKit" className=" text-decoration-none  ">
            <Card className="h-100 shadow p-0"   style={{ borderLeft: '5px solid  rgb(32, 190, 79)' }}>
              <Card.Body>
              <Row>
                  <Col md={8}>
                  <Card.Title className="fs-5 fw-bold ">
                      {welcome_kit}
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                  <IoBagCheckSharp   className="fs-1 ms-0 p-0 me-3 dashboarde-color "/>
                  </Col>
                  <Card.Text style={{color:" rgb(32, 190, 79)"}} className=" fs-6  d-flex gap-2 fw-bold ">
                    Welcome Kit List <FaArrowRightLong  className="my-1"/>
                    </Card.Text>
                </Row>
              </Card.Body>
            </Card>
            </Link>
          </Col>

          {/* card 7 */}
          <Col md={6} lg={3} xs={12}>
          <Link to="/Head/university" className=" text-decoration-none  ">
            <Card className="h-100 shadow p-0"  style={{ borderLeft: '5px solid rgb(6, 194, 178)' }}>
              <Card.Body>
              <Row>
                  <Col md={8}>
                  <Card.Title className="fs-5 fw-bold ">
                      {/* {totalUpcomingvisitsCount} */}
                      23
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                  <i class="dashboarde-color fs-1 fa-solid fa-location-dot"></i>
                  {/* <FaRupeeSign   className="fs-1 ms-0 p-0 me-3 dashboarde-color "/> */}
                  </Col>
                  <Card.Text style={{color:"rgb(6, 194, 178)"}} className=" fs-6  d-flex gap-2 fw-bold ">
                    Batch Allocation <FaArrowRightLong  className="my-1"/>
                    </Card.Text>
                </Row>
              </Card.Body>
            </Card>
            </Link>
          </Col>
          

          {/* card 8 */}
          <Col md={6} lg={3} xs={12}>
          <Link to="/Head/university" className=" text-decoration-none  ">
            <Card className="h-100 shadow p-0"  style={{ borderLeft: '5px solid   rgb(206, 187, 20)' }}>
              <Card.Body>
              <Row>
                  <Col md={8}>
                  <Card.Title className="fs-5 fw-bold ">
                      {/* {totalUpcomingvisitsCount} */}
                      23
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                  <FaUserTie   className="fs-1 ms-0 p-0 me-3 dashboarde-color "/>
                  </Col>
                  <Card.Text style={{color:" rgb(206, 187, 20)"}} className=" fs-6  d-flex gap-2 fw-bold ">
                    Trainer List <FaArrowRightLong  className="my-1"/>
                    </Card.Text>
                </Row>
              </Card.Body>
            </Card>
            </Link>
          </Col>
          

          {/* card 9 */}
          <Col md={6} lg={3} xs={12}>
          <Link to="/Head/university" className=" text-decoration-none  ">
            <Card className="h-100 shadow p-0 "  style={{ borderLeft: '5px solid  rgb(61, 152, 250)' }}>
              <Card.Body>
                <Row>
                  <Col md={8}>
                  <Card.Title className="fs-5 fw-bold ">
                      {/* {totalUpcomingvisitsCount} */}
                      23
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                  <FaIndianRupeeSign  className="fs-1 dashboarde-color ms-0 p-0 me-3"  />
                  </Col>
                  <Card.Text style={{color:"rgb(61, 152, 250)"}} className=" fs-6  d-flex gap-2 fw-bold " >
                      Pending Fees List <FaArrowRightLong  className="my-1"/>
                    </Card.Text>
                </Row>
              </Card.Body>
            </Card>
            </Link>
          </Col>

          {/* card 10 */}
          <Col md={6} lg={3} xs={12}>
          <Link to="/Head/university" className=" text-decoration-none  ">
            <Card className="h-100 shadow p-0 " style={{ borderLeft: '5px solid  rgb(32, 190, 79)' }}>
              <Card.Body>
              <Row>
                  <Col md={8}>
                  <Card.Title className="fs-5 fw-bold ">
                      {/* {totalUpcomingvisitsCount} */}
                      23
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                  <FaUserPlus  className="fs-1 ms-0 p-0 me-3 dashboarde-color "/>
                  </Col>
                  <Card.Text style={{color:"rgb(32, 190, 79)"}} className=" fs-6  d-flex gap-2 fw-bold ">
                    New Admission List for Trainer <FaArrowRightLong  className="my-2 me-2 fs-4"/>
                    </Card.Text>
                </Row>
              </Card.Body>
            </Card>
            </Link>
          </Col>

          {/* card 11 */}
          <Col md={6} lg={3} xs={12}>
          <Link to="/Head/university" className=" text-decoration-none  ">
            <Card className="h-100 shadow p-0"  style={{ borderLeft: '5px solid rgb(6, 194, 178)' }}>
              <Card.Body>
              <Row>
                  <Col md={8}>
                  <Card.Title className="fs-5 fw-bold ">
                      {/* {totalUpcomingvisitsCount} */}
                      23
                    </Card.Title>
                  </Col>
                  <Col md={4} >
                  <i class="dashboarde-color fa-brands fa-teamspeak fs-1"></i>
                   </Col>
                   <Card.Text style={{color:"rgb(6, 194, 178)"}} className=" fs-6  d-flex gap-2 fw-bold ">
                    Mock Exam List Trainer <FaArrowRightLong  className="my-1"/>
                    </Card.Text>
                </Row>
              </Card.Body>
            </Card>
            </Link>
          </Col>

          {/* card 12 */}
          <Col md={6} lg={3} xs={12}>
          <Link to="/Head/university" className=" text-decoration-none  ">
            <Card className="h-100 shadow p-0"  style={{ borderLeft: '5px solid  rgb(206, 187, 20)'}}>
              <Card.Body>
              <Row>
                  <Col md={8}>
                  <Card.Title className="fs-5 fw-bold ">
                      {/* {totalUpcomingvisitsCount} */}
                      23
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                  <FaDiagramProject   className="fs-1 ms-0 p-0 me-3 dashboarde-color "/>
                  </Col>
                  <Card.Text style={{color:"rgb(206, 187, 20)"}} className=" fs-6  d-flex  fw-bold ">
                    Project Assign to Student <FaArrowRightLong  className="my-3 "/>
                    </Card.Text>
                </Row>
              </Card.Body>
            </Card>
            </Link>
          </Col>

          {/* card 13 */}
          <Col md={6} lg={3} xs={12}>
          <Link to="/Head/university" className=" text-decoration-none  ">
            <Card className="h-100 shadow p-0"  style={{ borderLeft: '5px solid  rgb(61, 152, 250)' }}>
              <Card.Body>
              <Row>
                  <Col md={8}>
                  <Card.Title className="fs-5 fw-bold ">
                      {/* {totalUpcomingvisitsCount} */}
                      23
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                  <BsFillLaptopFill   className="fs-1 ms-0 p-0 me-3 dashboarde-color "/>
                  </Col>
                  <Card.Text style={{color:"rgb(61, 152, 250)"}} className=" fs-6  d-flex gap-2 fw-bold ">
                    PC / Laptop Owned List <FaArrowRightLong  className="my-1"/>
                    </Card.Text>
                </Row>
              </Card.Body>
            </Card>
            </Link>
          </Col>

          {/* card 14 */}
          <Col md={6} lg={3} xs={12}>
          <Link to="/Head/university" className=" text-decoration-none  ">
            <Card className="h-100 shadow p-0"  style={{ borderLeft: '5px solid rgb(32, 190, 79)'}}>
              <Card.Body>
              <Row>
                  <Col md={8}>
                  <Card.Title className="fs-5 fw-bold ">
                      {/* {totalUpcomingvisitsCount} */}
                      23
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                 <MdLibraryBooks  className="fs-1 ms-0 p-0 me-3 dashboarde-color "/>
                 </Col>
                 <Card.Text style={{color:"rgb(32, 190, 79)"}} className=" fs-6  d-flex gap-2 fw-bold ">
                    Course Completion List <FaArrowRightLong  className="my-1"/>
                    </Card.Text>
                </Row>
              </Card.Body>
            </Card>
            </Link>
          </Col>

          {/* card 15 */}
          <Col md={6} lg={3} xs={12}>
          <Link to="/Head/university" className=" text-decoration-none  ">
            <Card className="h-100 shadow p-0"  style={{ borderLeft: '5px solid  rgb(6, 194, 178)' }}>
              <Card.Body>
                <Row>
                  <Col md={8}>
                  <Card.Title className="fs-5 fw-bold ">
                      {student_name}
                      
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                  <FaListAlt  className="fs-1 dashboarde-color ms-0 p-0 me-3  "/>
                  </Col>
                  <Card.Text style={{color:"rgb(6, 194, 178)"}} className=" fs-6  d-flex gap-2 fw-bold ">
                      Enquiry Follow Up List <FaArrowRightLong  className="my-1"/>
                    </Card.Text>
                </Row>
              </Card.Body>
            </Card>
            </Link>
          </Col>

          {/* card 16 */}
          <Col md={6} lg={3} xs={12}>
          <Link to="/Head/university" className=" text-decoration-none  ">
            <Card className="h-100 shadow p-0 " style={{ borderLeft: '5px solid  rgb(206, 187, 20)'}}>
              <Card.Body>
              <Row>
                  <Col md={8}>
                  <Card.Title className="fs-5 fw-bold ">
                      {/* {totalUpcomingvisitsCount} */}
                      23
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                  <MdFeedback   className="fs-1 ms-0 p-0 me-3 dashboarde-color "/>
                  </Col>
                  <Card.Text style={{color:"rgb(206, 187, 20)"}} className=" fs-6  d-flex gap-2 fw-bold ">
                    FeedBack <FaArrowRightLong  className="my-1"/>
                    </Card.Text>
                </Row>
              </Card.Body>
            </Card>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
