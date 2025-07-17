import { Router } from "express";
import {
  createDestinationController,
  deleteDestinationController,
  getAllDestinationsController,
  getSingleDestinationController,
  updateDestinationController,
} from "../controllers/destination-controllers";

const router = Router();

router
  .route("/")
  .get(getAllDestinationsController)
  .post(createDestinationController);

router
  .route("/:id")
  .get(getSingleDestinationController)
  .patch(updateDestinationController)
  .delete(deleteDestinationController);

export default router;
