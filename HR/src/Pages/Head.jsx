import React from "react";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import { Container} from "react-bootstrap";
import Home from "./Home";
import Dashboard from "./Dashboard";
import StudentLogin from "./StudentLogin";
import AdmittedStudent from "./AdmittedStudent";

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
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/studentlogin" element={<StudentLogin/>} />
               <Route path="/AdmittedStudent" element={<AdmittedStudent />} />

              {/* <Route path="/university" element={<University />} />
              <Route path="/college" element={<College />} />
              <Route path="/city" element={<City />} />
              <Route path="/education" element={<Education />} />
              <Route path="/officecity" element={<OfficeCity />} />
              <Route path="/office" element={<Office />} />
              <Route path ="/Courses" element={<Courses/>} /> */}
              {/* <Route path="/UpdateCourse/:_id" element={<UpdateCourse />} /> */}
              {/* <Route path ="/GuestLecturer" element={<GuestLecturer/>} />
              {/* <Route path="/UpdateGuest/:_id" element={<UpdateGuest />} /> */}
              {/* <Route path ="/WelcomeKit" element={<WelcomeKit/>} /> */} 
            </Routes> 
          </Container>
        </div>
      </div>
    </>
  );
};

export default Head;
