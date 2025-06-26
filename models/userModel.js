require('dotenv').config();
const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
   username:{
    type:String,
    required:true,
   },
    email:{
      type:String,
      required:true,
      unique:true
    },
    password:{
      type:String,
      required:true
    },
    role:{
      type:String,
      enum:['student','recruiter','admin'],
      default:'student'
    },
    profileUrl:{
      type:String,
      default:'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
    },
    Bio:
     {
      type:String,
      default:''
    },
    resumeUrl:
    {
      type:String,
      default:''
    },
    collegeName:{
      type:String,
      default:''
    },
    skills: [{
      type: String
    }],
    experience:
    {
      type:String,
      default:''
    },
    contactNumber:{
      type:String,
      default:''
    },

},{
  timestamps:true
})
const User=mongoose.model('User',userSchema);
module.exports=User;