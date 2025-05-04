import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import { logRequest } from "./middlewares/logger";
import { errorHandler } from "./middlewares/error";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(logRequest())
app.use("/api", routes);
app.use(errorHandler());

app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .once("error", (err) => {
    console.error(err);
    process.exit(1);
  })
