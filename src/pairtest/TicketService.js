import TicketTypeRequest from "./lib/TicketTypeRequest.js";
import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";
import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js";

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */
  #paymentService;
  #reservationService;
  #TICKET_PRICE = {
    INFANT: 0,
    CHILD: 15,
    ADULT: 25,
  };
  #MAX_TICKETS = 25;

  constructor() {
    this.#paymentService = new TicketPaymentService();
    this.#reservationService = new SeatReservationService();
  }

  #validatePurchaseRequest(accountId, ticketRequests) {
    if (!Number.isInteger(accountId) || accountId <= 0) {
      throw new InvalidPurchaseException("Invalid account ID");
    }
    if (!ticketRequests || ticketRequests.length === 0) {
      throw new InvalidPurchaseException("No tickets requested");
    }
    const ticketCounts = { INFANT: 0, CHILD: 0, ADULT: 0 };
    // Count tickets by type
    ticketRequests.forEach((request) => {
      ticketCounts[request.getTicketType()] += request.getNoOfTickets();
    });
    // Check total tickets
    const totalTickets = Object.values(ticketCounts).reduce(
      (sum, count) => sum + count,
      0
    );
    if (totalTickets > this.#MAX_TICKETS) {
      throw new InvalidPurchaseException(
        `Cannot purchase more than ${this.#MAX_TICKETS} tickets`
      );
    }
    // Check for adult ticket requirement
    if (
      ticketCounts.ADULT === 0 &&
      (ticketCounts.CHILD > 0 || ticketCounts.INFANT > 0)
    ) {
      throw new InvalidPurchaseException(
        "Child and Infant tickets cannot be purchased without an Adult ticket"
      );
    }
    // Check if there are enough adults for infants
    if (ticketCounts.INFANT > ticketCounts.ADULT) {
      throw new InvalidPurchaseException(
        "Each infant must be accompanied by an adult"
      );
    }
    return ticketCounts;
  }
  #calculateTotalAmount(ticketCounts) {
    return Object.entries(ticketCounts).reduce((total, [type, count]) => {
      return total + this.#TICKET_PRICE[type] * count;
    }, 0);
  }
  #calculateSeatsToAllocate(ticketCounts) {
    // Infants don't need seats
    return ticketCounts.ADULT + ticketCounts.CHILD;
  }

  purchaseTickets(accountId, ...ticketTypeRequests) {
    // throws InvalidPurchaseException

    const ticketCounts = this.#validatePurchaseRequest(
      accountId,
      ticketRequests
    );
    const totalAmount = this.#calculateTotalAmount(ticketCounts);
    const seatsToAllocate = this.#calculateSeatsToAllocate(ticketCounts);

    // Process payment
    this.#paymentService.makePayment(accountId, totalAmount);

    // Reserve seats
    this.#reservationService.reserveSeat(accountId, seatsToAllocate);

    return {
      success: true,
      ticketCounts,
      totalAmount,
      seatsToAllocated: seatsToAllocate,
    };
  }
}
