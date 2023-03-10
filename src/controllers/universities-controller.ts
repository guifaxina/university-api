import { Request, Response } from "express";
import IUniversity from "../interfaces/university";
import UniversityModel from "../models/university-model";

class UniversityController {
  public async listUniversities(req: Request, res: Response): Promise<Response | void> {
    const { search } = req.query;
    const offset = Number(req.query.offset) || 5;
    const page = Number(req.query.page) - 1 || 0;
    const projection = "_id name country state-province";

    if (!search) {
      try {
        const findAllUniversities = await UniversityModel.find({}, projection).skip(page * offset).limit(offset);
        
        if (findAllUniversities.length !== 0)
          return res.status(200).json({ status: "success", message: "Successfully retrieved all universities", data: findAllUniversities });
        
        else 
          return res.status(404).json({ status: "error", message: "No universities were found." });
      } catch (error) {
        if (error instanceof Error) 
          return res.send(500).json({ status: "error", name: error.name, message: error.message });
      }
    } 
    
    try {
      const findUniversitiesFrom = await UniversityModel.find({ country: search }, projection).skip(page * offset).limit(offset);

      if (findUniversitiesFrom.length !== 0) 
        return res.status(200).json({ status: "success", message: `Successfully found all universities from ${search}.`, data: findUniversitiesFrom });
    
      else 
        return res.status(404).json({ status: "failed", message: "Error, country not found." });
    } catch (error) {
      if (error instanceof Error) 
        return res.send(500).json({ status: "error", name: error.name, message: error.message });
    }
  }

  public async listUniversityById(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;
    
    try {
      const response = await UniversityModel.findById(id);
      if (response) 
        return res.status(200).json({ status: "success", message: "Successfully found university.", data: response }); 
    
      else 
        return res.status(404).json({ status: "error", message: "University not found."});
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "CastError")
          return res.status(400).json({ status: "Error", name: error.name, message: error.message, description: "Expected a valid id." });
        else 
          return res.status(500).json({ status: "error", message: "Oops something went wrong!"});
      }
    }
  }

  public async registerUniversity(req: Request, res: Response): Promise<Response | void> {
    const insertUnis = new InsertUnis();
    const university: IUniversity = req.body.data;
    
    try {
      const response = await insertUnis.insert(university);
      if (response)
        return res.status(201).json({ status: "success", message: "Successfully registered new university.", data: response });
    } catch (error) {
      if (error instanceof Error)
        return res.status(500).json({ status: "error", name: error.name, message: error.message });
    }
  }

  public async updateUniversity(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;
    const { web_pages, name, domains } = req.body;
    
    try {
      const response = await UniversityModel.findByIdAndUpdate(id, { web_pages, name, domains }, { new: true });
      if (response) 
        return res.status(200).json({ status: "success", message: "University updated.", data: response });
      
      else 
        return res.status(404).json({ status: "error", message: "University not found." });
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "CastError") 
          return res.status(400).json({ status: "error", name: error.name, message: error.message, description: "Check syntax and types and try again." });
        
        else 
          return res.status(500).json({ status: "error", name: error.name, message: error.message });
      }
    }
  }

  public async deleteUniversity(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;

    try {
      const response = await UniversityModel.findByIdAndDelete(id, { new: true });
    
      if (response) 
        return res.status(200).json({ status: "success", message: "Successfully deleted University.", data: response });
    
      if (response === null)
        return res.status(404).json({ status: "error", message: "University does not exist."});
    } catch (error) {
      if (error instanceof Error)
        return res.status(500).json({ status: "error", name: error.name, message: error.message });
    }
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