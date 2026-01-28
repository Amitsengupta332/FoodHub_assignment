import express, { Application } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { mealsRouter } from "./modules/meals/meals.route";

const app: Application = express();

// after the error
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:5000",
    credentials: true,
  })
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use("/api/meals", mealsRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.use(notFound);
// app.use(errorHandler);
export default app;
