import { Request, Response } from "express";
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
    if (findUniversitiesFrom.length !== 0) {
      return res.status(200).json({ status: "success", message: `Successfully found all universities from ${search}.`, data: findUniversitiesFrom });
    } else {
      return res.status(404).json({ status: "failed", message: "Error, country not found." });
    }
  }
}

export default new UniversityController();