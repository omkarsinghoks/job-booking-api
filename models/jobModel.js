const User=require('./userModel');
const Company=require('./companyModel');
const Applicant=require('./applicantModel');

const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Internship', 'Contract'],
    default: 'Full-time'
  },
  requirements: [String],
  responsibilities: [String],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  applicants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['Open', 'Closed'],
    default: 'Open'
  },
  Applicants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Applicant'
  }]
}, {
  timestamps: true
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;




