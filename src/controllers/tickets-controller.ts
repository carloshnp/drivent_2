import { AuthenticatedRequest } from '@/middlewares';
import { Ticket } from '@prisma/client';
import httpStatus from 'http-status';

export async function verifyTicketsFromUser(req: AuthenticatedRequest, res: Response): Promise<Response<Ticket>> {
  const id = req.userId;
  try {
    const ticket = 'ticket';
    return res.sendStatus(httpStatus.OK).send(ticket);
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
