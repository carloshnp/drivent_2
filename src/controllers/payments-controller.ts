import { invalidDataError } from '@/errors';
import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import { getTicketPayment } from '@/services/payments-service';
import httpStatus from 'http-status';

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const ticketId = req.query.ticketId as string;
  const userId = res.locals.userId as number;
  if (!ticketId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  try {
    const payment = await getTicketPayment(userId, parseInt(ticketId));
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.message === "UNAUTHORIZED") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND); 
  }  
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const payment = req.body;
  try {
    const ticketPayment = await "ticketPayment"
    res.status(httpStatus.OK).send(ticketPayment);
  } catch (error) {
    res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
