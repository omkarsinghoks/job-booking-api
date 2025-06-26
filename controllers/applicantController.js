const Applicant = require('../models/applicantModel'); // Adjust the path as necessary
const Job = require('../models/jobModel'); // Adjust the path as necessary 


async function createApplicant(req,res) {
  try {
     
     const{user,job, resumeUrl,coverletter}=req.body;
      if (!user || !job || !resumeUrl) {
        return res.status(400).json({ message: "User, job, and resume URL are required" });
      }
        
      const existingApplicant = await Applicant.findOne({ user, job });
      if (existingApplicant) {
        return res.status(400).json({ message: "Applicant already exists for this job" });
      }
      const newApplicant = await Applicant.create({
        user,
        job,
        resumeUrl,
        coverLetter: coverletter,
      });
      const newApplicant1 = await Applicant.findById(newApplicant._id)
  .populate('user', 'name email')
  .populate('job', 'title company');
        
      await Job.findByIdAndUpdate(
        job,
        {
          $push: { applicants: newApplicant._id },
        },
        { new: true }
      );

      res.status(201).json({
        message: "Applicant created successfully",
        applicant: newApplicant1,
      });
  } catch (error) {
    console.error("Error creating applicant:", error);
    res.status(500).json({ message: `Internal server error: ${error.message}` });
    
  }
  
}


async function getApplicantById(req, res) {
  try {
    console.log("Fetching applicant with ID:", req.params.id);
    const applicantId = req.params.id;
    const applicant = await Applicant.find({user:applicantId})
      .populate('user', 'name email')
      .populate('job', 'title company');

    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    res.status(200).json({
      message: "Applicant fetched successfully",
      applicant,
    });
  } catch (error) {
    console.error("Error fetching applicant:", error);
    res.status(500).json({ message: `Internal server error: ${error.message}` });
  }
}



module.exports={
  createApplicant,
  getApplicantById,
}


