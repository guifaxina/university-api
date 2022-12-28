import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
  alpha_two_code: { 
    type: String, 
    require: true
  }, 
  
  name: { 
    type: String, 
    require: true
  },
  
  web_pages: [{ 
    type: String, 
    required: true 
  }],
  
  "state-province": { 
    type: String || null, 
    require: true
  },
  
  domains: { 
    type: String || null, 
    require: true
  },
  
  country: { 
    type: String,
    require: true, 
    lowercase: true 
  }
});

const UniversityModel = mongoose.model("University", universitySchema);

export default UniversityModel;