import React from "react";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Admission_Fees from "./Admission_Fees";
import Welcomekit_Feespaid from "./Welcomekit_Feespaid";
import Enquiry_Student from "./Enquiry_Student";
import Enquiry_Add from "./Enquiry_Add";
import Installment from "./Installment";
import GenerateReceipt from "./GenerateReceipt";
import Pending_welcomeKit from "./Pending_welcomeKit";
import Enquiry_Follow_Up from "./Enquiry_Follow_Up";
import Update_Enquiry_FollowUp from "./Update_Enquiry_FollowUp";


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
              <Route path="/enquiry_add" element={<Enquiry_Add />}/>
              <Route path="/admission_fees" element={<Admission_Fees />}/>
              <Route path="/welcomekit_feespaid" element={<Welcomekit_Feespaid />}/>
              <Route path="/enquiry_student" element={<Enquiry_Student/>}/>
              <Route path="installment" element={<Installment/>}/>
              <Route path="GenerateReceipt/:id"  element={<GenerateReceipt/>}/>
              <Route path='/pending_welcomekit' element={<Pending_welcomeKit/>}/>
              <Route path='/enquiry_follow_up' element={<Enquiry_Follow_Up/>}/>
              <Route path="/update_enquiry_followUp/:_id" element={<Update_Enquiry_FollowUp/>}/>
             
            </Routes>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Head;


