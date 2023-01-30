import { notFoundError } from '@/errors';
import paymentRepository from '@/repositories/payment-repository';
import ticketsRepository from '@/repositories/ticket-repository';
import {PaymentType} from '@/schemas/payments-schema';

export async function getTicketPayment(userId: number, ticketId: number) {
  const ticket = await ticketsRepository.findTicketById(ticketId);
  if (!ticket) {
    throw notFoundError();
  }
  if (ticket.Enrollment.User.id !== userId) {
    throw new Error('UNAUTHORIZED');
  }
  return await paymentRepository.getPaymentByTicketId(ticketId); 
}

export async function ticketPayment(payment: PaymentType) {
  const value = (await ticketsRepository.findTicketById(payment.ticketId)).TicketType.price;
  const { ticketId, cardData } = payment;
  const paymentData = {
    ticketId,
    value,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().slice(-4),
    createdAt: new Date(),
    updatedAt: new Date()
  }
  const paymentOperation = await paymentRepository.postTicketPayment(paymentData);
  await paymentRepository.paidTicket(paymentOperation)
  return paymentOperation; 
} 
