import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import compression from "compression";
import { engine } from "express-handlebars";
import path from "path";
import indexRouter from "@/routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger/swagger.config";
import { errorHandler } from "./middlewares/errorHandler";
import corsOptions from "./config/cors/cors-options";
import { toNodeHandler } from "better-auth/node";
import { auth } from "@/config/auth";

const app: Express = express();

// View engine setup
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "landing",
    layoutsDir: path.join(__dirname, "views"),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(cors(corsOptions));

// Auth Routes
app.all("/api/v1/auth/{*any}", toNodeHandler(auth));

app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(compression());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Main page route
app.get("/", (_req, res) => {
  res.render("landing", {
    title: "Complete Auth System",
    description: "Modern Authentication System API",
  });
});

// Swagger Documentation Route
app.use(
  "/api/v1/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Complete Auth System API",
  })
);

// Routes
app.use("/api/v1", indexRouter);

app.use(errorHandler);

export default app;
