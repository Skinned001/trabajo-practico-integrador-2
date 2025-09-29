import { Router } from "express";
import {
    createArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle
} from "../controllers/article.controller.js";
import { authAdmin } from "../middlewares/adminMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validator } from "../middlewares/validator.js";
//import validaciones

export const articleRoutes = Router();

articleRoutes.post("/articles", authMiddleware, authAdmin, validator, createArticle);

articleRoutes.get("/articles", authMiddleware, authAdmin, validator, getAllArticles);

articleRoutes.get("/articles/:id", authMiddleware, authAdmin, validator, getArticleById);

articleRoutes.put("/articles/:id", authMiddleware, authAdmin, validator, updateArticle);

articleRoutes.delete("/articles/:id", authMiddleware, authAdmin, validator, deleteArticle);
