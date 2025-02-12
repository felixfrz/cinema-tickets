import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import TicketPaymentService from '../thirdparty/paymentgateway/TicketPaymentService.js'
import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService.js'

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */
  #paymentService;
  #reservationService;
  #TICKET_PRICE = {
    INFANT: 0,
    CHILD: 15,
    ADULT:25
  }
  MAX_TICKETS = 25;

  constructor() {
    this.#paymentService = new TicketPaymentService();
    this.#reservationService = new SeatReservationService();
  }

  purchaseTickets(accountId, ...ticketTypeRequests) {
    // throws InvalidPurchaseException
  }
}
