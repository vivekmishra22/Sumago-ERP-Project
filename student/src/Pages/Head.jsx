import React from "react";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Feedback from "./Feedback";
import Project from "./Project";

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
              {/* <Route path="/technology" element={<Technology />} />
              <Route path="/university" element={<University />} />
              <Route path="/college" element={<College />} />
              <Route path="/city" element={<City />} />
              <Route path="/office" element={<Office />} />
              <Route path="/education" element={<Education />} />
              <Route path="/officecity" element={<OfficeCity />} />
              <Route path="/office" element={<Office />} />
              <Route path ="/Courses" element={<Courses/>} />
              <Route path="/GuestLecturer" element={<GuestLecturer/>} />  */}
              {/* <Route path="/UpdateGuest/:_id" element={<UpdateGuest />} />         */}
              {/* <Route path="/UpdateCourse/:_id" element={<UpdateCourse />} />         */}
              {/* <Route path="/fee" element={<Fee />} />         */}
              {/* <Route path="/welcomekit" element={<WelcomeKit />} />  
              <Route path="/users" element={<Users />} />   */}
              <Route path="/feedback" element={<Feedback />} />  
              <Route path="/project" element={<Project />} />  
              <Route path="/dashboard" element={<Dashboard />}></Route>      
            </Routes>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Head;
