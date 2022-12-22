import express from "express";

import mongodbConnection from "./database/mongodb-settings";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async () => {
    mongodbConnection;
    console.log("MongoDB connection established");
})();

app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}`));
