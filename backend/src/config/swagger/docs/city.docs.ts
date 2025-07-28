/**
 * Swagger documentation for City endpoints
 */

export const cityDocs = {
  schemas: {
    City: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        name: {
          type: "string",
        },
        slug: {
          type: "string",
        },
        description: {
          type: "string",
        },
        thumbnail: {
          type: "string",
        },
        images: {
          type: "array",
          items: {
            type: "string",
          },
        },
        destinationId: {
          type: "string",
        },
        createdAt: {
          type: "string",
          format: "date-time",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
        },
      },
    },
    CreateCityInput: {
      type: "object",
      required: ["name", "destinationId"],
      properties: {
        name: {
          type: "string",
        },
        slug: {
          type: "string",
          nullable: true,
        },
        description: {
          type: "string",
          nullable: true,
        },
        thumbnail: {
          type: "string",
          nullable: true,
        },
        images: {
          type: "array",
          items: {
            type: "string",
          },
          nullable: true,
        },
        destinationId: {
          type: "string",
        },
      },
    },
    UpdateCityInput: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        name: {
          type: "string",
          nullable: true,
        },
        slug: {
          type: "string",
          nullable: true,
        },
        description: {
          type: "string",
          nullable: true,
        },
        thumbnail: {
          type: "string",
          nullable: true,
        },
        images: {
          type: "array",
          items: {
            type: "string",
          },
          nullable: true,
        },
        destinationId: {
          type: "string",
          nullable: true,
        },
      },
    },
  },
  paths: {
    "/api/v1/cities": {
      post: {
        tags: ["City"],
        summary: "Create a new city",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateCityInput",
              },
            },
          },
        },
        responses: {
          201: {
            description: "City created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    city: {
                      $ref: "#/components/schemas/City",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Invalid input",
          },
        },
      },
      get: {
        tags: ["City"],
        summary: "Get all cities",
        responses: {
          200: {
            description: "Cities retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    cities: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/City",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/cities/{id}": {
      get: {
        tags: ["City"],
        summary: "Get a single city by ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID of the city to retrieve",
          },
        ],
        responses: {
          200: {
            description: "City retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    city: {
                      $ref: "#/components/schemas/City",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "City not found",
          },
        },
      },
      patch: {
        tags: ["City"],
        summary: "Update an existing city",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID of the city to update",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateCityInput",
              },
            },
          },
        },
        responses: {
          200: {
            description: "City updated successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    city: {
                      $ref: "#/components/schemas/City",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Invalid input",
          },
          404: {
            description: "City not found",
          },
        },
      },
      delete: {
        tags: ["City"],
        summary: "Delete a city by ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID of the city to delete",
          },
        ],
        responses: {
          200: {
            description: "City deleted successfully",
          },
          404: {
            description: "City not found",
          },
        },
      },
    },
  },
};
