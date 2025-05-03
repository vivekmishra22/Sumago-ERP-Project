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
import City from "./City";
import Courses from "./Courses";
import WelcomeKit from "./WelcomeKit";
import Dashboard from "./Dashboard";
import Users from "./Users";
import Duration from "./Duration";
import BDE from "./BDE";
import HR from "./HR";
import Trainer from "./Trainer";
import Batch from "./Batch";
import Country from "./Country";
import Projects from "./Project";
// import State from "./State";

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
              <Route path="/" element={<Dashboard/>}/>
              <Route path="/users" element={<Users/>}/>
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
              <Route path="/WelcomeKit" element={<WelcomeKit/>}/> 
              <Route path="duration" element={<Duration/>}/>
              <Route path="/BDE" element={<BDE/>} />
              <Route path="/HR" element={<HR/>} />
              <Route path="/Trainer" element={<Trainer/>} />
              <Route path="/batch" element={<Batch/>}/>
              <Route path="/country" element={<Country/>}/>
              <Route path="/project" element={<Projects/>}/>
              {/* <Route path="/state" element={<State/>}/> */}
              
            </Routes>
          </Container>
        </div>
      </div>


     
    </>
  );
};

export default Head;
