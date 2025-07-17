import { Router } from "express";
import {
  createDestinationController,
  deleteDestinationController,
  getAllDestinationsController,
  getSingleDestinationController,
  updateDestinationController,
} from "../controllers/destination-controllers";
import { authMiddleware } from "@/middlewares/auth-middleware";

const router = Router();

router
  .route("/")
  .get(getAllDestinationsController)
  .post(authMiddleware, createDestinationController);

router
  .route("/:id")
  .get(getSingleDestinationController)
  .patch(authMiddleware, updateDestinationController)
  .delete(authMiddleware, deleteDestinationController);

export default router;
