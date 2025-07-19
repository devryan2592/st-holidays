# Product Requirements Document (PRD) - Day Itinerary Item Management CRUD

## 1. Introduction
This document outlines the requirements for implementing Create, Read, Update, and Delete (CRUD) functionalities for day itinerary items within the `st-holidays` application. These items are crucial for detailing the daily activities of a tour package.

## 2. Goals
- Enable administrators to create, update, and delete individual day itinerary items for a given tour.
- Allow retrieval of all itinerary items for a specific tour.
- Ensure data integrity and proper association with tour packages.

## 3. Scope
This PRD covers the backend API development for day itinerary item CRUD operations. Frontend integration will be handled in a separate phase.

## 4. Functional Requirements

### 4.1. Day Itinerary Item Model (based on `prisma/schema.prisma`)

```prisma
model DayItineraryItem {
  id          String   @id @default(uuid())
  tourId      String
  tour        Tour     @relation(fields: [tourId], references: [id])
  dayNumber   Int
  title       String
  description String
  images      String[]
  meals       Meals[]
  duration    Int?

  @@unique([tourId, dayNumber])
}

enum Meals {
  BREAKFAST
  LUNCH
  DINNER
}
```

### 4.2. API Endpoints

#### 4.2.1. Create Day Itinerary Item
- **Endpoint:** `POST /api/v1/tours/:tourId/itinerary`
- **Description:** Creates a new day itinerary item for a specific tour.
- **Path Parameters:**
  - `tourId`: ID of the tour to which the itinerary item belongs.
- **Request Body:**
  ```json
  {
    "dayNumber": "number",
    "title": "string",
    "description": "string",
    "images": ["string"] (optional),
    "meals": ["BREAKFAST", "LUNCH", "DINNER"] (optional),
    "duration": "number" (optional)
  }
  ```
- **Validation:**
  - `tourId`: Required, must be a valid existing tour ID.
  - `dayNumber`: Required, unique per tour, positive integer.
  - `title`: Required, minimum 3 characters.
  - `description`: Required.
  - `meals`: Array of valid `Meals` enum values.
- **Response:** `201 Created` with the newly created day itinerary item object.

#### 4.2.2. Get All Day Itinerary Items for a Tour
- **Endpoint:** `GET /api/v1/tours/:tourId/itinerary`
- **Description:** Retrieves all day itinerary items for a specific tour.
- **Path Parameters:**
  - `tourId`: ID of the tour.
- **Response:** `200 OK` with an array of day itinerary item objects, ordered by `dayNumber`.

#### 4.2.3. Get Single Day Itinerary Item
- **Endpoint:** `GET /api/v1/tours/:tourId/itinerary/:id`
- **Description:** Retrieves a single day itinerary item by its ID for a specific tour.
- **Path Parameters:**
  - `tourId`: ID of the tour.
  - `id`: ID of the itinerary item.
- **Response:** `200 OK` with the day itinerary item object, or `404 Not Found` if not found.

#### 4.2.4. Update Day Itinerary Item
- **Endpoint:** `PATCH /api/v1/tours/:tourId/itinerary/:id`
- **Description:** Updates an existing day itinerary item for a specific tour.
- **Path Parameters:**
  - `tourId`: ID of the tour.
  - `id`: ID of the itinerary item.
- **Request Body:** (Partial update)
  ```json
  {
    "dayNumber": "number" (optional),
    "title": "string" (optional),
    "description": "string" (optional),
    "images": ["string"] (optional),
    "meals": ["BREAKFAST", "LUNCH", "DINNER"] (optional),
    "duration": "number" (optional)
  }
  ```
- **Validation:**
  - `tourId`: Required, must be a valid existing tour ID.
  - `id`: Required, must be a valid existing itinerary item ID.
  - `dayNumber`: If provided, must be unique per tour and a positive integer.
- **Response:** `200 OK` with the updated day itinerary item object, or `404 Not Found` if not found.

#### 4.2.5. Delete Day Itinerary Item
- **Endpoint:** `DELETE /api/v1/tours/:tourId/itinerary/:id`
- **Description:** Deletes a day itinerary item by its ID for a specific tour.
- **Path Parameters:**
  - `tourId`: ID of the tour.
  - `id`: ID of the itinerary item.
- **Response:** `204 No Content` on successful deletion, or `404 Not Found` if not found.

## 5. Non-Functional Requirements
- **Performance:** API responses should be fast and efficient.
- **Security:** All endpoints must be protected by authentication middleware. Input validation to prevent common vulnerabilities.
- **Error Handling:** Consistent and informative error responses.
- **Scalability:** The API should be designed to handle an increasing number of itinerary items.
- **Maintainability:** Code should be clean, well-documented, and follow established coding standards.

## 6. Technical Considerations
- **Framework:** Express.js
- **Database:** PostgreSQL with Prisma ORM.
- **Validation:** Zod for schema validation.
- **Authentication:** JWT-based authentication.

## 7. Future Considerations
- Reordering of itinerary items.
- Integration with rich text editors for descriptions.

## 8. Open Questions
- What are the specific requirements for `duration` field (e.g., in hours, minutes, or a general description)?
- Are there any specific rules for `images` (e.g., maximum number, size limits)?