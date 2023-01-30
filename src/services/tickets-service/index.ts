import ticketsRepository from '@/repositories/ticket-repository';
import { Ticket } from '@prisma/client';
import enrollmentsService from '../enrollments-service';

async function verifyTicketFromUser(id: number) {
  const ticket = await ticketsRepository.findTicketsByUserId(id);
  if (!ticket) {
    throw new Error('NOT_FOUND');
  }
  return ticket;
}

async function postTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);
  const ticket = await ticketsRepository.postTicket(enrollment.id, ticketTypeId);
  return ticket;
}

async function getAllTicketTypes() {
  const ticketTypes = await ticketsRepository.findAllTypes();
  return ticketTypes;
}

const ticketsService = {
  verifyTicketFromUser,
  postTicket,
  getAllTicketTypes
};

export default ticketsService;
