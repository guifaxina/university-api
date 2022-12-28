import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
  alpha_two_code: String,
  
  name: String,
  
  web_pages: [{ type: String }],
  
  "state-province": String || null,
  
  domains: [{ type: String }],
  
  country: { type: String, lowercase: true }
});

const UniversityModel = mongoose.model("University", universitySchema);

export default UniversityModel;