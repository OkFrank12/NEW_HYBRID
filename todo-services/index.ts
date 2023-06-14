import express, { Application, Request, Response } from "express";
import cors from "cors";
import todo from "./router/todoRouter";
import auth from "./router/authRouter";

const port: number = 2125;

const app: Application = express();

app
  .use(cors())
  .use(express.json())
  .use("/api/todo", todo)
  .use("/api/auth", auth)

  .get("/", (req: Request, res: Response) => {
    try {
      return res.status(201).json({
        message: "You have just hit the todo-services endpoint",
      });
    } catch (error) {
      return res.status(404).json({
        message: "Not Found",
        data: error,
      });
    }
  });

const server = app.listen(port, () => {
  console.log("Server is live on todo");
});

process.on("uncaughtException", (err: any) => {
  console.log("Server is shutting down because of uncaught exception");
  console.log("uncaughtException: ", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("Server is shutting down because of unhandled rejection");
  console.log("unhandledRejection: ", reason);
  server.close(() => {
    process.exit(1);
  });
});
