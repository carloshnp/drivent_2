import { notFoundError } from '@/errors';
import paymentRepository from '@/repositories/payment-repository';
import ticketsRepository from '@/repositories/ticket-repository';

export async function getTicketPayment(userId: number, ticketId: number) {
  const ticket = await ticketsRepository.findTicketById(ticketId);
  if (!ticket) {
    throw notFoundError();
  }
  if (ticket.Enrollment.User.id !== userId) {
    throw new Error('Forbidden');
  }
  return await paymentRepository.getPaymentByTicketId(ticketId);
}
