import TicketService from "./src/pairtest/TicketService.js";
import TicketTypeRequest from "./src/pairtest/lib/TicketTypeRequest.js";

// Test function to demostrate usage
const purchaseTicketsDemo = () => {
  const ticketService = new TicketService();

  try {
    // Example 1: Valid purchase
    const result = ticketService.purchaseTickets(
      1, // accountId
      new TicketTypeRequest("ADULT", 1),
      new TicketTypeRequest("CHILD", 1),
      new TicketTypeRequest("INFANT", 1)
    );
    // Example 2: Invalid purchase exceed max number of seat
    // const result1 = ticketService.purchaseTickets(
    //   1, // accountId
    //   new TicketTypeRequest("ADULT", 25),
    //   new TicketTypeRequest("CHILD", 1),
    //   new TicketTypeRequest("INFANT", 1)
    // );
    // Example 3: Invalid purchase (no adult ticket)
    // const result2 = ticketService.purchaseTickets(
    //   1,
    //   new TicketTypeRequest("CHILD", 1)
    // );

    console.log("Success! Purchase details:", result);
  } catch (error) {
    console.log("Error", error.message);
  }
};

// Run the demo
purchaseTicketsDemo();
