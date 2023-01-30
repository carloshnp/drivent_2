import { postTicket, verifyTicketsFromUser } from '@/controllers/tickets-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import { enrollmentVerify } from '@/middlewares/enrollments-middleware';
import { ticketTypeSchema } from '@/schemas/tickets-schemas';
import { Router } from 'express';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken);
ticketsRouter.get('/', enrollmentVerify, verifyTicketsFromUser);
ticketsRouter.get('/types');
ticketsRouter.post('/', validateBody(ticketTypeSchema), enrollmentVerify, postTicket);

export { ticketsRouter };
