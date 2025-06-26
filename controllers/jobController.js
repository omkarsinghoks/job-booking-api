 const Job = require("../models/jobModel");
const Applicant = require("../models/applicantModel");



async function jobRegisterHandler(req, res) {
  try {
    console.log("req.user.id", req.user.id);
    console.log("req.body", req.body);
    const { title, description, company, location, salary, jobType, requirements, responsibilities } = req.body;
    if (!title || !description || !company || !location || !salary) {
      return res.status(400).json({
        message: "something is missing",
      });
    }

    const existingJob = await Job.findOne({ title, company: company });
    if (existingJob) {
      return res.status(400).json({ message: "Job already exists" });
    }

    const newJob = await Job.create({
      title,
      description,
      company,
      location,
      salary,
      jobType,
      requirements,
      responsibilities,
      postedBy: req.user.id
    });

    res.status(200).json({
      message: "Job registered successfully",
      job: newJob,
    });
  } catch (error) {
    console.error("Error in job registration:", error);
    res.status(500).json({ message: `Internal server error: ${error.message}` });
  }
}

async function getAllJobsHandler(req, res) {
  try {
    const jobs = await Job.find().populate("company", "name logoUrl");
    res.status(200).json({
      message: "Jobs fetched successfully",
      jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: `Internal server error: ${error.message}` });
  }
}

async function getJobByIdHandler(req, res) {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate("company", "name logoUrl");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    const applicantCountNumber=await Applicant.countDocuments({ job: jobId });
    console.log("applicantCountNumber", applicantCountNumber);
    const applicantNo = await Job.findById(jobId);
const applicantsArray = applicantNo.applicants;

console.log("Applicants Array:", applicantsArray);

    // console.log("applicantNo", applicantNo);
    

    // const applicantArray=await Applicant.findById({jobId}).populate("applicant", "name email phone resumeUrl");
         
    
    res.status(200).json({
      message: "Job fetched successfully",
      job,
      "applicant Number" :applicantCountNumber
    });
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ message: `Internal server error: ${error.message}` });
  }
}

async function updateJobHandler(req, res) {
  try {
    const jobId = req.params.id;
    const { title, description, company, location, salary } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    job.title = title || job.title;
    job.description = description || job.description;
    job.company = company || job.company;
    job.location = location || job.location;
    job.salary = salary || job.salary;

    await job.save();

    res.status(200).json({
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ message: `Internal server error: ${error.message}` });
  }
}

async function deleteJobHandler(req, res) {
  try {
    const jobId = req.params.id;
    const job = await Job.findByIdAndDelete(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    // deletion og aalaplicant fron applicant model
     await Applicant.deleteMany({ job: jobId });
    res.status(200).json({
      message: "Job deleted successfully",
      job,
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: `Internal server error: ${error.message}` });
  }
}

module.exports = {
  jobRegisterHandler,
  getAllJobsHandler,
  getJobByIdHandler,
  updateJobHandler,
  deleteJobHandler,
};