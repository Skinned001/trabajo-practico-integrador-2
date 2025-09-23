import { Router } from "express";
import {
    createArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle
} from "../controllers/tag.controller.js";

export const articleRoutes = Router();

articleRoutes.post("/articles", createArticle);
articleRoutes.get("/articles", getAllArticles);
articleRoutes.get("/articles/:id", getArticleById);
articleRoutes.put("/articles/:id", updateArticle);
articleRoutes.delete("/articles/:id", deleteArticle);
