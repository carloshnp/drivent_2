import { prisma } from '@/config';

async function getPaymentByTicketId(ticketId: number) {
  const data = prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
  return data;
}

const paymentRepository = {
  getPaymentByTicketId,
};

export default paymentRepository;
