import express from "express";
import cors from 'cors';
import { env } from "./config/env.js";
import { projectRouter } from "./routes/project.routes.js";
import { myProfileRouter } from "./routes/myProfile.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import { notFoundHandler } from "./middleware/notFound.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import path from "node:path";

export const app = express()


app.use(
  cors({
    origin: env.CORS_ORIGINS,
    credentials: true,
  })
);

// It only helps serve the uploaded file afterward.
app.use('/api/v1/uploads', express.static(path.resolve(process.cwd(), 'uploads')));


// JSON middleware -> parses incoming JSON request bodies.
// If the request is not JSON, it skips parsing.
app.use(express.json());
app.use(cookieParser());



app.use("/api/v1",projectRouter);
app.use("/api/v1",myProfileRouter);
app.use("/api/v1",authRouter);

// Middlewares 
app.use(notFoundHandler);
app.use(errorHandler);
