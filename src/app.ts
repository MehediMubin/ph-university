import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./middleware/globalErrorHandler";
import notFound from "./middleware/notFound";
import router from "./routes";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

// routes
app.use("/api/v1/", router);

app.get("/", (req: Request, res: Response) => {
   res.status(200).json({
      success: true,
      message: "Welcome to PH University API",
      data: "Apatoto Nai",
   });
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
