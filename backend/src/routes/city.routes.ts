import { Router } from "express";
import {
  createCityController,
  deleteCityController,
  getAllCitiesController,
  getSingleCityController,
  updateCityController,
} from "../controllers/city-controllers";

const router = Router();

router.route("/").post(createCityController).get(getAllCitiesController);

router
  .route("/:id")
  .get(getSingleCityController)
  .patch(updateCityController)
  .delete(deleteCityController);

export default router;
