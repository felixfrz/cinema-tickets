import TicketService from "../src/pairtest/TicketService.js";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest.js";
import InvalidPurchaseException from "../src/pairtest/lib/InvalidPurchaseException.js";
describe("TicketService", () => {
  let ticketService;
  beforeEach(() => {
    ticketService = new TicketService();
  });
  describe("purchaseTickets", () => {
    // Valid purchase scenarios
    test("should successfully purchase valid ticket combination", () => {
      const result = ticketService.purchaseTickets(
        1,
        new TicketTypeRequest("ADULT", 2),
        new TicketTypeRequest("CHILD", 1),
        new TicketTypeRequest("INFANT", 1)
      );
      expect(result.success).toBe(true);
      expect(result.totalAmount).toBe(65); // 2 adults (50) + 1 child (15)
      expect(result.seatsAllocated).toBe(3); // 2 adults + 1 child
    });
    test("should successfully purchase adult tickets only", () => {
      const result = ticketService.purchaseTickets(
        1,
        new TicketTypeRequest("ADULT", 2)
      );
      expect(result.success).toBe(true);
      expect(result.totalAmount).toBe(50);
      expect(result.seatsAllocated).toBe(2);
    });
    // Invalid account ID tests
    test("should reject purchase with invalid account ID", () => {
      expect(() => {
        ticketService.purchaseTickets(0, new TicketTypeRequest("ADULT", 1));
      }).toThrow(InvalidPurchaseException);
      expect(() => {
        ticketService.purchaseTickets(-1, new TicketTypeRequest("ADULT", 1));
      }).toThrow(InvalidPurchaseException);
    });
    // Maximum tickets rule tests
    test("should reject purchase exceeding maximum tickets", () => {
      expect(() => {
        ticketService.purchaseTickets(1, new TicketTypeRequest("ADULT", 26));
      }).toThrow(InvalidPurchaseException);
    });
    // Adult ticket requirement tests
    test("should reject child tickets without adult ticket", () => {
      expect(() => {
        ticketService.purchaseTickets(1, new TicketTypeRequest("CHILD", 1));
      }).toThrow(InvalidPurchaseException);
    });
    test("should reject infant tickets without adult ticket", () => {
      expect(() => {
        ticketService.purchaseTickets(1, new TicketTypeRequest("INFANT", 1));
      }).toThrow(InvalidPurchaseException);
    });
      
      
  });
});
