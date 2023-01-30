import { prisma } from '@/config';

function findTicketsByUserId(id: number) {
  const data = prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId: id,
      },
    },
    include: {
      TicketType: true,
    },
  });
  return data;
}

function getEnrollmentByUserId(id: number) {
  const data = prisma.enrollment.findUnique({
    where: {
      userId: id,
    },
    select: {
      id: true,
    },
  });
  return data;
}

const ticketsRepository = {
  findTicketsByUserId,
};

export default ticketsRepository;
