const express = require('express');
const cors = require('cors');
const mongoose = require ('mongoose');
const jwt = require('jsonwebtoken');
const secret = 'your-secret-key';
const refreshSecret = 'your-refresh-secret-key';

// mongoose.connect("mongodb://127.0.0.1:27017/ERP_project");
mongoose.connect("mongodb://127.0.0.1:27017/ERP_System");
// mongoose.connect("mongodb+srv://Bhagyashri:55555@cluster1.uupr7.mongodb.net/ERP_System");
const app = express();
const technology_Route = require('./Technology/technology_Route');
const university_Route = require('./University/university_Route');
const college_Route = require('./College/college_Route');
const city_Route = require('./City/city_Route');
const course_Route =require('./Courses/courses_Route');
const guestlecturer_Route = require('./Guest_lecturer/guestlecturer_Route');    
const office_Route = require('./Office/office_Route');
const education_Route = require('./Education/education_Route');
const office_City_Route = require('./Office_City/office_City_Route'); 
const welcomekit_Route = require('./Welcomekit/welcomekit_Route');
const feedback_Route = require('./Feedback/feedback_Route');
const project_Route = require('./Project/project_Route');
const user_Route = require ('./Users/user_Route');
const enquiryStudent_Route = require('./Enquiry_Student/enquiryStudent_Route');
const admissionFees_Route = require('./Admission_Fees/admissionFees_Route');
const kit_Feespaid_Route = require('./Kit_FeesPaid/kit_Feespaid_Route');
const duration_Route = require('./Duration/duration_Route');
const batch_Route = require('./Batch/batch_Route');
const admin_Route = require('./Admin/admin_Route');


app.use(express.json())
app.use(cors());

app.use('/', technology_Route);
app.use('/', university_Route);
app.use('/', college_Route);
app.use('/', city_Route);
app.use('/', course_Route);
app.use('/', guestlecturer_Route);
app.use('/', office_Route);
app.use('/', education_Route);
app.use('/', office_City_Route);
app.use('/', welcomekit_Route);
app.use('/', feedback_Route);
app.use('/', project_Route);
app.use('/', user_Route);
app.use('/', enquiryStudent_Route);
app.use('/', admissionFees_Route);
app.use('/', kit_Feespaid_Route);
app.use('/', duration_Route);
app.use('/', batch_Route);
app.use('/', admin_Route);

  // Refresh token endpoint
  app.post('/refresh-token', (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: 'Refresh token missing' });
  
    jwt.verify(refreshToken, refreshSecret, (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid refresh token' });
  
      const newAccessToken = jwt.sign({ email: user.email, id: user.id }, secret, { expiresIn: '1h' });
      res.json({ accessToken: newAccessToken });
    });
  });

app.get(('/'),(req,res) =>
    res.send("database canected ERP Project"));

app.listen(8000, () => {
    console.log(`app listening on port 8000`)
})
