import swaggerJsdoc from "swagger-jsdoc";
import { destinationDocs } from "./docs/destination.docs";
import { cityDocs } from "./docs/city.docs";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ST-Holidays API Documentation",
      version: "1.0.0",
      description:
        "ST-Holidays is a simple API for backend and day to day operations for travel agency.",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "API Support",
        url: "https://github.com/yourusername/auth-next-rn-express",
        email: "your.email@example.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8000",
        description: "Development server",
      },
      {
        url: "https://your-production-domain.com",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        ...destinationDocs.schemas,
        ...cityDocs.schemas,
      },
    },
    paths: {
      ...destinationDocs.paths,
      ...cityDocs.paths,
    },
  },
  apis: ["./src/controllers/**/*.ts"], // Path to the API docs
};

export const swaggerSpec = swaggerJsdoc(options);
