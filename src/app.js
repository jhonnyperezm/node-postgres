import express, { json } from 'express';
import morgan from "morgan";

// Initialization
const app = express();

// Importing routes
import projectRoutes from './routes/projects';
import taskRoutes from "./routes/tasks";

// middelware
app.use(morgan("dev"));
app.use(json());


// routes

app.use("/api/projects", projectRoutes);
app.use("/api/task", taskRoutes);

export default app;
