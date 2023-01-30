import { invalidDataError } from '@/errors';
import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import { getTicketPayment, ticketPayment } from '@/services/payments-service';
import httpStatus from 'http-status';

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const ticketId = req.query.ticketId as string;
  const userId = req.userId as number;
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
  const userId = req.userId as number;
  const payment = req.body;
  console.log(payment)
  try {
    const ticketPaid = await ticketPayment(payment, userId);
    res.status(httpStatus.OK).send(ticketPaid);
  } catch (error) {
    if (error.message === "UNAUTHORIZED") {
      return res.sendStatus(httpStatus.UNAUTHORIZED)
    }
    if (error.message === "NOT_FOUND") {
      return res.sendStatus(httpStatus.NOT_FOUND)
    }
    res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
