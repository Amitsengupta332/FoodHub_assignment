import express, { Application } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { mealsRouter } from "./modules/meals/meals.route";
import { categoryRouter } from "./modules/category/category.route";
import { providerProfileRouter } from "./modules/providerProfile/providerProfile.routes";

const app: Application = express();

// after the error
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:5000",
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use("/api/meals", mealsRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/providers", providerProfileRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.use(notFound);
// app.use(errorHandler);
export default app;
