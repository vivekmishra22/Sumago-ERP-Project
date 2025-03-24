import React from "react";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./Home";
import Technology from "./Technology";
import University from "./University";
import College from "./College";
import OfficeCity from "./OfficeCity";
import Office from "./Office";
import Education from "./Education";
import GuestLecturer from "./GuestLecturer";
// import UpdateGuest from "./UpdateGuest";
import City from "./City";
import Courses from "./Courses";
// import Fee from "./Fee";
import WelcomeKit from "./WelcomeKit";
import Dashboard from "./Dashboard";
import UpdateCourse from "./UpdateCourse";
import Users from "./Users";
import Duration from "./Duration";
// import Feedback from "./Feedback";
// import Project from "./Project";

const Head = () => {
  return (
    <>
      <Home />
      <div className="d-flex">
        <div>
          <Sidebar />
        </div>
        <div className="content-container flex-grow-1" style={{ marginLeft: "250px", padding: "20px" }}>
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/university" element={<University />} />
              <Route path="/college" element={<College />} />
              <Route path="/city" element={<City />} />
              <Route path="/office" element={<Office />} />
              <Route path="/education" element={<Education />} />
              <Route path="/officecity" element={<OfficeCity />} />
              <Route path="/office" element={<Office />} />
              <Route path ="/Courses" element={<Courses/>} />
              <Route path="/GuestLecturer" element={<GuestLecturer/>} /> 
              {/* <Route path="/UpdateGuest/:_id" element={<UpdateGuest />} />         */}
              <Route path="/UpdateCourse/:_id" element={<UpdateCourse />} />        
              {/* <Route path="/fee" element={<Fee />} />         */}
              <Route path="/welcomekit" element={<WelcomeKit />} />  
              <Route path="/users" element={<Users />} />  
              {/* <Route path="/feedback" element={<Feedback />} />   */}
              {/* <Route path="/project" element={<Project />} />   */}
              <Route path="/dashboard" element={<Dashboard />}></Route>      
              <Route path="/duration" element={<Duration />}></Route>      
            </Routes>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Head;
