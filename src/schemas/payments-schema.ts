import joi from 'joi'

export type PaymentType = {
  ticketId: number,
  cardData: {
    issuer: string,
    number: number,
    name: string,
    expirationDate: Date,
    cvv: number
  }
}

export const PaymentSchema = joi.object({
  ticketId: joi.number().required(),
  cardData: joi.object({
    issuer: joi.string().valid("VISA", "MASTERCARD").required(),
    number: joi.number().required(),
    name: joi.string().required(),
    expirationDate: joi.date().min("now").required(),
    cvv: joi.number().required()
  }).required()
});
