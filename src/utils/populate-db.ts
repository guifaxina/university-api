import axios from "axios";
import { InsertUnis } from "../controllers/universities-controller";

class PopulateDatabase {

  private apiURL = "http://universities.hipolabs.com";

  private countries = ["brazil", "argentina", "chile"];

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

export default new PopulateDatabase;