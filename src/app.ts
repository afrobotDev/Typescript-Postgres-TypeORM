import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { validationResult } from "express-validator";
import { Routes } from "./routes/routes.js";

function handleError(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  res.status(err.statusCode || 500).json({ message: err.message });
}

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

Routes.forEach((route) => {
  (app as any)[route.method](
    route.route,
    ...route.validation,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const result = await new (route.controller as any)()[route.action](
          req,
          res,
          next,
        );
        res.json(result);
      } catch (err) {
        next(err);
      }
    },
  );
});

app.use(handleError);

export default app;
