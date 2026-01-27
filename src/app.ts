import express, { Application } from "express";
import cors from "cors";
 
const app: Application = express();

// after the error
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true,
  })
);

// app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.use(notFound);
// app.use(errorHandler);
export default app;
