import { prisma } from "@/config";

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

const ticketsRepository = {
  findTicketsByUserId,
};

export default ticketsRepository;
