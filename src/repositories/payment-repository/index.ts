import { prisma } from '@/config';
import {Payment} from '@prisma/client';

async function getPaymentByTicketId(ticketId: number) {
  const data = prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
  return data;
}

async function postTicketPayment(payment: Omit<Payment, "id">) {
  const { ticketId, value, cardIssuer, cardLastDigits, createdAt, updatedAt } = payment;
  const data = prisma.payment.create({
    data: {
      ticketId,
      value,
      cardIssuer,
      cardLastDigits,
      createdAt,
      updatedAt
    }
  });
  return data;
}

async function paidTicket(payment: Omit<Payment, "id">) {
  const data = prisma.ticket.update({
    where: {
      id: payment.ticketId,
    },
    data: {
      status: "PAID",
      updatedAt: new Date()
    }
  });
  return data;
}

const paymentRepository = {
  getPaymentByTicketId,
  postTicketPayment,
  paidTicket
};

export default paymentRepository;
