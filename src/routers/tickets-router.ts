import { verifyTicketsFromUser } from '@/controllers/tickets-controller';
import { authenticateToken } from '@/middlewares';
import { enrollmentVerify } from '@/middlewares/enrollments-middleware';
import { Router } from 'express';

const ticketsRouter = Router();

ticketsRouter.all("/*", authenticateToken);
ticketsRouter.get("/", enrollmentVerify, verifyTicketsFromUser);
ticketsRouter.get("/types");
ticketsRouter.post("/");

export { ticketsRouter };
