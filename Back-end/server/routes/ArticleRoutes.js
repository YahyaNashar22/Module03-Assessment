import {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/ArticleController.js";
import express from "express";
import uploadImage from "../middlewares/multer.js";

const router = express.Router();

router.get("/allarticles", getArticles);
router.get("/:id", getArticle);
router.post("/create", uploadImage.single("image"), createArticle);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);

export default router;
