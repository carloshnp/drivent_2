import ticketsRepository from '@/repositories/ticket-repository';
import { Ticket } from '@prisma/client';

async function verifyTicketFromUser(id: number) {
  const ticket = await ticketsRepository.findTicketsByUserId(id);
  if (!ticket) {
    throw new Error('NOT_FOUND');
  }
  return ticket;
}

const ticketsService = {
  verifyTicketFromUser,
};

export default ticketsService;
