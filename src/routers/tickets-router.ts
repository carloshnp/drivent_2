import {authenticateToken} from "@/middlewares";
import { Router } from "express"; 

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/")
  .get("/types")
  .post("/");

export { ticketsRouter };
