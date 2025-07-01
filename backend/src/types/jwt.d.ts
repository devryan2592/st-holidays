import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

declare module "jsonwebtoken" {
  export interface JwtPayload {
    userId: string;
    email: string;
  }
}
