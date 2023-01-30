import { getPayment, postPayment } from '@/controllers/payments-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import {PaymentSchema} from '@/schemas/payments-schema';
import { Router } from 'express';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken);
paymentsRouter.get('/', getPayment);
paymentsRouter.post('/process', postPayment);

export { paymentsRouter };
