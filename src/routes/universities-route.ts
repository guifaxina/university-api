import { Router } from "express";
import UniversityController from "../controller/universities-controller";
import UniversityModel from "../models/university-model";

const router = Router();

router.get("/universities", UniversityController.listUniversities);
router.get("/universities/:id", UniversityController.listUniversitiesById);
router.post("/universities", UniversityController.registerUniversity);

router.delete("/delete", async (req, res) => {
  const response = await UniversityModel.deleteMany({ alpha_two_code: "SR" });

  res.status(200).json({ message: "deleted successfully", data: response });
});

export default router;