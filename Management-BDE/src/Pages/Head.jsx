import React from "react";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Admission_Fees from "./Admission_Fees";
import Welcomekit_Feespaid from "./Welcomekit_Feespaid";
import Enquiry_Student from "./Enquiry_Student";


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
              <Route path="/" element={<Dashboard/>}></Route>
              <Route path="/admission_fees" element={<Admission_Fees />}/>
              <Route path="/welcomekit_feespaid" element={<Welcomekit_Feespaid />}/>
              <Route path="/enquiry_student" element={<Enquiry_Student/>}/>
             
            </Routes>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Head;
