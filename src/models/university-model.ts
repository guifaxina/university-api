import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
  alpha_two_code: { 
    type: String, 
    required: true
  }, 
  
  name: { 
    type: String, 
    required: true
  },
  
  web_pages: [{ 
    type: String, 
    required: true 
  }],
  
  "state-province": { 
    type: String || null, 
    required: true
  },
  
  domains: [{ 
    type: String || null, 
    required: true
  }],
  
  country: { 
    type: String,
    required: true, 
    lowercase: true 
  }
});

const UniversityModel = mongoose.model("University", universitySchema);

export default UniversityModel;