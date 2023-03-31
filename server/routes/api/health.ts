import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

router.route("/").get((_req: Request, res: Response) => {
  const health = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };

  try {
    return res.status(200).send(health);
  } catch (error) {
    if (error instanceof Error) {
      health.message = error.message;
    }

    return res.status(503).send(health);
  }
});

export { router as healthRouter };
