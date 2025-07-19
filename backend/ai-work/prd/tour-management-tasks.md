# Tour Management - Task List

This document outlines the tasks required to implement the CRUD operations for Tour Management based on the `create-tours-prd.md`.

## Relevant Files:

- <mcfile name="schema.prisma" path="backend/prisma/schema.prisma"></mcfile>
- <mcfolder name="destination-controllers" path="backend/src/controllers/destination-controllers/"></mcfolder> (as reference for controller structure)
- <mcfile name="create-tours-prd.md" path="backend/ai-work/prd/create-tours-prd.md"></mcfile>

## Task List:

- [ ] 1.0 Database Schema Implementation
  - [ ] 1.1 Verify `Tour` model in <mcfile name="schema.prisma" path="backend/prisma/schema.prisma"></mcfile> is correctly defined.
  - [ ] 1.2 Run Prisma migrations if any changes are made to the schema.
- [ ] 2.0 API Route Definition
  - [ ] 2.1 Create a new route file for tours (e.g., `backend/src/routes/tourRoutes.ts`).
  - [ ] 2.2 Define routes for:
    - `POST /api/v1/tours` (Create Tour)
    - `GET /api/v1/tours` (Get All Tours)
    - `GET /api/v1/tours/:id` (Get Single Tour)
    - `PATCH /api/v1/tours/:id` (Update Tour)
    - `DELETE /api/v1/tours/:id` (Delete Tour)
- [ ] 3.0 Controller Implementation
  - [ ] 3.1 Create a new controller file for tours (e.g., `backend/src/controllers/tourController.ts`).
  - [ ] 3.2 Implement `createTour` function:
    - [ ] 3.2.1 Validate request body using Zod schema.
    - [ ] 3.2.2 Generate slug if not provided.
    - [ ] 3.2.3 Check if `destinationId` is valid and exists.
    - [ ] 3.2.4 Use Prisma to create the new `Tour`.
  - [ ] 3.3 Implement `getAllTours` function:
    - [ ] 3.3.1 Implement filtering based on query parameters (`destinationId`, `cityId`, `minPrice`, `maxPrice`, `theme`, `packageType`).
    - [ ] 3.3.2 Implement pagination (`limit`, `offset`).
    - [ ] 3.3.3 Use Prisma to retrieve tours.
  - [ ] 3.4 Implement `getSingleTour` function:
    - [ ] 3.4.1 Retrieve tour by ID or slug.
    - [ ] 3.4.2 Use Prisma to retrieve the specific `Tour`.
    - [ ] 3.4.3 Handle 404 Not Found if tour does not exist.
  - [ ] 3.5 Implement `updateTour` function:
    - [ ] 3.5.1 Validate request body using Zod schema (partial update).
    - [ ] 3.5.2 Validate `id`.
    - [ ] 3.5.3 If `name` is provided, ensure uniqueness.
    - [ ] 3.5.4 If `destinationId` is provided, ensure validity.
    - [ ] 3.5.5 Use Prisma to update the `Tour`.
    - [ ] 3.5.6 Handle 404 Not Found if tour does not exist.
  - [ ] 3.6 Implement `deleteTour` function:
    - [ ] 3.6.1 Validate `id`.
    - [ ] 3.6.2 Use Prisma to delete the `Tour`.
    - [ ] 3.6.3 Handle 404 Not Found if tour does not exist.
- [ ] 4.0 Validation Schema Definition
  - [ ] 4.1 Create Zod schemas for `Tour` creation and update.
- [ ] 5.0 Error Handling
  - [ ] 5.1 Implement consistent error responses for all API endpoints.
  - [ ] 5.2 Handle database errors and validation errors gracefully.
- [ ] 6.0 Security
  - [ ] 6.1 Apply authentication middleware to all tour endpoints.
  - [ ] 6.2 Ensure proper input sanitization.
- [ ] 7.0 Documentation and Testing
  - [ ] 7.1 Add API documentation (e.g., Swagger/OpenAPI).
