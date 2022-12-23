import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
  alpha_two_code: String,
  
  name: String,
  
  web_pages: [],
  
  "state-province": String || null,
  
  domains: [],
  
  country: String,
});

const UniversityModel = mongoose.model("University", universitySchema);

export default UniversityModel;