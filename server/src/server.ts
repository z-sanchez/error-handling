import dotenv from "dotenv";
// ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT TOP
dotenv.config();
import cors from "cors";
import express, { Request, Response } from "express";
import { errorHandler } from "./middleware/errorHandler";
import { tryCatch } from "./utils/tryCatch";
import { AppError } from "./AppError";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json()); // parse json bodies in the request object

const getUser = (): undefined => undefined;

app.get(
  "/evalError",
  tryCatch(async (req: Request, res: Response) => {
    eval('console.log("Hello"');
    return res.status(200).json({ success: true });
  })
);

app.get(
  "/error",
  tryCatch(async (req: Request, res: Response) => {
    const user = getUser();

    if (!user) {
      throw new AppError(111, "No User Found!", 400);
    }

    return res.status(200).json({ success: true });
  })
);

app.get("/", async (req, res) => {
  res.status(200).send("<h1>Hello World</h1>");
});

app.use(errorHandler);

// Listen on pc port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
