const express = require('express');
const cors = require('cors');
const mongoose = require ('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/ERP_System");
// mongoose.connect("mongodb+srv://Bhagyashri:55555@cluster1.uupr7.mongodb.net/ERP_System");
const app = express();
const technology_route = require('./Technology/technology_Route');
const university_route = require('./University/university_Route');
const college_route = require('./College/college_Route');
const city_route = require('./City/city_Route');
const office_route = require('./Office/office_Route');
const education_route = require('./Education/education_Route');
const office_city_route = require('./Office_City/office_City_Route');
const course_route =require('./Courses/course_Route');
const guest_lecturer_route = require('./Guest_lecturer/guestlecturer_Route');  
const fee_route = require('./Fees/fee_Route');  
const welcomekit = require('./Welcomekit/welcomekit_Route');  
const bde = require('./BDE/bde_Route');  
const hr = require('./HR/hr_Route');  
const trainer = require('./Trainer/trainer_Route');  
const user = require('./Users/user_Route');  
const feedback_route = require('./Feedback/feedback_Route');

app.use(express.json())
app.use(cors());

app.use('/', technology_route);
app.use('/', university_route);
app.use('/', college_route);
app.use('/',city_route);
app.use('/',office_route);
app.use('/',education_route);
app.use('/',office_city_route);
app.use('/',course_route);
app.use('/',guest_lecturer_route);
app.use('/',fee_route);
app.use('/',welcomekit);
app.use('/',bde);
app.use('/',hr);
app.use('/',trainer);
app.use('/',user);
app.use('/', feedback_route);

app.get(('/'),(req,res) =>
    res.send("Database connected to ERP System"));

app.listen(8000, () => {
    console.log(`app listening on port 8000`)
})
