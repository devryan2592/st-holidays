import { Router } from "express";
import {
  createCityController,
  deleteCityController,
  getAllCitiesController,
  getSingleCityController,
  updateCityController,
} from "../controllers/city-controllers";
import { authMiddleware } from "@/middlewares/auth-middleware";

const router = Router();

router
  .route("/")
  .post(authMiddleware, createCityController)
  .get(getAllCitiesController);

router
  .route("/:id")
  .get(getSingleCityController)
  .patch(authMiddleware, updateCityController)
  .delete(authMiddleware, deleteCityController);

export default router;
