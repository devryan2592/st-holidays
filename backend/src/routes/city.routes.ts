import { Router } from "express";
import {
  createCityController,
  deleteCityController,
  getAllCitiesController,
  getCityByIdController,
  updateCityController,
} from "../controllers/city.controller";
import { authMiddleware } from "@/middlewares/auth-middleware";

const router = Router();

router
  .route("/")
  .post(authMiddleware, createCityController)
  .get(getAllCitiesController);

router
  .route("/:id")
  .get(getCityByIdController)
  .patch(authMiddleware, updateCityController)
  .delete(authMiddleware, deleteCityController);

export default router;
