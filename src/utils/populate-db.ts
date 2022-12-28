import axios from "axios";
import UniversityModel from "../models/university-model";
import IUniversity from "../interfaces/university";

class PopulateDatabase {

  private apiURL = "http://universities.hipolabs.com";

  private countries = ["suriname"];

  private insertUnis = new InsertUnis();

  public async populate (): Promise<void> {
    for (const country of this.countries) {
      
      const response = await axios.get(`${this.apiURL}/search?country=${country}`);
      
      for (const unis of response.data) {
        this.insertUnis.insert(unis);
      } 
    }
  }
}

export class InsertUnis {
  public async insert (uni: IUniversity): Promise<unknown> {
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

export default new PopulateDatabase;