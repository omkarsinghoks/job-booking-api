const User=require('./userModel');
const mongoose=require('mongoose');
const companySchema=new mongoose.Schema({
  name:
  {
    type:String,
    required:true,
    unique:true
  },
  description:String,
  logoUrl:{
    type:String,
    default:'https://www.gravatar.com/avatar/'
  },
  addedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
})

const Company=mongoose.model('Company',companySchema);
module.exports=Company;

