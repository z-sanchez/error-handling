// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable no-var */
//need these becuase we're causing legit errors on purpose
import dotenv from "dotenv";
// ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT TOP
dotenv.config();
import cors from "cors";
import express, { Request, Response } from "express";
import { errorHandler } from "./middleware/errorHandler";
import { tryCatch } from "./utils/tryCatch";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json()); // parse json bodies in the request object

app.get(
  "/evalError",
  tryCatch(async (req: Request, res: Response) => {
    //error is not really thrown in modern javascript, so manually doing it here
    //however if it is passed invalid code it will throw errors that are caused by the passed code
    throw new EvalError("This is an eval error");
    return res.status(200).json({ success: true });
  })
);

app.get(
  "/uriError",
  tryCatch(async (req: Request, res: Response) => {
    //these lines would be okay. encodeURI will protect whatever string passed from being changed by encoding it
    // const uri = "https://mozilla.org/?x=шеллы";
    // const encoded = encodeURI(uri);

    //this does not use URI formatting. So error will be thrown
    decodeURIComponent("%%");

    return res.status(200).json({ success: true });
  })
);

app.get(
  "/typeError",
  tryCatch(async (req: Request, res: Response) => {
    const aNumber = 234;

    aNumber();
    return res.status(200).json({ success: true });
  })
);

app.get(
  "/referenceError",
  tryCatch(async (req: Request, res: Response) => {
    const aNumber = 234;
    bNumber();
    return res.status(200).json({ success: true });
  })
);

app.get(
  "/syntaxError",
  tryCatch(async (req: Request, res: Response) => {
    eval("hoo bar");

    return res.status(200).json({ success: true });
  })
);

app.get(
  "/rangeError",
  tryCatch(async (req: Request, res: Response) => {
    const num = 1;

    num.toPrecision(500);

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
