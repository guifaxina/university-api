import mongodbConnection from "./databases/mongodb-settings";
import { app } from "./utils/server";
import populateDb from "./routes/populate-db";

const PORT = process.env.PORT || 3000;

(async () => {
  mongodbConnection();
  populateDb.populate();
})();

const server = app.listen(PORT, async () => console.log(`Server running http://localhost:${PORT}`));