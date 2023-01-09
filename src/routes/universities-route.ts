import { Router } from "express";
import UniversityController from "../controllers/universities-controller";
import UniversityModel from "../models/university-model";

const router = Router();

router.get("/universities", UniversityController.listUniversities);
router.get("/universities/:id", UniversityController.listUniversityById);

router.post("/universities", UniversityController.registerUniversity);

router.put("/universities/:id", UniversityController.updateUniversity);

router.delete("/universities/:id", UniversityController.deleteUniversity);

export default router;