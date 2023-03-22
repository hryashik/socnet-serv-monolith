import { User } from "@prisma/client";
import { Request } from "express";

export interface IAuthorizedRequest extends Request {
  user: User
}