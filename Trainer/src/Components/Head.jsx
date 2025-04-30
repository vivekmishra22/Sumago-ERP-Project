import React from "react";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Trainer_profile from "./Trainer_profile";
import Trainer_profile_Add from "./Trainer_profile_Add";

// import Update_Enquiry_FollowUp from "./Update_Enquiry_FollowUp";


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
              <Route path="/trainer_profile" element={<Trainer_profile/>}></Route>
              <Route path="/trainer_profile_add" element={<Trainer_profile_Add/>}></Route>
               
              {/* <Route path="/update_enquiry_followUp/:_id" element={<Update_Enquiry_FollowUp/>}/> */}

             
            </Routes>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Head;


