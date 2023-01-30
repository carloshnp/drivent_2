import { Response, Request } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';
import { Ticket } from '@prisma/client';
import httpStatus from 'http-status';

export async function verifyTicketsFromUser(req: AuthenticatedRequest, res: Response) {
  const id = req.userId;
  try {
    const ticket = await ticketsService.verifyTicketFromUser(id);
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.NO_CONTENT).send(error);
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req
  const { ticketTypeId } = req.body as {ticketTypeId: number}
  if (!ticketTypeId) {
    return res.sendStatus(httpStatus.BAD_REQUEST)
  }
  try {
    const ticket = await "postTicket" 
    return res.status(httpStatus.CREATED).send(ticket)
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND)
  }
}
