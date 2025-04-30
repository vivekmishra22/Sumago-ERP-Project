import React from "react";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./Home";
import Dashboard from "./Dashboard";
import StudentLogin from "./StudentLogin";

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
              <Route path="/studentlogin" element={<StudentLogin />} />
              <Route path="/dashboard" element={<Dashboard />}></Route>  
            </Routes>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Head;
