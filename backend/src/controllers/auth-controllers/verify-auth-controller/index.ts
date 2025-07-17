import { Request, Response } from "express";
import { catchAsync } from "@/helpers/catch-async";
import { sendError, sendSuccess } from "@/helpers/api-response";
import { verifyAuthService } from "./service";
import { HTTP_STATUS } from "@/constants";

/**
 * @swagger
 * /api/v1/auth/verify:
 *   get:
 *     tags: [Authentication]
 *     summary: Verify authentication status
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User is authenticated
 *       401:
 *         description: Unauthorized
 */
export const verifyAuth = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user)
    return sendError(
      res,
      "Something went wrong. Please try again later",
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );

  const response = await verifyAuthService(user);

  return sendSuccess(res, "User is authenticated", response, HTTP_STATUS.OK);
});
