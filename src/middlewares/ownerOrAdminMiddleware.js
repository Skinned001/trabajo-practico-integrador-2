import { ArticleModel } from "../models/article.model.js";
import { CommentModel } from "../models/comment.model.js";

export const ownerAdminArticles = async (req, res, next) => {
    try {
        const decoded = req.userLogged;
        const article = await ArticleModel.findOne({ author: decoded.id });
        if (decoded.role === "admin" || decoded.id === article.author) {
            return next();
        }
        return res.status(403).json("No autorizado");
    } catch (error) {
        return res.status(500).json("Error al comprobar permisos " + error);
    }
};

export const ownerAdminComments = async (req, res, next) => {
    try {
        const decoded = req.userLogged;
        const comment = await CommentModel.findOne({ author: decoded.id });
        if (decoded.role === "admin" || decoded.id === comment.author) {
            return next();
        }
    } catch (error) {
        return res.status(500).json("Error al comprobar permisos " + error);
    }
};