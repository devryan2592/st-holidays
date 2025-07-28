/**
 * Swagger documentation for Destination endpoints
 */

export const destinationDocs = {
  schemas: {
    Destination: {
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
    CreateDestinationInput: {
      type: "object",
      required: ["name"],
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
      },
    },
    CreateDestinationResponse: {
      type: "object",
      properties: {
        destination: {
          $ref: "#/components/schemas/Destination",
        },
      },
    },
    UpdateDestinationInput: {
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
      },
    },
    UpdateDestinationResponse: {
      type: "object",
      properties: {
        destination: {
          $ref: "#/components/schemas/Destination",
        },
      },
    },
    GetDestinationByIdResponse: {
      type: "object",
      properties: {
        destination: {
          $ref: "#/components/schemas/Destination",
        },
      },
    },
    GetAllDestinationsResponse: {
      type: "object",
      properties: {
        destinations: {
          type: "array",
          items: {
            $ref: "#/components/schemas/Destination",
          },
        },
      },
    },
  },
  paths: {
    "/api/v1/destinations": {
      post: {
        tags: ["Destination"],
        summary: "Create a new destination",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateDestinationInput",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Destination created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CreateDestinationResponse",
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
        tags: ["Destination"],
        summary: "Get all destinations",
        responses: {
          200: {
            description: "Destinations retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/GetAllDestinationsResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/destinations/{id}": {
      get: {
        tags: ["Destination"],
        summary: "Get a single destination by ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID of the destination to retrieve",
          },
        ],
        responses: {
          200: {
            description: "Destination retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/GetDestinationByIdResponse",
                },
              },
            },
          },
          404: {
            description: "Destination not found",
          },
        },
      },
      patch: {
        tags: ["Destination"],
        summary: "Update an existing destination",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID of the destination to update",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateDestinationInput",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Destination updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UpdateDestinationResponse",
                },
              },
            },
          },
          400: {
            description: "Invalid input",
          },
          404: {
            description: "Destination not found",
          },
        },
      },
      delete: {
        tags: ["Destination"],
        summary: "Delete a destination by ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID of the destination to delete",
          },
        ],
        responses: {
          200: {
            description: "Destination deleted successfully",
          },
          404: {
            description: "Destination not found",
          },
        },
      },
    },
  },
};
