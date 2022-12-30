import mongodbConnection from "./databases/mongodb-settings";
import app from "./utils/server";
import populateDb from "./utils/populate-db";

const PORT = process.env.PORT || 3000;

(async () => {
  mongodbConnection();
  populateDb.populate();
})();

app.listen(PORT, async () => console.log(`Server running http://localhost:${PORT}`));