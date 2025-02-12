import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest.js";

describe("TicketTypeRequest", () => {
  describe("constructor", () => {
    test("should create instance with valid ticket type and number", () => {
      const request = new TicketTypeRequest("ADULT", 1);
      expect(request.getTicketType()).toBe("ADULT");
      expect(request.getNoOfTickets()).toBe(1);
    });

    test("should throw error for invalid ticket type", () => {
      expect(() => {
        new TicketTypeRequest("INVALID", 1);
      }).toThrow(TypeError);
    });

    test("should throw error for non-integer ticket number", () => {
      expect(() => {
        new TicketTypeRequest("ADULT", 1.5);
      }).toThrow(TypeError);
    });
  });
});
