import { HTTP_STATUS } from "@/constants";

// Tour schema for Swagger documentation
export const tourDocs = {
  schemas: {
    Tour: {
      type: "object",
      properties: {
        id: { type: "string", format: "uuid" },
        name: { type: "string" },
        slug: { type: "string" },
        description: { type: "string" },
        duration: { type: "integer" },
        price: { type: "number" },
        thumbnail: { type: "string" },
        images: {
          type: "array",
          items: { type: "string" }
        },
        highlights: {
          type: "array",
          items: { type: "string" }
        },
        inclusions: {
          type: "array",
          items: { type: "string" }
        },
        exclusions: {
          type: "array",
          items: { type: "string" }
        },
        terms: { type: "string" },
        destinationId: { type: "string", format: "uuid" },
        cityIds: {
          type: "array",
          items: { type: "string", format: "uuid" }
        },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" }
      }
    },
    CreateTourInput: {
      type: "object",
      required: ["name", "description", "duration", "price", "destinationId", "cityIds"],
      properties: {
        name: { type: "string" },
        slug: { type: "string" },
        description: { type: "string" },
        duration: { type: "integer" },
        price: { type: "number" },
        thumbnail: { type: "string" },
        images: {
          type: "array",
          items: { type: "string" }
        },
        highlights: {
          type: "array",
          items: { type: "string" }
        },
        inclusions: {
          type: "array",
          items: { type: "string" }
        },
        exclusions: {
          type: "array",
          items: { type: "string" }
        },
        terms: { type: "string" },
        destinationId: { type: "string", format: "uuid" },
        cityIds: {
          type: "array",
          items: { type: "string", format: "uuid" }
        }
      }
    },
    UpdateTourInput: {
      type: "object",
      properties: {
        name: { type: "string" },
        slug: { type: "string" },
        description: { type: "string" },
        duration: { type: "integer" },
        price: { type: "number" },
        thumbnail: { type: "string" },
        images: {
          type: "array",
          items: { type: "string" }
        },
        highlights: {
          type: "array",
          items: { type: "string" }
        },
        inclusions: {
          type: "array",
          items: { type: "string" }
        },
        exclusions: {
          type: "array",
          items: { type: "string" }
        },
        terms: { type: "string" },
        destinationId: { type: "string", format: "uuid" },
        cityIds: {
          type: "array",
          items: { type: "string", format: "uuid" }
        }
      }
    }
  },
  paths: {
    "/api/tours": {
      post: {
        tags: ["Tours"],
        summary: "Create a new tour",
        description: "Create a new tour with the provided data",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateTourInput"
              }
            }
          }
        },
        responses: {
          [HTTP_STATUS.CREATED]: {
            description: "Tour created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "success" },
                    data: {
                      $ref: "#/components/schemas/Tour"
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
      },
      get: {
        tags: ["Tours"],
        summary: "Get all tours",
        description: "Retrieve a list of all tours",
        responses: {
          [HTTP_STATUS.OK]: {
            description: "A list of tours",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "success" },
                    data: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Tour"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/tours/{id}": {
      get: {
        tags: ["Tours"],
        summary: "Get a tour by ID",
        description: "Retrieve a single tour by its ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              format: "uuid"
            },
            description: "ID of the tour to retrieve"
          }
        ],
        responses: {
          [HTTP_STATUS.OK]: {
            description: "Tour found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "success" },
                    data: {
                      $ref: "#/components/schemas/Tour"
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
      },
      put: {
        tags: ["Tours"],
        summary: "Update a tour",
        description: "Update an existing tour with the provided data",
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
            description: "ID of the tour to update"
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateTourInput"
              }
            }
          }
        },
        responses: {
          [HTTP_STATUS.OK]: {
            description: "Tour updated successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "success" },
                    data: {
                      $ref: "#/components/schemas/Tour"
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
        tags: ["Tours"],
        summary: "Delete a tour",
        description: "Delete a tour by its ID",
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
            description: "ID of the tour to delete"
          }
        ],
        responses: {
          [HTTP_STATUS.OK]: {
            description: "Tour deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "success" },
                    message: { type: "string", example: "Tour deleted successfully" }
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
    }
  }
};