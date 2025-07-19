# Product Requirements Document (PRD) - Tour Management CRUD

## 1. Introduction
This document outlines the requirements for implementing Create, Read, Update, and Delete (CRUD) functionalities for tour management within the `st-holidays` application. The goal is to provide a robust API for managing tour packages, including their details, itineraries, and associated cities and destinations.

## 2. Goals
- Enable administrators to create new tour packages with comprehensive details.
- Allow retrieval of single and multiple tour packages.
- Facilitate updates to existing tour package information.
- Provide functionality to delete tour packages.
- Ensure data integrity and relationships with destinations, cities, and itinerary items.

## 3. Scope
This PRD covers the backend API development for tour CRUD operations. Frontend integration will be handled in a separate phase.

## 4. Functional Requirements

### 4.1. Tour Model (based on `prisma/schema.prisma`)

```prisma
model Tour {
  id             String       @id @default(uuid())
  name           String       @unique
  slug           String       @unique
  description    String
  duration       String
  theme          String?
  packageType    String?
  price          Decimal      @db.Decimal(10, 2)
  offerPrice     Decimal?     @db.Decimal(10, 2)
  thumbnail      String?
  images         String[]
  highlights     String[]
  inclusions     String[]
  exclusions     String[]
  terms          String[]
  destinationId  String
  destination    Destination  @relation(fields: [destinationId], references: [id], onDelete: Cascade)
  createdAt      DateTime     @default(now()) @map("created_at")
  updatedAt      DateTime     @updatedAt @map("updated_at")

  cities           City[]
  itinerary        DayItineraryItem[]

  @@map("tours")
}
```

### 4.2. API Endpoints

#### 4.2.1. Create Tour
- **Endpoint:** `POST /api/v1/tours`
- **Description:** Creates a new tour package.
- **Request Body:**
  ```json
  {
    "name": "string",
    "slug": "string" (optional, auto-generated if not provided),
    "description": "string",
    "duration": "string",
    "theme": "string" (optional),
    "packageType": "string" (optional),
    "price": "number",
    "offerPrice": "number" (optional),
    "thumbnail": "string" (optional),
    "images": ["string"] (optional),
    "highlights": ["string"],
    "inclusions": ["string"],
    "exclusions": ["string"],
    "terms": ["string"],
    "destinationId": "string"
  }
  ```
- **Validation:**
  - `name`: Required, unique, minimum 3 characters.
  - `description`: Required.
  - `duration`: Required.
  - `price`: Required, positive number.
  - `highlights`, `inclusions`, `exclusions`, `terms`: Required, array of strings.
  - `destinationId`: Required, must be a valid existing destination ID.
- **Response:** `201 Created` with the newly created tour object.

#### 4.2.2. Get All Tours
- **Endpoint:** `GET /api/v1/tours`
- **Description:** Retrieves a list of all tour packages.
- **Query Parameters:** (Optional)
  - `destinationId`: Filter tours by destination.
  - `cityId`: Filter tours by city.
  - `minPrice`, `maxPrice`: Filter tours by price range.
  - `theme`, `packageType`: Filter tours by theme or package type.
  - `limit`, `offset`: Pagination parameters.
- **Response:** `200 OK` with an array of tour objects.

#### 4.2.3. Get Single Tour
- **Endpoint:** `GET /api/v1/tours/:id`
- **Description:** Retrieves a single tour package by its ID or slug.
- **Path Parameters:**
  - `id`: Tour ID or slug.
- **Response:** `200 OK` with the tour object, or `404 Not Found` if not found.

#### 4.2.4. Update Tour
- **Endpoint:** `PATCH /api/v1/tours/:id`
- **Description:** Updates an existing tour package.
- **Path Parameters:**
  - `id`: Tour ID.
- **Request Body:** (Partial update)
  ```json
  {
    "name": "string" (optional),
    "description": "string" (optional),
    "price": "number" (optional),
    "destinationId": "string" (optional)
    // ... other fields as per Tour model
  }
  ```
- **Validation:**
  - `id`: Required, must be a valid existing tour ID.
  - `name`: If provided, must be unique and minimum 3 characters.
  - `price`: If provided, must be a positive number.
  - `destinationId`: If provided, must be a valid existing destination ID.
- **Response:** `200 OK` with the updated tour object, or `404 Not Found` if not found.

#### 4.2.5. Delete Tour
- **Endpoint:** `DELETE /api/v1/tours/:id`
- **Description:** Deletes a tour package by its ID.
- **Path Parameters:**
  - `id`: Tour ID.
- **Response:** `204 No Content` on successful deletion, or `404 Not Found` if not found.

## 5. Non-Functional Requirements
- **Performance:** API responses should be fast and efficient.
- **Security:** All endpoints must be protected by authentication middleware. Input validation to prevent common vulnerabilities (e.g., injection attacks).
- **Error Handling:** Consistent and informative error responses for invalid requests, not found resources, and server errors.
- **Scalability:** The API should be designed to handle an increasing number of tour packages and requests.
- **Maintainability:** Code should be clean, well-documented, and follow established coding standards.

## 6. Technical Considerations
- **Framework:** Express.js
- **Database:** PostgreSQL with Prisma ORM.
- **Validation:** Zod for schema validation.
- **Authentication:** JWT-based authentication.
- **Slug Generation:** Automatic slug generation for tour names if not provided.

## 7. Future Considerations
- Integration with image upload services.
- Advanced search and filtering capabilities.
- Tour booking and payment integration.
- Review and rating system for tours.
- Versioning of the API.

## 8. Open Questions
- How will images be stored and served (e.g., local, S3, Cloudinary)? (Currently assuming string URLs)
- What are the specific requirements for `duration` field (e.g., "4 Nights / 5 Days", "7 days")?
- Are there any specific business rules for `offerPrice` (e.g., must be less than `price`)?