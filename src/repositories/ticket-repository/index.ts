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

function postTicket(enrollmentId: number, ticketTypeId: number) {
  const data = prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: 'RESERVED',
    },
    include: {
      TicketType: true
    }
  });
  return data;
}

function findTicketById(id: number) {
  const data = prisma.ticket.findFirst({
    where: { id },
    include: {
      Enrollment: {
        include: {
          User: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });
  return data;
}

function findAllTypes() {
  return prisma.ticketType.findMany();
}

const ticketsRepository = {
  findTicketsByUserId,
  getEnrollmentByUserId,
  postTicket,
  findTicketById,
  findAllTypes
};

export default ticketsRepository;
