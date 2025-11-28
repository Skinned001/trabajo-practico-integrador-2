import { Router } from "express";
import {
    myArticles,
    createArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle
} from "../controllers/article.controller.js";
import { authAdmin } from "../middlewares/adminMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validator } from "../middlewares/validator.js";
import {
    createArticleValidations,
    findArticleIDValidations,
    updateArticleValidations,
    deletedArticleValidations,
} from "../middlewares/validations/article.validations.js";

export const articleRoutes = Router();


articleRoutes.post("/articles", authMiddleware, authAdmin, validator, createArticleValidations, createArticle);

articleRoutes.get("/articles", authMiddleware, authAdmin, validator, getAllArticles);

articleRoutes.get("/articles/:my", authMiddleware, authAdmin, validator, myArticles);

articleRoutes.get("/articles/:id", authMiddleware, authAdmin, validator, findArticleIDValidations, getArticleById);

articleRoutes.put("/articles/:id", authMiddleware, authAdmin, validator, updateArticleValidations, updateArticle);

articleRoutes.delete("/articles/:id", authMiddleware, authAdmin, validator, deletedArticleValidations, deleteArticle);


