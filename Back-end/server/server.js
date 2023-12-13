import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import ArticleRoutes from "./routes/ArticleRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import { connect, syncronise } from "./config/dbconfig.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const staticDirectory = "./images";
app.use("/images", express.static(staticDirectory));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/articles", ArticleRoutes);
app.use("/users", UserRoutes);
app.get("/", (req, res) => {
  res.status(200).json({ path1: "/articles", path2: "/users" });
});

app.listen(process.env.PORT, () => {
  setTimeout(connect, 1000);
  setTimeout(syncronise, 1000);
  console.log(`server is running on port ${process.env.PORT}`);
});
