import { HTTP_STATUS } from "@/constants";

// Day Itinerary Item schema for Swagger documentation
export const dayItineraryItemDocs = {
  schemas: {
    DayItineraryItem: {
      type: "object",
      properties: {
        id: { type: "string", format: "uuid" },
        tourId: { type: "string", format: "uuid" },
        dayNumber: { type: "integer" },
        title: { type: "string" },
        description: { type: "string" },
        images: {
          type: "array",
          items: { type: "string" }
        },
        meals: {
          type: "array",
          items: { type: "string", enum: ["breakfast", "lunch", "dinner"] }
        },
        duration: { type: "string" },
        order: { type: "integer" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" }
      }
    },
    CreateDayItineraryItemInput: {
      type: "object",
      required: ["tourId", "dayNumber", "title", "description"],
      properties: {
        tourId: { type: "string", format: "uuid" },
        dayNumber: { type: "integer" },
        title: { type: "string" },
        description: { type: "string" },
        images: {
          type: "array",
          items: { type: "string" }
        },
        meals: {
          type: "array",
          items: { type: "string", enum: ["breakfast", "lunch", "dinner"] }
        },
        duration: { type: "string" },
        order: { type: "integer" }
      }
    },
    UpdateDayItineraryItemInput: {
      type: "object",
      properties: {
        dayNumber: { type: "integer" },
        title: { type: "string" },
        description: { type: "string" },
        images: {
          type: "array",
          items: { type: "string" }
        },
        meals: {
          type: "array",
          items: { type: "string", enum: ["breakfast", "lunch", "dinner"] }
        },
        duration: { type: "string" },
        order: { type: "integer" }
      }
    }
  },
  paths: {
    "/api/day-itinerary-items": {
      post: {
        tags: ["Day Itinerary Items"],
        summary: "Create a new day itinerary item",
        description: "Create a new day itinerary item with the provided data",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateDayItineraryItemInput"
              }
            }
          }
        },
        responses: {
          [HTTP_STATUS.CREATED]: {
            description: "Day itinerary item created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "success" },
                    data: {
                      $ref: "#/components/schemas/DayItineraryItem"
                    }
                  }
                }
              }
            }
          },
          [HTTP_STATUS.BAD_REQUEST]: {
            description: "Invalid input data",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "error" },
                    message: { type: "string", example: "Invalid input data" },
                    errors: {
                      type: "array",
                      items: { type: "string" }
                    }
                  }
                }
              }
            }
          },
          [HTTP_STATUS.UNAUTHORIZED]: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "error" },
                    message: { type: "string", example: "Unauthorized" }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/day-itinerary-items/{id}": {
      get: {
        tags: ["Day Itinerary Items"],
        summary: "Get a day itinerary item by ID",
        description: "Retrieve a single day itinerary item by its ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              format: "uuid"
            },
            description: "ID of the day itinerary item to retrieve"
          }
        ],
        responses: {
          [HTTP_STATUS.OK]: {
            description: "Day itinerary item found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "success" },
                    data: {
                      $ref: "#/components/schemas/DayItineraryItem"
                    }
                  }
                }
              }
            }
          },
          [HTTP_STATUS.NOT_FOUND]: {
            description: "Day itinerary item not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "error" },
                    message: { type: "string", example: "Day itinerary item not found" }
                  }
                }
              }
            }
          }
        }
      },
      put: {
        tags: ["Day Itinerary Items"],
        summary: "Update a day itinerary item",
        description: "Update an existing day itinerary item with the provided data",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              format: "uuid"
            },
            description: "ID of the day itinerary item to update"
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateDayItineraryItemInput"
              }
            }
          }
        },
        responses: {
          [HTTP_STATUS.OK]: {
            description: "Day itinerary item updated successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "success" },
                    data: {
                      $ref: "#/components/schemas/DayItineraryItem"
                    }
                  }
                }
              }
            }
          },
          [HTTP_STATUS.BAD_REQUEST]: {
            description: "Invalid input data",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "error" },
                    message: { type: "string", example: "Invalid input data" },
                    errors: {
                      type: "array",
                      items: { type: "string" }
                    }
                  }
                }
              }
            }
          },
          [HTTP_STATUS.NOT_FOUND]: {
            description: "Day itinerary item not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "error" },
                    message: { type: "string", example: "Day itinerary item not found" }
                  }
                }
              }
            }
          },
          [HTTP_STATUS.UNAUTHORIZED]: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "error" },
                    message: { type: "string", example: "Unauthorized" }
                  }
                }
              }
            }
          }
        }
      },
      delete: {
        tags: ["Day Itinerary Items"],
        summary: "Delete a day itinerary item",
        description: "Delete a day itinerary item by its ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              format: "uuid"
            },
            description: "ID of the day itinerary item to delete"
          }
        ],
        responses: {
          [HTTP_STATUS.OK]: {
            description: "Day itinerary item deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "success" },
                    message: { type: "string", example: "Day itinerary item deleted successfully" }
                  }
                }
              }
            }
          },
          [HTTP_STATUS.NOT_FOUND]: {
            description: "Day itinerary item not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "error" },
                    message: { type: "string", example: "Day itinerary item not found" }
                  }
                }
              }
            }
          },
          [HTTP_STATUS.UNAUTHORIZED]: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "error" },
                    message: { type: "string", example: "Unauthorized" }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/day-itinerary-items/tour/{tourId}": {
      get: {
        tags: ["Day Itinerary Items"],
        summary: "Get day itinerary items by tour ID",
        description: "Retrieve all day itinerary items for a specific tour",
        parameters: [
          {
            name: "tourId",
            in: "path",
            required: true,
            schema: {
              type: "string",
              format: "uuid"
            },
            description: "ID of the tour to retrieve day itinerary items for"
          }
        ],
        responses: {
          [HTTP_STATUS.OK]: {
            description: "Day itinerary items found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "success" },
                    data: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/DayItineraryItem"
                      }
                    }
                  }
                }
              }
            }
          },
          [HTTP_STATUS.NOT_FOUND]: {
            description: "Tour not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "error" },
                    message: { type: "string", example: "Tour not found" }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};