import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./middleware/globalErrorHandler";
import notFound from "./middleware/notFound";
import { UserRoutes } from "./modules/user/user.route";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1/users", UserRoutes);

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
