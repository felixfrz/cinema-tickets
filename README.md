# Cinema Tickets

A ticket booking service implementation that handles the purchase of tickets for a cinema, following specific business rules and constraints.

## Project Structure

## Business Rules

1. Ticket Types and Pricing:
   - Adult Ticket: £25
   - Child Ticket: £15
   - Infant Ticket: £0 (free)
2. Purchase Constraints:
   - Maximum 25 tickets per purchase
   - Child and Infant tickets cannot be purchased without an Adult ticket
   - Infants don't require a seat (sit on an Adult's lap)
   - Each infant must be accompanied by an Adult

## Technical Implementation

### Core Components

1. **TicketTypeRequest**
   - Immutable object for ticket requests
   - Validates ticket type and quantity
   - Private fields for type and number of tickets
2. **TicketService**
   - Handles ticket purchase logic
   - Validates purchase requests
   - Calculates total amounts
   - Manages seat allocation
   - Integrates with payment and reservation services
3. **External Services**
   - TicketPaymentService: Handles payment processing
   - SeatReservationService: Manages seat reservations

### Development Workflow (TDD Approach)

1. **Initial Setup**

```bash
 npm init npm install --save-dev jest
```

2. **Test-Driven Development Cycles**
   a. TicketTypeRequest:
   - Write tests for ticket type validation
   - Implement ticket type validation
   - Write tests for quantity validation
   - Implement quantity validation
     b. TicketService:
   - Write tests for purchase validation
   - Implement purchase validation
   - Write tests for price calculation
   - Implement price calculation
   - Write tests for seat allocation
   - Implement seat allocation
3. **Integration**
   - Integrate with payment service
   - Integrate with seat reservation service
   - Add comprehensive error handling

## Running the Project

1. **Installation**

```bash
 npm install
```

2. **Running Tests**

```bash
 npm test
```

3. **Running Demo**

```bash
npm start
```

## Testing Strategy

1. **Unit Tests**
   - TicketTypeRequest validation
   - Price calculations
   - Seat allocation logic
   - Business rule enforcement
2. **Integration Tests**
   - Payment service integration
   - Seat reservation integration
3. **Test Scenarios**
   - Valid purchase combinations
   - Invalid purchase attempts
   - Business rule violations

## Error Handling

The service handles various error scenarios: - Invalid account IDs - Invalid ticket quantities - Business rule violations - Missing adult tickets - Exceeded maximum tickets - Invalid infant-adult ratios

## Code Quality Measures

1. **Immutability**

- TicketTypeRequest is immutable
- Private fields using # prefix
- Frozen objects where appropriate

2. **Encapsulation**
   - Private methods for internal logic
   - Clear separation of concerns
   - Protected internal state
3. **Clean Code Practices**
   - Meaningful variable names
   - Single responsibility principle
   - Comprehensive error messages
   - Clear code organization
