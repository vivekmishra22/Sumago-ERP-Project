import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import {  FaClipboardList, FaListAlt, FaRupeeSign} from "react-icons/fa";
import { FaArrowRightLong, FaDiagramProject    } from "react-icons/fa6";
import { SiGoogleclassroom } from "react-icons/si";
import { Link } from "react-router-dom";

const Dashboard = () => {

  const [student_name ,setEnquiry_Studentcount] = useState("");
  const [college_name, setCollegeCount] = useState("");
  // const [welcome_kit, setKitCount] = useState("");
  const [welcome_kit, setKit_Count] = useState("");

  useEffect (() =>{

    // Enquiry_Student Conut 
    axios.get("http://localhost:8000/getEnquiry_Student")
    .then((res) =>{
      const Enquiry_Studentcount = res.data.data.filter((item) => item.status === "Active");
      setEnquiry_Studentcount(Enquiry_Studentcount.length);
      console.log("record fetched",res.data.Enquiry_Studentcount)
    })

    // College Conut
    axios.get("http://localhost:8000/getdataCollege")
    .then((res) =>{
      const collegecount = res.data.data.filter((item) => item.status === "Active");
      setCollegeCount(collegecount.length);
      console.log("record fetched",res.data.collegecount)
    })

    // panding welcome kit item  
    axios.get("http://localhost:8000/getdataKit_FeesPaid")
    .then((res) => {
      
      const pendingKits = res.data.data.filter(item => item.kit_aside  === "pending Kit" && item.status === "Active" );
      setKit_Count(pendingKits.length); // Update state with count
      console.log("Pending Welcome Kits (Active Interns):", pendingKits.length);
    })
    .catch((err) => console.log(err));


  })

  return (
    <>
      <Container className="mt-5 pt-3">
        <Row className="g-4">
        
        {/* card 1 */}
       
        <Col md={6} lg={4} xs={12}>
        <Link to="/Head/enquiry_student" className=" text-decoration-none  ">
            <Card className="h-100 shadow p-0"  style={{ borderLeft: '5px solid  rgb(61, 152, 250)' }}>
              <Card.Body>
              <Row>
                  <Col md={8}>
                  <Card.Title className="fs-5 fw-bold ">
                      {student_name}
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                  <FaListAlt  className="fs-1 ms-0 p-0 me-3 dashboarde-color  "/>
                  </Col>
                  <Card.Text style={{color:"rgb(61, 152, 250)"}} className=" fs-6  fw-bold d-flex gap-2">
                    Batchwise List <FaArrowRightLong  className="my-1"/> 
                    </Card.Text>
                </Row>
              </Card.Body>
            </Card>
          </Link>
          </Col>

        {/* card 2 */}
          <Col md={6} lg={4} xs={12}>
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
                  <FaClipboardList  className="fs-1 ms-0 p-0 me-3 dashboarde-color " />
                  </Col>
                  <Card.Text style={{color:"rgb(32, 190, 79)"}} className=" fs-6  d-flex gap-2 fw-bold ">
                      Completion List <FaArrowRightLong  className="my-1"/>
                    </Card.Text>
                </Row>
              </Card.Body>
            </Card>
            </Link>
          </Col>

        {/* card 3 */}
        {/* <Col md={6} lg={4} xs={12}>
        <Link to="/Head/city" className=" text-decoration-none  ">
            <Card className="h-100 shadow p-0"  style={{ borderLeft: '5px solid  rgb(6, 194, 178)'}} >
              <Card.Body>
              <Row>
                  <Col md={8}>
                  <Card.Title className="fs-5 fw-bold ">
                      {welcome_kit}
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                  <IoBagCheckSharp  className="fs-1 ms-0 p-0 me-3 dashboarde-color "/>
                 </Col>
                 <Card.Text style={{color:"rgb(6, 194, 178)"}} className=" fs-6  d-flex gap-2 fw-bold " >
                    Pending Welcome Kit Items of Interns<FaArrowRightLong  className="my-1"/>
                    </Card.Text>
                </Row>
                </Card.Body>
            </Card>
            </Link>
          </Col> */}

<Col md={6} lg={4} xs={12}>
  <Link to="/Head/welcomekit_feespaid" className="text-decoration-none">
    <Card className="h-100 shadow p-0" style={{ borderLeft: '5px solid rgb(6, 194, 178)' }}>
      <Card.Body>
        <Row>
          <Col md={8}>
            <Card.Title className="fs-5 fw-bold">
               {welcome_kit} {/* Display dynamic count */}
            </Card.Title>
          </Col>
          <Col md={4}>
          <FaDiagramProject className="fs-1 ms-0 p-0 me-3 dashboarde-color" />
          </Col>
          <Card.Text style={{color: "rgb(6, 194, 178)"}} className="fs-6 d-flex gap-2 fw-bold">
            Project Allocation <FaArrowRightLong className="my-1" />
          </Card.Text>
        </Row>
      </Card.Body>
    </Card>
  </Link>
</Col>


<Col md={6} lg={4} xs={12}>
  <Link to="/Head/welcomekit_feespaid" className="text-decoration-none">
    <Card className="h-100 shadow p-0" style={{ borderLeft: '5px solid  rgb(61, 152, 250)'}}>
      <Card.Body>
        <Row>
          <Col md={8}>
            <Card.Title className="fs-5 fw-bold">
               {welcome_kit} {/* Display dynamic count */}
            </Card.Title>
          </Col>
          <Col md={4}>
          <SiGoogleclassroom className="fs-1 ms-0 p-0 me-3 dashboarde-color" />
          </Col>
          <Card.Text style={{color: "rgb(61, 152, 250)"}} className="fs-6 d-flex gap-2 fw-bold">
            New Batch Allocation <FaArrowRightLong className="my-1" />
          </Card.Text>
        </Row>
      </Card.Body>
    </Card>
  </Link>
</Col>

<Col md={6} lg={4} xs={12}>
  <Link to="/Head/welcomekit_feespaid" className="text-decoration-none">
    <Card className="h-100 shadow p-0" style={{ borderLeft: '5px solid rgb(32, 190, 79)' }}>
      <Card.Body>
        <Row>
          <Col md={8}>
            <Card.Title className="fs-5 fw-bold">
               {welcome_kit} {/* Display dynamic count */}
            </Card.Title>
          </Col>
          <Col md={4}>
          <FaRupeeSign className="fs-1 ms-0 p-0 me-3 dashboarde-color" />
          </Col>
          <Card.Text style={{color: "rgb(32, 190, 79)"}} className="fs-6 d-flex gap-2 fw-bold">
            Fees unpaid List<FaArrowRightLong className="my-1" />
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
