import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { ownerAdminArticles } from "../middlewares/ownerOrAdminMiddleware.js";
import { addTagToArticle, removeTagFromArticle, } from "../controllers/articleTag.controller.js";

export const articleTagRoutes = Router();

articleTagRoutes.post("/articles/:articleId/tags/:tagId", authMiddleware, ownerAdminArticles, addTagToArticle);

articleTagRoutes.delete("/articles/:articleId/tags/:tagId", authMiddleware, ownerAdminArticles, removeTagFromArticle);