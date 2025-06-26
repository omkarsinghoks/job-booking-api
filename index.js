const connectDB = require("./config/connectDB");
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicantRoutes = require("./routes/applicantRoutes");
const auth = require("./middleware/auth");
const cors = require("cors");


const app = express();

const port = 3000;
app.use(cors());
app.use(express.json());
connectDB();

app.use('/api/user', userRoutes);
app.use('/api/company', auth ,companyRoutes);
app.use('/api/job', auth ,jobRoutes);
app.use('/api/applicant', auth ,applicantRoutes);

app.listen(port, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT || port}`
  );
});
