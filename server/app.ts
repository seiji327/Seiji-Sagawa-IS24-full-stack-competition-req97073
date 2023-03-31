import express, { Express, Request, Response } from "express";
import cors from "cors";

import { productsRouter } from "./routes/api/products";
import { healthRouter } from "./routes/api/health";

const app: Express = express();

// Port is hard-coded to match the example endpoints format in the instructions.
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/products", productsRouter);
app.get("*", (_req: Request, res: Response) =>
  res.status(404).send("This endpoint does not exist.")
);

app.listen(PORT, () => console.log(`Server runnning on port ${PORT}`));
