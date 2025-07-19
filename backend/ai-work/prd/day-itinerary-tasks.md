# Day Itinerary Item Management - Task List

This document outlines the tasks required to implement the CRUD operations for Day Itinerary Items based on the `create-day-itinerary-prd.md`.

## Relevant Files:

- <mcfile name="schema.prisma" path="backend/prisma/schema.prisma"></mcfile>
- <mcfolder name="destination-controllers" path="backend/src/controllers/destination-controllers/"></mcfolder> (as reference for controller structure)
- <mcfile name="create-day-itinerary-prd.md" path="backend/ai-work/prd/create-day-itinerary-prd.md"></mcfile>

## Task List:

- [x] 1.0 Database Schema Implementation
  - [x] 1.1 Add `DayItineraryItem` model to <mcfile name="schema.prisma" path="backend/prisma/schema.prisma"></mcfile>
  - [x] 1.2 Add `Meals` enum to <mcfile name="schema.prisma" path="backend/prisma/schema.prisma"></mcfile>
  - [x] 1.3 Run Prisma migrations to update the database schema.
- [x] 2.0 API Route Definition
  - [x] 2.1 Create a new route file for day itinerary items (e.g., `backend/src/routes/dayItineraryRoutes.ts`).
  - [x] 2.2 Define routes for:
    - `POST /api/v1/tours/:tourId/itinerary` (Create)
    - `GET /api/v1/tours/:tourId/itinerary` (Get All for Tour)
    - `GET /api/v1/tours/:tourId/itinerary/:id` (Get Single)
    - `PATCH /api/v1/tours/:tourId/itinerary/:id` (Update)
    - `DELETE /api/v1/tours/:tourId/itinerary/:id` (Delete)
- [x] 3.0 Controller Implementation
  - [x] 3.1 Create a new controller file for day itinerary items (e.g., `backend/src/controllers/dayItineraryController.ts`).
  - [x] 3.2 Implement `createDayItineraryItem` function:
    - [x] 3.2.1 Validate request body using Zod schema.
    - [x] 3.2.2 Check if `tourId` is valid and exists.
    - [x] 3.2.3 Ensure `dayNumber` is unique for the given `tourId`.
    - [x] 3.2.4 Use Prisma to create the new `DayItineraryItem`.
  - [x] 3.3 Implement `getAllDayItineraryItemsForTour` function:
    - [x] 3.3.1 Validate `tourId`.
    - [x] 3.3.2 Use Prisma to retrieve all `DayItineraryItem` for the `tourId`, ordered by `dayNumber`.
  - [x] 3.4 Implement `getSingleDayItineraryItem` function:
    - [x] 3.4.1 Validate `tourId` and `id`.
    - [x] 3.4.2 Use Prisma to retrieve the specific `DayItineraryItem`.
    - [x] 3.4.3 Handle 404 Not Found if item does not exist.
  - [x] 3.5 Implement `updateDayItineraryItem` function:
    - [x] 3.5.1 Validate request body using Zod schema (partial update).
    - [x] 3.5.2 Validate `tourId` and `id`.
    - [x] 3.5.3 If `dayNumber` is provided, ensure uniqueness for the `tourId`.
    - [x] 3.5.4 Use Prisma to update the `DayItineraryItem`.
    - [x] 3.5.5 Handle 404 Not Found if item does not exist.
  - [x] 3.6 Implement `deleteDayItineraryItem` function:
    - [x] 3.6.1 Validate `tourId` and `id`.
    - [x] 3.6.2 Use Prisma to delete the `DayItineraryItem`.
    - [x] 3.6.3 Handle 404 Not Found if item does not exist.
- [x] 4.0 Validation Schema Definition
  - [x] 4.1 Create Zod schemas for `DayItineraryItem` creation and update (use the controller reference to understand how to creat the schema).
- [x] 5.0 Error Handling
  - [x] 5.1 Implement consistent error responses for all API endpoints.
  - [x] 5.2 Handle database errors and validation errors gracefully.
- [x] 6.0 Security
  - [x] 6.1 Apply authentication middleware to all day itinerary item endpoints.
  - [x] 6.2 Ensure proper input sanitization.
- [x] 7.0 Documentation and Testing
  - [x] 7.1 Add API documentation (e.g., Swagger/OpenAPI).
  - [x] 7.2 Write unit and integration tests for all CRUD operations.
