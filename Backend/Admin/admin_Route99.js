const express = require("express");
const {
    registerAdmin,
  regi_user,
  loginuser,
  getuser,
  getbyId,
  Delete,
  Update,
} = require("./admin_Controller");
const auth = require("../Middleware/Authentication");
// const isAdmin = require("../Middleware/isAdmin");

const router = express.Router();
router.post("/register",  registerAdmin);
router.post("/login",loginuser);
router.post("/add", auth, regi_user); // Only admin can add users
// router.post("/change-password", auth, changePassword);

router.get("/getusers", auth,  getuser); //  Only admin can get users
router.get("/getById/:_id", auth, getbyId);
router.put("/update/:_id", auth, Update);
router.delete("/delete/:_id", auth, Delete);

module.exports = router;
