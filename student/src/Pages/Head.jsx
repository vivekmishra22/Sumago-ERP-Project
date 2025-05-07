import React from "react";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Feedback from "./Feedback";
import Project from "./Project";
import Document from "./Document";

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
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/feedback" element={<Feedback />} />  
              <Route path="/project" element={<Project />} />  
              <Route path="/documents" element={<Document />} />  
              <Route path="/dashboard" element={<Dashboard />} />      
            </Routes>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Head;
