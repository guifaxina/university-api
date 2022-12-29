import { Request, Response } from "express";
import IUniversity from "../interfaces/university";
import UniversityModel from "../models/university-model";

class UniversityController {
  public async listUniversities(req: Request, res: Response): Promise<Response> {
    const { search } = req.query;
    const projection = "_id name country state-province";

    if (!search) {
      const findAllUniversities = await UniversityModel.find({}, projection);
      return res.status(200).json({ status: "success", message: "Successfully retrieved all universities", data: findAllUniversities });
    } 
    
    const findUniversitiesFrom = await UniversityModel.find({ country: search }, projection);
    if (findUniversitiesFrom.length !== 0) 
      return res.status(200).json({ status: "success", message: `Successfully found all universities from ${search}.`, data: findUniversitiesFrom });
    
    else 
      return res.status(404).json({ status: "failed", message: "Error, country not found." });
  }

  public async listUniversitiesById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    
    try {
      const response = await UniversityModel.findById(id);
      if (response) 
        return res.status(200).json({ status: "success", message: "Successfully found university.", data: response }); 
    
      else 
        return res.status(404).json({ status: "error", message: "University not found."});
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ status: "Error", name: error.name, message: error.message, description: "Expected a valid id." });
      }
    }
    return res.status(500).json({ status: "error", message: "Oops something went wrong!"});
  }

  public async registerUniversity(req: Request, res: Response): Promise<Response> {
    const insertUnis = new InsertUnis();
    const university: IUniversity = req.body.data;
    const response = await insertUnis.insert(university);
    
    return res.status(201).json({ status: "success", message: "Successfully registered new university.", data: response });
  }
}

export class InsertUnis {
  public async insert (uni: IUniversity): Promise<IUniversity> {
    const newUniversity = new UniversityModel({
      
      alpha_two_code: uni.alpha_two_code,
      
      name: uni.name,
      
      web_pages: uni.web_pages,
      
      "state-province": uni["state-province"],
      
      domains: uni.domains,
      
      country: uni.country
      
    });
    const response = await newUniversity.save();
    return response;
  }
}

export default new UniversityController();