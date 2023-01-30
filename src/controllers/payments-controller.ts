import { invalidDataError } from '@/errors';
import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import { getTicketPayment } from '@/services/payments-service';
import httpStatus from 'http-status';

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const ticketId = req.query.ticketId as string;
  const userId = res.locals.userId as number;
  if (!ticketId) {
    throw invalidDataError(['']);
  }
  const payment = await getTicketPayment(userId, parseInt(ticketId));
  return res.status(httpStatus.OK).send(payment);
}
