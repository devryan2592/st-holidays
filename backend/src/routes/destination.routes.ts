import { Router } from "express";
import {
  createDestinationController,
  deleteDestinationController,
  getAllDestinationsController,
  getDestinationByIdController,
  updateDestinationController,
} from "../controllers/destination.controller";
import { authMiddleware } from "@/middlewares/auth-middleware";

const router = Router();

router
  .route("/")
  .get(getAllDestinationsController)
  .post(authMiddleware, createDestinationController);

router
  .route("/:id")
  .get(getDestinationByIdController)
  .patch(authMiddleware, updateDestinationController)
  .delete(authMiddleware, deleteDestinationController);

export default router;
