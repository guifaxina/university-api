import { Router } from "express";
import UniversityController from "../controllers/universities-controller";
import UniversityModel from "../models/university-model";

const router = Router();

router.get("/universities", UniversityController.listUniversities);
router.get("/universities/:id", UniversityController.listUniversityById);
router.post("/universities", UniversityController.registerUniversity);
router.put("/universities/:id", UniversityController.updateUniversity);

router.delete("/delete", async (req, res) => {
  const response = await UniversityModel.deleteMany({ alpha_two_code: "BR" });

  res.status(200).json({ message: "deleted successfully", data: response });
});

export default router;